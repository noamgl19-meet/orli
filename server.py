# AUTHOR: Noam Globerman
# File: server.py
# Description: Flask API server for the bakery application
# Date: 02.09.2022

# imports
from flask import Flask, render_template, url_for, request, abort, session, redirect
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from handlers import objectsHandler, manageHandler
from payment_handlers import purchaseProductHandler, createProductHandler

import stripe

# define the flask application
app = Flask(__name__,
            static_url_path='',
            static_folder='public')
app.config['SECRET_KEY'] = 'miya'
app.config['STRIPE_PUBLIC_KEY'] = 'pk_test_oKlrfBA0g5w1gvPbnxxYQbPZ00GEjF9DyY'
app.config['STRIPE_SECRET_KEY'] = 'sk_test_51FEENmLXM9Y1aZOIN1YMw9RndUORhwcd5ZBvXZWGja1KAyU7fHLWqUHlJruxMFA4djrdDNEKvqU4NSc3mchndf7E0025oflX8N'
CORS(app)
api = Api(app)


@app.route('/thanks')
def thanks():

    return render_template('thanks.html')


@app.route('/')
def index():
    """
        Route to send the react app.
    """

    return render_template('checkout.html')


@app.route('/add_product')
def add_product():
    
    return render_template("add_product.html")

# add handler for objects
api.add_resource(objectsHandler, '/objects')

# add handler for management
api.add_resource(manageHandler, '/manage')

# add handler for purchase
api.add_resource(purchaseProductHandler, '/purchase')

# add handler for create a product
api.add_resource(createProductHandler, '/create_product')


if __name__ == '__main__':

    # run the app
    app.run(debug = True, host = "0.0.0.0", port = 800)