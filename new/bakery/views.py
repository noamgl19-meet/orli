# django imports
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from .image_handler import from_binary
import os


def index(request):

    if request.method == 'POST':

        content = bytes(request.POST['data'], encoding='ascii')
        print(type(content))
        from_binary("try1.jpg", content)
        
    # get the template
    template = loader.get_template('checkout.html')
    context = {}

    return HttpResponse(template.render(context,request))