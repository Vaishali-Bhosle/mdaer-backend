from django.urls import path
from .views import MedicalDeviceListCreateView, MedicalDeviceDetailView
urlpatterns = [
    path('devices/', MedicalDeviceListCreateView.as_view(), name='device-list'),
    path('devices/<int:pk>/', MedicalDeviceDetailView.as_view(), name='device-detail'),
   
]
