import socket

HOST = '127.0.0.1'  # listen on all available interfaces
PORT = 5000     # use a free port number

# create a TCP/IP socket
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    # bind the socket to a specific host and port
    s.bind((HOST, PORT))
    # listen for incoming connections
    s.listen()
    print('Python script running. Type "start" to notify the web application.')
    while True:
        # wait for the user to type 'start' on the command line
        user_input = input()
        if user_input == 'start':
            # accept a connection
            conn, addr = s.accept()
            # send a message to the connected client
            conn.sendall(b'script_started')
            print('Sent "script_started" message to web application.')
            break
