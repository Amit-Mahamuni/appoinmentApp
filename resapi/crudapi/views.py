from django.http import JsonResponse
from .models import appoinment, user
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

def crud(req):
    custAll = list(appoinment.objects.values())
    return JsonResponse(custAll, safe=False)


@csrf_exempt
def addAppoinment(req):
    newapp = appoinment(
        name=req.POST['name'],
        phone=req.POST['phone'],
        mail=req.POST['mail'],
        reason=req.POST['reason'],
        date=req.POST['date'],
        time=req.POST['time'],
        note=req.POST['note'],
        priorty=req.POST['priorty']
    )
    newapp.save()
    return JsonResponse({"status": "true"}, safe=False)


@csrf_exempt
def deleteAppoinment(req):
    # appoinment.objects.get(pk=req.POST['id'])
    delapp = appoinment.objects.get(pk=req.POST['id'])
    delapp.delete()
    return JsonResponse({"status": "true"}, safe=False)


@csrf_exempt
def updateAppoinment(req):
    print(req.POST['id'])
    appoinment.objects.filter(pk=req.POST['id']).update(
        name=req.POST['name'],
        phone=req.POST['phone'],
        mail=req.POST['mail'],
        reason=req.POST['reason'],
        date=req.POST['date'],
        time=req.POST['time'],
        note=req.POST['note'],
        priorty=req.POST['priorty']
    )
    # updateapp = appoinment.objects.get(pk=req.POST['id'])
    # updateapp.name = req.POST['name']
    # updateapp.phone = req.POST['phone']
    # updateapp.mail = req.POST['mail']
    # updateapp.reason = req.POST['reason']
    # updateapp.date = req.POST['date'],
    # updateapp.time = req.POST['time'],
    # updateapp.note = req.POST['note'],
    # updateapp.priorty = req.POST['priorty']
    # updateapp.save()
    return JsonResponse({"status": "true"}, safe=False)


def usergetInfo(req):
    temp_user = list(user.objects.values())
    return JsonResponse(temp_user, safe=False)


@csrf_exempt
def checkgetInfo(req):
    try:
        temp = user.objects.get(username=req.POST['username'], password=req.POST['password'])
        print(temp.id)
        json_temp = {
            "id": temp.id,
            "name": temp.name,
            "phone": temp.phone,
            "mail": temp.mail,
            "username": temp.username,
            "type": temp.type
        }
        return JsonResponse({"status": "true","data" : json_temp}, safe=False)
    except:
         return JsonResponse({"status":"false"}, safe=False)

