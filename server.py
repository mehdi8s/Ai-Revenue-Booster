"""
Portfolio dev server.
- Static dosyalari sunar (http://localhost:8080)
- AI chat/proxy ozellikleri kaldirildi
"""

import os
from http.server import HTTPServer, SimpleHTTPRequestHandler


PORT = int(os.environ.get("PORT", 8080))


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server = HTTPServer(("", PORT), SimpleHTTPRequestHandler)
    print(f"[OK] Portfolio server running -> http://localhost:{PORT}")
    print("   (Durdurmak icin Ctrl+C)\n")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[STOP] Server stopped.")
