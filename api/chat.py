"""
Vercel Serverless Function - Gemini API Proxy
/api/chat endpoint

Vercel Python runtime: BaseHTTPRequestHandler formatı
"""

import json
import os
import ssl
import urllib.request
import urllib.error
from http.server import BaseHTTPRequestHandler

GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', '')

GEMINI_FALLBACK_MODELS = [
    'gemini-2.0-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash',
]


def _build_ssl_context():
    try:
        import certifi  # type: ignore
        return ssl.create_default_context(cafile=certifi.where())
    except Exception:
        return ssl.create_default_context()


def _request_gemini(payload: bytes) -> bytes:
    ssl_ctx = _build_ssl_context()
    last_error = None

    for model in GEMINI_FALLBACK_MODELS:
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
            with urllib.request.urlopen(req, timeout=30, context=ssl_ctx) as resp:
                return resp.read()
        except urllib.error.HTTPError as e:
            if e.code == 404:
                last_error = e
                continue
            raise
        except Exception as e:
            last_error = e
            continue

    if last_error:
        raise last_error
    raise RuntimeError('No valid Gemini model found.')


class handler(BaseHTTPRequestHandler):

    def _send_cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def _respond_json(self, status: int, data: dict):
        body = json.dumps(data).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self._send_cors()
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors()
        self.end_headers()

    def do_POST(self):
        if not GEMINI_API_KEY:
            self._respond_json(500, {'error': {'message': 'GEMINI_API_KEY not configured on server'}})
            return

        try:
            length = int(self.headers.get('Content-Length', 0))
            raw_body = self.rfile.read(length)
            body = json.loads(raw_body)

            messages = body.get('messages', [])

            system_text = ''
            contents = []
            for msg in messages:
                role = msg.get('role', 'user')
                text = msg.get('content', '')
                if role == 'system':
                    system_text = text
                else:
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
            raw = _request_gemini(payload)
            gemini_data = json.loads(raw)

            reply_text = (
                gemini_data
                .get('candidates', [{}])[0]
                .get('content', {})
                .get('parts', [{}])[0]
                .get('text', '')
            )

            self._respond_json(200, {
                'choices': [{'message': {'role': 'assistant', 'content': reply_text}}]
            })

        except urllib.error.HTTPError as e:
            try:
                err_json = json.loads(e.read())
                err_msg = err_json.get('error', {}).get('message', f'HTTP {e.code}')
            except Exception:
                err_msg = f'HTTP {e.code}'
            self._respond_json(e.code, {'error': {'message': err_msg}})

        except Exception as e:
            self._respond_json(500, {'error': {'message': str(e)}})

    def log_message(self, format, *args):
        pass  # Sessiz
