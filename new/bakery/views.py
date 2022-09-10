# django imports
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader


def index(request):

    # get the template
    template = loader.get_template('checkout.html')
    context = {}

    return HttpResponse(template.render(context,request))