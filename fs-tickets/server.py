#!/usr/bin/env python3
"""
Simple HTTP server to serve the FiveSense ticket viewer
"""

import http.server
import socketserver
import os
import webbrowser
from urllib.parse import urlparse, unquote

PORT = 8000

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def do_GET(self):
        # Parse the URL to handle special cases
        parsed_path = urlparse(self.path)
        filepath = unquote(parsed_path.path)
        
        # Handle root path
        if filepath == '/' or filepath == '/index.html':
            self.path = '/index.html'
        # Handle ticket transcript
        elif filepath.startswith('/ticket/') and filepath.endswith('.html'):
            # Ensure we're serving from the correct directory
            pass
        
        return super().do_GET()

def main():
    # Change to the script's directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Set up the server
    handler = CustomHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"Serving FiveSense Ticket Viewer at http://localhost:{PORT}")
        print("Press Ctrl+C to stop the server")
        
        try:
            # Open the browser automatically
            webbrowser.open(f"http://localhost:{PORT}")
            # Start the server
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
        except Exception as e:
            print(f"Error starting server: {e}")

if __name__ == "__main__":
    main()