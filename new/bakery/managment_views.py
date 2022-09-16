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
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    tag = body['tags']
    obj = body['object']

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
        id, name, price, description, tags, images, allergic = obj_item
        obj_dict = {"id": id, "name": name, "price": price, "description": description, "tags": tags, "images": images, "allergic": allergic, "object": obj}

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
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    obj = body['object']
    action = body['action']
    product_id = body['id']

    product_name = f"{product_id}:{obj}"

    try:

        price = body['price']

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
        pr.delete_stripe_product(product_name)

        data = json.dumps({

            "message": "Success"

        })

    # if the action is update
    elif action == "update":

        db.update_product(obj, product_id, "price", price)
        pr.update_stripe_price(product_name, price)

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
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    obj = body['object']
    name = body['name']
    price = body['price']
    description = body['description']
    tags = body['tags']
    images = body['images']
    allergic = body['allergic']

    # check if the object is in the valud objects list
    if obj not in VALID_OBJECTS:

        return HttpResponse(json.dumps({

            'message': f"Error: 'object' argument is required and has to be on of: {VALID_OBJECTS}."

        }), content_type="application/json")

    # if tag does not exist
    if not tags:

        tags = ""

    try:

        # handle the image
        

        # create the product
        db.add_product(obj, name, price, description, tags, images, allergic)

        # get new id
        product_id, name, price, description, tags, images, allergic = db.object_by_name(obj, name)

        # define a product name in the stripe store
        product_name = f"{product_id}:{obj}"

        # create product in stripe
        pr.create_stripe_product(product_name, name, price)

        return HttpResponse(json.dumps(f"Successfully created {product_name}."), content_type="application/json")

    except:

        return HttpResponse(json.dumps({

            'message': "Error."

        }), content_type="application/json")


def search(request):
    """
        Returns a list of all items with the name.
    """

    # get the requested name
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    search = body['string']

    # go through valid objects
    for obj in VALID_OBJECTS:

        # search
        searched_item = db.object_like_name(obj, search)

        # check if returned None
        if searched_item != []:

            break

    # if nothing found
    if searched_item == []:

        return HttpResponse(json.dumps("Nothing found."), content_type="application/json")
    
    # init return list
    return_list = []

    # go through searched item
    for item in searched_item:

        # unpack and make a return object
        id, name, price, description, tags, images, allergic = item

        return_object = {

            "id": id,
            "name": name,
            "price": price,
            "description": description,
            "tags": tags,
            "images": images,
            "allergic": allergic,
            "object": obj

        }

        # append return_object to the list
        return_list.append(return_object)
    
    return HttpResponse(json.dumps(return_list), content_type="application/json")


def object_id(request):
    """
        This returns an object by ID.
    """

    # get the requested id and object
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    obj = body['object']
    id = body['id']

    # get the object
    obj_tuple = db.object_by_id(obj, id)

    # check if empty
    if obj_tuple == None:

        return HttpResponse(json.dumps("Error: no objects found."), content_type = "application/json")

    # unpack
    id, name, price, description, tags, images, allergic = obj_tuple

    # return object
    return_object = {

        "id": id,
        "name": name,
        "price": price,
        "description": description,
        "tags": tags,
        "images": images,
        "allergic": allergic

    }

    # return this object
    return HttpResponse(json.dumps(return_object), content_type = "application/json")