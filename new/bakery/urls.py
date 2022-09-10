"""new URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name = 'index'),
    path('objects/', views.objects, name = 'objects'),
    path('manage/', views.manage, name = 'manage'),
    path('purchase/', views.purchase, name = 'purchase'),
    path('create_product/', views.create_product, name = 'create_product'),
    path('sendmail/', views.sendmail, name = 'sendmail'),
    path('get_story/', views.get_story, name = 'get_story'),
    path('set_story/', views.set_story, name = 'set_story')
]
