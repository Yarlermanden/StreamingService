import socket
import sys

host = '192.168.1.83'
port = 5003

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_address = (host, port)

#sock.connect(server_address)
sock.connect((host, port))

try:
    message = "this is a message"
    for i in range(1):
        sock.send(message)

        #while amount_received < amount_expected:
            #data=sock.recv(16)
            #amount_received += len(data)
    amount_received = 0
    amount_expected = len(message)



except:
    print("error")
finally:
    print('closing socket')
    sock.close()
