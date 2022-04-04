from django.db import models

class Login(models.Model):
    user_id = models.IntegerField()
    username = models.CharField(max_length=64)
    phash = models.CharField(max_length=64)
    fname = models.CharField(max_length=64)
    lname = models.CharField(max_length=64)
