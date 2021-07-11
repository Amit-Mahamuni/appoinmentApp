from django.db import models

# Create your models here.

class appoinment(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=13)
    mail = models.CharField(max_length=50)
    reason = models.CharField(max_length=10)
    date = models.DateField()
    time = models.TimeField()
    note = models.CharField(max_length=150)
    priorty = models.IntegerField()

class user(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=13)
    mail = models.CharField(max_length=50)   
    username = models.CharField(max_length=15)
    password = models.CharField(max_length=20) 
    type = models.IntegerField()