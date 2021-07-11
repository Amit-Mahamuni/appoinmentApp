from django.urls import path
from . import views

urlpatterns = [
    path('getlist/', views.crud),
    path('addAppoinment/', views.addAppoinment),
    path('deleteAppoinment/', views.deleteAppoinment),
    path('updateAppoinment/', views.updateAppoinment),
    path('getuserinfo/', views.usergetInfo),
    path('checkuserinfo/', views.checkgetInfo),
]