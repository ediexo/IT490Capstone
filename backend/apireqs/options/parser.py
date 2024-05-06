import json
import register, requestData
from .. import send2FE, send2DB
#defines what type of function needs to be performed depending on the "key" in the json"

def main(body):     #body is the diction
    key = body['key']
    if (key == "login"):
        send2DB.send(body)
    elif (key == "register"):
        register.main(body)
    elif (key == "request"):
        requestData.main(body)
    else:
        message = {"error": "invalid json key"}
        sM = json.dumps(message)
        send2FE.send(sM)
    