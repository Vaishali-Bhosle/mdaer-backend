from django.db import models

class HODCoordinator(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.IntegerField()
    department = models.CharField(max_length=255)
    state = models.CharField(max_length=100)

    def __str__(self):
        return self.name
