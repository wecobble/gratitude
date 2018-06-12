"""
    Main for SC
    :param operation: operation
    :type operation: str
    :param args: list of arguments
        args[0]: sender scripthash
        args[1]: message
    :param type: str
"""

from boa.interop.Neo.TriggerType import Application, Verification
from boa.interop.Neo.Runtime import GetTrigger, CheckWitness, Notify, Log, GetTime, Serialize, Deserialize
from boa.builtins import concat, list
from boa.interop.Neo.Storage import Get, Put, GetContext

CONTRACT_OWNER = "TA"


def Main(operation, args):

    trigger = GetTrigger()

    if trigger == Verification():
        is_owner = CheckWitness(CONTRACT_OWNER)
        if is_owner:
            return True
        else:
            return False
    elif trigger == Application():
        sender = args[0]
        authorized = CheckWitness(sender)
        """
            Make sure that invoker is valid
        """
        if not authorized:
            Notify("Not authorized")
            return False
        Log("test")
        Notify(len(args))
        """
            query operations    
        """
        if operation == "sendMessage" and len(args) == 2:
            Notify("In operation sendMessage")
            return sendMessage(args)
        else:
            return False
    return False


def sendMessage(args):

    # Args
    sender = args[0]
    message = args[1]
    time = GetTime()

    context = GetContext()
    count = 'count'
    lastCount = Get(context, count)

    if lastCount == '':
        newCount = 1
    else:
        newCount = lastCount + 1
    
    Put(context, count, newCount)

    key = concat('message.',newCount)

    rawData = [message, time, sender]
    value = Serialize(rawData)
    
    Put(context, key, value)
    Notify(concat('Put message: ', value))

    return True
