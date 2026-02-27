"""
Portfolio Dev Server
- Static dosyaları sunar (http://localhost:8080)
- /api/chat endpoint'i Gemini'ye proxy yapar (API key gizli kalır)
- Herhangi bir bağımlılık gerektirmez, sadece Python 3 yeterli
- API anahtarı .env dosyasından okunur
"""

import json
import os
import ssl
import urllib.request
import urllib.error
from http.server import HTTPServer, SimpleHTTPRequestHandler

# ─── .env Dosyasını Oku (ekstra kütüphane gerekmez) ──────────────────────────
def _load_env(path='.env'):
    """Basit .env okuyucu — python-dotenv gerektirmez."""
    if not os.path.exists(path):
        return
    with open(path, encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#') or '=' not in line:
                continue
            key, _, value = line.partition('=')
            # Satır içi yorum temizle (# karakteri ile başlayan kısım)
            value = value.split('#')[0].strip().strip('"').strip("'")
            os.environ.setdefault(key.strip(), value)

_load_env(os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env'))

# ─── Gemini API Anahtarı ──────────────────────────────────────────────────────
#   Değiştirmek için: .env dosyasındaki GEMINI_API_KEY satırını güncelleyin
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', '')
if not GEMINI_API_KEY:
    raise SystemExit('❌  .env dosyasında GEMINI_API_KEY bulunamadı!')

PORT = int(os.environ.get('PORT', 8080))
GEMINI_SSL_VERIFY = os.environ.get('GEMINI_SSL_VERIFY', 'true').strip().lower() not in {
    '0', 'false', 'no', 'off'
}
GEMINI_CA_BUNDLE = os.environ.get('GEMINI_CA_BUNDLE', '').strip()

GEMINI_MODEL = os.environ.get('GEMINI_MODEL', 'gemini-3-flash-preview').strip()
GEMINI_FALLBACK_MODELS = [
    GEMINI_MODEL,
    'gemini-3-flash-preview',
    'gemini-2.0-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash',
]

def _build_ssl_context():
    """Build SSL context with optional custom CA / verify toggle."""
    if not GEMINI_SSL_VERIFY:
        # Geçici debug modu: sertifika doğrulamasını kapatır.
        return ssl._create_unverified_context()
    if GEMINI_CA_BUNDLE:
        return ssl.create_default_context(cafile=GEMINI_CA_BUNDLE)
    try:
        import certifi  # type: ignore
        return ssl.create_default_context(cafile=certifi.where())
    except Exception:
        return ssl.create_default_context()

GEMINI_SSL_CONTEXT = _build_ssl_context()
# ─────────────────────────────────────────────────────────────────────────────


class PortfolioHandler(SimpleHTTPRequestHandler):

    def do_OPTIONS(self):
        """Preflight CORS isteği için yanıt ver."""
        self.send_response(200)
        self._cors_headers()
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/chat':
            self._proxy_gemini()
        else:
            self.send_error(404, 'Not Found')

    def _proxy_gemini(self):
        """Frontend'den OpenAI formatında gelen mesajları Gemini'ye ilet."""
        try:
            length   = int(self.headers.get('Content-Length', 0))
            raw_body = self.rfile.read(length)
            body     = json.loads(raw_body)

            messages = body.get('messages', [])

            # System mesajını ayır, gerisini Gemini formatına çevir
            system_text = ''
            contents    = []
            for msg in messages:
                role = msg.get('role', 'user')
                text = msg.get('content', '')
                if role == 'system':
                    system_text = text
                else:
                    # OpenAI: 'assistant' → Gemini: 'model'
                    gemini_role = 'model' if role == 'assistant' else 'user'
                    contents.append({'role': gemini_role, 'parts': [{'text': text}]})

            payload_dict = {
                'contents': contents,
                'generationConfig': {
                    'temperature': body.get('temperature', 0.75),
                    'maxOutputTokens': body.get('max_tokens', 512),
                    'topP': 0.95,
                }
            }
            if system_text:
                payload_dict['system_instruction'] = {'parts': [{'text': system_text}]}

            payload = json.dumps(payload_dict).encode('utf-8')

            raw = self._request_gemini_with_fallback(payload)

            gemini_data = json.loads(raw)

            # Gemini yanıtını frontend'in beklediği OpenAI formatına çevir
            reply_text = (
                gemini_data
                .get('candidates', [{}])[0]
                .get('content', {})
                .get('parts', [{}])[0]
                .get('text', '')
            )
            openai_like = {
                'choices': [{'message': {'role': 'assistant', 'content': reply_text}}]
            }
            out = json.dumps(openai_like).encode('utf-8')

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self._cors_headers()
            self.end_headers()
            self.wfile.write(out)

        except urllib.error.HTTPError as e:
            error_body = e.read()
            try:
                err_json  = json.loads(error_body)
                err_msg   = err_json.get('error', {}).get('message', f'HTTP {e.code}')
            except Exception:
                err_msg   = f'HTTP {e.code}'
            out = json.dumps({'error': {'message': err_msg}}).encode()
            self.send_response(e.code)
            self.send_header('Content-Type', 'application/json')
            self._cors_headers()
            self.end_headers()
            self.wfile.write(out)

        except Exception as e:
            msg = json.dumps({'error': {'message': str(e)}}).encode()
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self._cors_headers()
            self.end_headers()
            self.wfile.write(msg)

    def _request_gemini_with_fallback(self, payload):
        """Try configured Gemini models until one works."""
        last_http_error = None
        seen = set()

        for model in GEMINI_FALLBACK_MODELS:
            model = (model or '').strip()
            if not model or model in seen:
                continue
            seen.add(model)

            api_url = (
                'https://generativelanguage.googleapis.com/v1beta/models/'
                f'{model}:generateContent'
            )
            req = urllib.request.Request(
                api_url,
                data=payload,
                method='POST',
                headers={
                    'Content-Type': 'application/json',
                    'x-goog-api-key': GEMINI_API_KEY,
                }
            )

            try:
                with urllib.request.urlopen(req, timeout=30, context=GEMINI_SSL_CONTEXT) as resp:
                    return resp.read()
            except urllib.error.HTTPError as e:
                # Model adina bagli 404 olursa bir sonraki modele gec.
                if e.code == 404:
                    last_http_error = e
                    continue
                raise
            except urllib.error.URLError as e:
                reason = str(getattr(e, 'reason', e))
                if 'CERTIFICATE_VERIFY_FAILED' in reason:
                    raise RuntimeError(
                        'SSL certificate verify failed. If you are behind a corporate/proxy '
                        'certificate, set GEMINI_CA_BUNDLE in .env. For temporary testing only, '
                        'set GEMINI_SSL_VERIFY=false.'
                    ) from e
                raise

        if last_http_error is not None:
            raise last_http_error
        raise RuntimeError('No valid Gemini model configured.')

    def _cors_headers(self):
        self.send_header('Access-Control-Allow-Origin',  '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    def log_message(self, format, *args):
        # Sadece POST isteklerini loglayalım, statik dosyaları değil
        if args and 'POST' in str(args[0]):
            super().log_message(format, *args)


if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server = HTTPServer(('', PORT), PortfolioHandler)
    print(f'[OK] Portfolio server running -> http://localhost:{PORT}')
    print(f'[OK] OpenAI proxy active      -> http://localhost:{PORT}/api/chat')
    print(f'   (Durdurmak için Ctrl+C)\n')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n[STOP] Server stopped.')
