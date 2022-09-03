# AUTHOR: Noam Globerman
# File: handlers.py
# Description: Flask API server for the bakery application
# Date: 02.09.2022

# imports
from flask_restful import Api, Resource, reqparse
from db_functions import *
from flask import request, session

# constants
VALID_OBJECTS = ['cakes', 'cookies', 'packages']
VALID_ACTIONS = ['delete', 'update']
VALID_FIELDS = ['id', 'name', 'price', 'description', 'tages', 'images']
VALID_CART_ACTIONS = ['add', 'remove']


def add_to_cart(product_id, obj):
    """
        Takes product id and adds it to cart
    """

    print(session['cart'])

    session['cart'].append({'id': product_id, 'object': obj})

    print(session['cart'])


def remove_from_cart(product_id, obj):
    """
        Takes product id and adds it to cart
    """

    print(session['cart'])

    session['cart'].remove({'id': product_id, 'object': obj})

    print(session['cart'])


# # class for cart functions
# class cartHandler(Resource):


#     def post(self):

#         # method not allowed
#         return {

#             'message': 'Error: method post not allowed.'

#         }

    
#     def get(self):

#         # define which values are supported
#         parser = reqparse.RequestParser()
#         parser.add_argument('object', type = str, required = True)
#         parser.add_argument('action', type = str, required = True)
#         parser.add_argument('id', type = int, required = True)

#         # get arguments
#         args = parser.parse_args()
#         obj = args['object']
#         action = args['action']
#         product_id = args['id']

#         # check if the action is allowd
#         if not action in VALID_CART_ACTIONS:

#             return {

#                 "message": f"Error: 'action' attribute has to be one of: {VALID_CART_ACTIONS}."

#             }

#         # check if it is add to cart
#         elif action == "add":

#             # add to cart
#             add_to_cart(product_id, obj)

#         # if it is remove
#         else:

#             remove_from_cart(product_id, obj)


# class for manage the db
class manageHandler(Resource):

    
    def post(self):

        # method not allowed
        return {

            'message': 'Error: method post not allowed.'

        }

    
    def get(self):

        # define which values are supported
        parser = reqparse.RequestParser()
        parser.add_argument('object', type = str)
        parser.add_argument('action', type = str)
        parser.add_argument('id', type = int, required = True)
        parser.add_argument('name', type = str)
        parser.add_argument('price', type = float)
        parser.add_argument('description', type = str)
        parser.add_argument('tags', type = str)
        parser.add_argument('images', type = str)
        parser.add_argument('field', type = str)

        # get the args
        args = parser.parse_args()
        obj = args['object']
        action = str(args['action']).lower()
        product_id = args['id']
        name = args['name']
        price = args['price']
        description = args['description']
        tags = args['tags']
        images = args['images']
        field = args['field']

        # check if the object is valid
        if not obj in VALID_OBJECTS:

            return {

                "message": f"Error: 'object' attribute is required and has to be one of: {VALID_OBJECTS}."

            }

        # check if the action is valid
        if not action in VALID_ACTIONS:
            
            return {

                "message": f"Error: 'action' attribute is required and has to be one of: {VALID_ACTIONS}."

            }

        # check if the action is delete
        elif action == "delete":
            
            delete_product(obj, product_id)

            return {

                "message": "Success"

            }

        # if the action is update
        elif action == "update":

            # check that all needed fields are filled
            if field and args[field] and field in VALID_FIELDS:

                update_product(obj, product_id, field, args[field])

                return {

                    "message": "Success"

                }

        else:

            return {

                "message": f"Error: 'action' attribute is required and has to be one of: {VALID_ACTIONS}."

            }


# class for get all objects
class objectsHandler(Resource):

    
    def get(self):

        # define that only tag and object type are supported
        parser = reqparse.RequestParser()
        parser.add_argument('tag', type = str)
        parser.add_argument('object', type = str)

        # get the args
        args = parser.parse_args()
        tag = args['tag']
        obj = str(args['object']).lower()

        # check if the object is in the valud objects list
        if obj not in VALID_OBJECTS:

            return {

                'message': f"Error: 'object' argument is required and has to be on of: {VALID_OBJECTS}."

            }

        # if tag does not exist
        if not tag:

            tag = ""

        # get the list of the cakes
        objects = object_by_tag(obj, tag)
        final_objects = []

        # go through objects
        for obj_item in objects:

            # unpack the object
            id, name, price, description, tags, images = obj_item
            obj_dict = {"id": id, "name": name, "price": price, "description": description, "tags": tags, "images": images}

            # insert a new object to the final objects list
            final_objects.append(obj_dict)

        data = {

            'message': final_objects

        }

        print(data)

        return data

    
    def post(self):

        # method not allowed
        return {

            'message': 'Error: method post not allowed.'

        }