from django.db import models

class MedicalDevice(models.Model):
    name = models.CharField(max_length=255)
    manufacturer = models.CharField(max_length=255)
    model_number = models.CharField(max_length=100, blank=True, null=True)
    serial_number = models.CharField(max_length=100, blank=True, null=True)
    risk_classification = models.CharField(max_length=50, choices=[
        ('A', 'Low Risk'),
        ('B', 'Medium Risk'),
        ('C', 'High Risk'),
        ('D', 'Critical Risk')
    ])
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.manufacturer}"
