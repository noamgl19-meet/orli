from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
import json
from . import db_functions as db

import stripe

# constants
VALID_OBJECTS = ['cakes', 'cookies', 'packages']
VALID_ACTIONS = ['delete', 'update']
VALID_FIELDS = ['id', 'name', 'price', 'description', 'tages', 'images']
VALID_CART_ACTIONS = ['add', 'remove']
CURRENCY = "ILS"

# stripe config
YOUR_DOMAIN = "http://localhost:8000"
stripe.api_key = 'sk_test_51FEENmLXM9Y1aZOIN1YMw9RndUORhwcd5ZBvXZWGja1KAyU7fHLWqUHlJruxMFA4djrdDNEKvqU4NSc3mchndf7E0025oflX8N'


def create_stripe_product(description, name, price):
    """
        Takes a name and a price and create a stripe object.
    """

        
    # create the product itself and get its stripe id
    product = stripe.Product.create(name = name, description = description)
    product_id = product.get("id")

    # parse price
    price = int(price * 100)

    # create a price for it
    price_object = stripe.Price.create(

        unit_amount = price,
        currency = CURRENCY,
        # recurring={"interval": "month"},
        product = product_id

    )
    price_id = price_object.get("id")
    
    # recreate the product
    stripe.Product.modify(product_id, default_price = price_id)


def index(request):

    # get the template
    template = loader.get_template('checkout.html')
    context = {}

    return HttpResponse(template.render(context,request))


def objects(request):
    """
        This function returns objects.
    """

    # get the data
    tag = request.GET['tags']
    obj = request.GET['object']

    # check if the object is in the valud objects list
    if obj not in VALID_OBJECTS:

        return {

            'message': f"Error: 'object' argument is required and has to be on of: {VALID_OBJECTS}."

        }

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
    price = request.GET['price']


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

        data = json.dumps({

            "message": "Success"

        })

    else:

        data = json.dumps({

            "message": f"Error: 'action' attribute is required and has to be one of: {VALID_ACTIONS}."

        })

    # return the data
    return HttpResponse(data, content_type="application/json")


def purchase(request):
    """
        This purchase method is to connect to stripe and make the purchase.
    """

    # get the data
    obj = request.POST['object']
    name = request.POST['name']
    amount = request.POST['amount']

    # get the id of the product
    product_id = db.object_by_name(obj, name)[0]
    product_name = f"{product_id}:{obj}"

    # check if the object is in the valud objects list
    if obj not in VALID_OBJECTS:

        return {

            'message': f"Error: 'object' argument is required and has to be on of: {VALID_OBJECTS}."

        }

    # init empty price_id
    price_id = ""

    # get all products
    all_products = stripe.Product.list()["data"]

    # go through the products
    for product in all_products:

        # check if the id aint None
        if product['description'] != None:

            # check if the name equals to our given name
            if product['description'] == product_name:

                price_id = product["default_price"]

    # make the purchase
    try:

        checkout_session = stripe.checkout.Session.create(
            
            line_items=[
                
                {
                    # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    'price': price_id,
                    'quantity': amount
                }

            ],
            mode='payment',
            success_url=YOUR_DOMAIN + '/success.html',
            cancel_url=YOUR_DOMAIN + '/cancel.html'

        )

    except Exception as e:

        return HttpResponse(json.dumps({'error': str(e)}), content_type="application/json")

    return redirect(checkout_session.url, code=303)


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
        create_stripe_product(product_name, name, price)

        return HttpResponse(json.dumps({

            'message': f"Successfully created {product_name}."

        }), content_type="application/json")

    except:

        return HttpResponse(json.dumps({

            'message': "Error."

        }), content_type="application/json")