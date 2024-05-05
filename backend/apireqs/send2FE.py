#!/usr/bin/env python3
import pika
import pika.exceptions
import json



def send(newU):

  credentials=pika.PlainCredentials('backend', 'backendpass')
  parameters=pika.ConnectionParameters(host='localhost', port=5672, virtual_host="/", credentials=credentials)
  # connect to the broker with the credentials
  connection = pika.BlockingConnection(parameters)
  # declare the queue name
  channel = connection.channel()

  #channel.confirm_delivery()
  channel.queue_declare(queue='be2fe', durable=True)
  print("BE to FE declared")
  #test_json of possible information
  user_json = newU

  try:
  # publish text to the queue and echo in terminal the message
    success = channel.basic_publish(exchange='', routing_key='be2fe', body=user_json, mandatory=True) #success = whether or not the queue is working
    print(f" [x] Sent user_json final")
    return success

  except pika.exceptions.UnroutableError:
    print (f"Message Returned")
    return False
  
  connection.close()

