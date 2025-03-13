from django.urls import path
from .views import UserCreateView, UserListView, UserDetailView, UserUpdateView, UserDeleteView

urlpatterns = [
    path('create/', UserCreateView.as_view(), name='user-create'),
    path('list/', UserListView.as_view(), name='user-list'),
    path('<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('<int:pk>/update/', UserUpdateView.as_view(), name='user-update'),
    path('<int:pk>/delete/', UserDeleteView.as_view(), name='user-delete'),
]
