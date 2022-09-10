# django imports
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader

# other imports
import json
from . import db_functions as db
import stripe
import ast
import datetime

# constants
VALID_OBJECTS = ['cakes', 'cookies', 'packages']
CURRENCY = "ILS"

# stripe config
YOUR_DOMAIN = "http://localhost:8000"
stripe.api_key = 'sk_test_51FEENmLXM9Y1aZOIN1YMw9RndUORhwcd5ZBvXZWGja1KAyU7fHLWqUHlJruxMFA4djrdDNEKvqU4NSc3mchndf7E0025oflX8N'


def delete_stripe_product(product_name):
    """
        Deletes stripe product by his id.
    """

    # get all products
    products = stripe.Product.list()

    # go through products
    for product in products:

        if product['description'] == product_name:

            final_product = product

    # make the change
    stripe.Product.modify(final_product['id'], default_price = "", active = False)


def update_stripe_price(product_name, price):
    """
        Updates price of a product.
    """

    # get all products
    products = stripe.Product.list()

    # go through products
    for product in products:

        if product['description'] == product_name:

            final_product = product

    newprice = int(float(price) * 100)

    # create a new price
    price_object = stripe.Price.create(
        unit_amount = newprice,
        currency = CURRENCY,
        product = final_product['id']
    )
    
    price_id = price_object['id']

    stripe.Product.modify(final_product['id'], default_price = price_id)


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


def success(request):
    """
        This adds the purchase to history.
    """

    # get data
    cart = ast.literal_eval(request.GET['cart'])
    time = request.GET['time']
    print(cart)

    # go through cart
    for item in cart:

        print(item)
        # keep the values of the item object
        obj = item["object"]
        name = item['name']
        amount = item['amount']

        # document the purchase in DB
        db.add_purchase(obj, name, amount, time)

    return HttpResponse(json.dumps("Success"), content_type = "application/json")


def cancel(request):
    """
        This returns cancel.
    """

    return HttpResponse(json.dumps("Cancel"), content_type = "application/json")


def purchase(request):
    """
        This purchase method is to connect to stripe and make the purchase.
    """

    # get the data from the request and keep it as a list
    data = ast.literal_eval(request.POST.get('data'))

    # get all products
    all_products = stripe.Product.list()["data"]

    # init cart items
    cart_items = []

    # go through data sent
    for item in data:

        # unpack the item
        try:

            item = dict(item)
            obj = item['object']
            name = item['name']
            amount = item['amount']

        except:

            # skip
            continue

        # get the id of the product
        product_id = db.object_by_name(obj, name)[0]
        product_name = f"{product_id}:{obj}"

        # init empty price_id
        price_id = ""

        # go through the products
        for product in all_products:

            # check if the id aint None
            if product['description'] != None:

                # check if the name equals to our given name
                if product['description'] == product_name:

                    price_id = product["default_price"]

        # check if price_id is still none
        if price_id == "":
            
            # skip
            continue
        
        # append to cart items
        cart_items.append({'price': price_id, 'quantity': amount})

    # check if there are any items in cart
    if len(cart_items) > 0:

        # make the purchase
        try:

            # keep current time
            current_time = datetime.datetime.now()

            # open a session
            checkout_session = stripe.checkout.Session.create(
                
                line_items=cart_items,
                mode='payment',
                success_url=f"{YOUR_DOMAIN}/success?cart={data}&time={current_time}",
                cancel_url=f"{YOUR_DOMAIN}/cancel/"

            )

        except Exception as e:

            return HttpResponse(json.dumps({'error': str(e)}), content_type="application/json")

        return redirect(checkout_session.url, code=303)

    else:

        return HttpResponse(json.dumps({'error': 'Cart is empty'}), content_type="application/json")


def get_purchase(request):
    """
        This function returns the purchases.
    """

    # get the data from the DB
    rows = db.get_purchase()
    print(rows)

    final_rows = []

    # go through rows
    for row in rows:

        # unpack the row
        row_id, obj, name, amount, time = row

        # append the new object
        final_rows.append({"id": row_id, "object": obj, "name": name, "amount": amount, "time": time})

    return HttpResponse(json.dumps(final_rows), content_type = "application/json")