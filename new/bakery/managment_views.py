# django imports
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader

# other imports
import json
from . import db_functions as db
from . import purchase_views as pr

# constants
VALID_OBJECTS = ['cakes', 'cookies', 'packages']
VALID_ACTIONS = ['delete', 'update']


def objects(request):
    """
        This function returns objects.
    """

    # get the data
    tag = request.GET['tags']
    obj = request.GET['object']

    # check if the object is in the valud objects list
    if obj not in VALID_OBJECTS:

        return HttpResponse(json.dumps(f"Error: 'object' argument is required and has to be on of: {VALID_OBJECTS}."), content_type="application/json")

    # if tag does not exist
    if not tag:

        tag = ""

    # get the list of the cakes
    objects = db.object_by_tag(obj, tag)
    final_objects = []

    # go through objects
    for obj_item in objects:

        # unpack the object
        id, name, price, description, tags, images = obj_item
        obj_dict = {"id": id, "name": name, "price": price, "description": description, "tags": tags, "images": images}

        # insert a new object to the final objects list
        final_objects.append(obj_dict)

    data = json.dumps({

        'message': final_objects

    })

    # return the data
    return HttpResponse(data, content_type="application/json")


def manage(request):
    """
        This function is for route that edits products.
    """

    # get the data
    obj = request.GET['object']
    action = request.GET['action']
    product_id = request.GET['id']

    try:

        price = request.GET['price']

    except:

        pass


    # check if the object is valid
    if not obj in VALID_OBJECTS:

        data = json.dumps({

            "message": f"Error: 'object' attribute is required and has to be one of: {VALID_OBJECTS}."

        })

    # check if the action is valid
    if not action in VALID_ACTIONS:
        
        data = json.dumps({

            "message": f"Error: 'action' attribute is required and has to be one of: {VALID_ACTIONS}."

        })

    # check if the action is delete
    elif action == "delete":
        
        db.delete_product(obj, product_id)

        data = json.dumps({

            "message": "Success"

        })

    # if the action is update
    elif action == "update":

        db.update_product(obj, product_id, "price", price)

        data = json.dumps("Success")

    else:

        data = json.dumps(f"Error: 'action' attribute is required and has to be one of: {VALID_ACTIONS}.")

    # return the data
    return HttpResponse(data, content_type="application/json")


def create_product(request):
    """
        This function is for creating a product.
    """

    # check if it is get
    if request.method == 'GET':

        template = loader.get_template('add_product.html')
        context = {}

        return HttpResponse(template.render(context,request))

    # get form data
    obj = request.POST['object']
    name = request.POST['name']
    price = request.POST['price']
    description = request.POST['description']
    tags = request.POST['tags']
    images = request.POST['images']

    # check if the object is in the valud objects list
    if obj not in VALID_OBJECTS:

        return HttpResponse(json.dumps({

            'message': f"Error: 'object' argument is required and has to be on of: {VALID_OBJECTS}."

        }), content_type="application/json")

    # if tag does not exist
    if not tags:

        tags = ""

    try:


        # create the product
        db.add_product(obj, name, price, description, tags, images)

        # get new id
        product_id, name, price, description, tags, images = db.object_by_name(obj, name)

        # define a product name in the stripe store
        product_name = f"{product_id}:{obj}"

        # create product in stripe
        pr.create_stripe_product(product_name, name, price)

        return HttpResponse(json.dumps(f"Successfully created {product_name}."), content_type="application/json")

    except:

        return HttpResponse(json.dumps({

            'message': "Error."

        }), content_type="application/json")