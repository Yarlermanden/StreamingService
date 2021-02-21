from socket import *
import sys

host = 'localhost'
port = 5003


try:
    client = socket(AF_INET, SOCK_STREAM)
    server_address = ('192.168.1.83', 5003)
    client.connect(server_address)
    message = ""
    while(message != 'q'):
        message = input()
        client.sendall(message.encode())

except Exception as e:
    print(e)
finally:
    print('closing socket')
    client.close()
