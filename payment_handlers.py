# AUTHOR: Noam Globerman
# File: handlers.py
# Description: Flask API server for the bakery application
# Date: 02.09.2022

# imports
from flask_restful import Api, Resource, reqparse
from db_functions import *
from flask import request, session, render_template, redirect
import stripe

# constants
VALID_OBJECTS = ['cakes', 'cookies', 'packages']
CURRENCY = "ILS"

# stripe config
YOUR_DOMAIN = "http://localhost:800"
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


# a class for creating a product
class createProductHandler(Resource):

    
    def post(self):

        # define that only tag and object type are supported
        parser = reqparse.RequestParser()
        parser.add_argument('object', type = str)
        parser.add_argument('name', type = str)
        parser.add_argument('price', type = float)
        parser.add_argument('description', type = str)
        parser.add_argument('tags', type = str)
        parser.add_argument('images', type = str)

        # get the args
        args = parser.parse_args()
        obj = str(args['object']).lower()
        name = args['name']
        price = args['price']
        description = args['description']
        tags = args['tags']
        images = args['images']

        # check if the object is in the valud objects list
        if obj not in VALID_OBJECTS:

            return {

                'message': f"Error: 'object' argument is required and has to be on of: {VALID_OBJECTS}."

            }

        # if tag does not exist
        if not tags:

            tags = ""

        try:

            # create the product
            add_product(obj, name, price, description, tags, images)

            # get new id
            product_id, name, price, description, tags, images = object_by_name(obj, name)

            # define a product name in the stripe store
            product_name = f"{product_id}:{obj}"

            # create product in stripe
            create_stripe_product(product_name, name, price)

            return {

                'message': f"Successfully created {product_name}."

            }

        except:

            return {

                'message': "Error."

            }

    
    def get(self):

        # method not allowed
        return {

            'message': 'Error: method get not allowed.'

        }


# a class for purchasing a product
class purchaseProductHandler(Resource):

    
    def post(self):

        # define that only tag and object type are supported
        parser = reqparse.RequestParser()
        parser.add_argument('object', type = str)
        parser.add_argument('name', type = str)
        parser.add_argument('amount', type = str)

        # get the args
        args = parser.parse_args()
        obj = str(args['object']).lower()
        name = args['name']
        amount = args['amount']

        product_id = object_by_name(obj, name)[0]
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

                print(product['description'])
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
            return str(e)

        return redirect(checkout_session.url, code=303)

    
    def get(self):

        # method not allowed
        return {

            'message': 'Error: method get not allowed.'

        }