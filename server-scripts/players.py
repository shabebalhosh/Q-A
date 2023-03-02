from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import arabic_reshaper

class RequestHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        # Disable logging
        pass
    
    def do_OPTIONS(self):
        # Set CORS headers
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        # Set CORS headers
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

        # Parse the request body
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        data = json.loads(body)

        # Extract the name from the request body
        name = data.get('name') + ' انضم إلى المسابقة  !'

        name_reshape = arabic_reshaper.reshape(name)

        name_final = name_reshape[::-1]

        # Print the name to the console
        print(name_final)

if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, RequestHandler)
    print('Server running at http://192.168.0.100:8000')
    httpd.serve_forever()