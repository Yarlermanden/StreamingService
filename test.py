from socket import *
#from socketIO_client import SocketIO, LoggingNamespace
#import socketio
import sys

#host = '192.168.1.83'
host = 'localhost'
port = 5003






#sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#server_address = (host, port)

#sock.connect(server_address)
#sock.connect((host, port))

try:
    #socketIO = SocketIO(host, port)
    #socketIO.emit('aaa')
    #socketIO.wait(seconds=1)

    #sio = socketio.Client()
    #@sio.event
    #def message(data):
        #print('received message')

    #@sio.event
    #def connect():
        #print('connected')

    #sio.connect('http:\/\/localhost:5003')
    #sio.connect('192.168.1.1:5003')
    #sio.emit('message', 'hello')

    #client = socket(AF_UNIX, SOCK_STREAM)
    #client = socket()
    #client.connect('192.168.1.1:5003')
    #client.connect(('192.168.1.1', 5003))
    #client.send('hey'.encode())


    #client = socket(AF_INET, SOCK_DGRAM)
    client = socket(AF_INET, SOCK_STREAM)
    server_address = ('192.168.1.1', 5003)
    client.connect(server_address)
    #message = 'this is the message'
    message = input()
    client.sendall(message.encode())

    #message = 'hello motherfucker'
    #client.sendto(message.encode(), ('192.168.1.1', 5003))
    
    #message = "this is a message"
    #sock.send(message)
    #for i in range(1):

        #while amount_received < amount_expected:
            #data=sock.recv(16)
            #amount_received += len(data)

    #amount_received = 0
    #amount_expected = len(message)


except Exception as e:
    print(e)
finally:
    print('closing socket')
    #sock.close()
