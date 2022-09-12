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
from . import views, story_views, purchase_views, mail_views, managment_views
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('objects/', managment_views.objects, name = 'objects'),
    path('manage/', managment_views.manage, name = 'manage'),
    path('purchase/', purchase_views.purchase, name = 'purchase'),
    path('create_product/', managment_views.create_product, name = 'create_product'),
    path('search/', managment_views.search, name = 'search'),
    path('sendmail/', mail_views.sendmail, name = 'sendmail'),
    path('get_story/', story_views.get_story, name = 'get_story'),
    path('set_story/', story_views.set_story, name = 'set_story'),
    path('success/', purchase_views.success, name = 'success'),
    path('cancel/', purchase_views.cancel, name = 'cancel'),
    path('get_purchase/', purchase_views.get_purchase, name = 'get_purchase')
]