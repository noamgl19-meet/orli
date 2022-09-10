# django imports
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader

# other imports
import json
from . import db_functions as db

# constants
VALID_OBJECTS = ['cakes', 'cookies', 'packages']
VALID_ACTIONS = ['delete', 'update']


def index(request):

    # get the template
    template = loader.get_template('checkout.html')
    context = {}

    return HttpResponse(template.render(context,request))