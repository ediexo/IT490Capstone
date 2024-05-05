import pika
import json 
import send2DB

# use the backend rabbitmq credentials to connect to the server
credentials=pika.PlainCredentials('backend', 'backendpass')
parameters=pika.ConnectionParameters('localhost', 5672, '/', credentials)
# connect to the broker with the credentials
connection = pika.BlockingConnection(parameters)
# declare the queue name
channel = connection.channel()

def main():
    
    def callback(ch, method, properties, body):
        ch.basic_ack(delivery_tag = method.delivery_tag)
        data = json.dumps(body)
        print(f" [x] Received "+ data["key"] + " = " + data["username"])
        send2DB.send(body)

    channel.basic_consume(queue='fe2be', on_message_callback=callback,auto_ack=False )

    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

main()