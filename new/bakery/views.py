# django imports
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from django.core.mail import send_mail, EmailMessage
from django.conf import settings

# other imports
import json
from . import db_functions as db
import stripe
import ast
import datetime

# constants
VALID_OBJECTS = ['cakes', 'cookies', 'packages']
VALID_ACTIONS = ['delete', 'update']
VALID_FIELDS = ['id', 'name', 'price', 'description', 'tages', 'images']
VALID_CART_ACTIONS = ['add', 'remove']
CURRENCY = "ILS"
STORY_FILE = "./bakery/ourStory"

# stripe config
YOUR_DOMAIN = "http://localhost:8000"
stripe.api_key = 'sk_test_51FEENmLXM9Y1aZOIN1YMw9RndUORhwcd5ZBvXZWGja1KAyU7fHLWqUHlJruxMFA4djrdDNEKvqU4NSc3mchndf7E0025oflX8N'


def mail_logic(subject, content, to):
    """
        This actually sends an email.
    """
    
    try:

        # create the email object
        email = EmailMessage(

            subject,
            content,
            settings.EMAIL_HOST_USER,
            to,

            )
        email.fail_silently = False

        # send the email
        email.send()

        return 0

    except:

        return 1


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


def sendmail(request):
    """
        This function takes fullname, phone, email and content and sends.
    """

    # get data
    fullname = request.GET['fullname']
    phone = request.GET['phone']
    email = request.GET['email']
    content = str(email) + "\n" + str(request.GET['content'])

    subject = f"{fullname} - {phone}"

    # send mail
    result = mail_logic(subject = subject, content = content, to = ["noamg.j2@gmail.com"])

    # check if good
    if result == 0:

        return HttpResponse(json.dumps("Success"))
    
    else:

        return HttpResponse(json.dumps("Failed"))


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
    data = ast.literal_eval(request.POST['data'])

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

        # define a product name in the stripe store
        product_name = f"{product_id}:{obj}"

        # create product in stripe
        create_stripe_product(product_name, name, price)

        # create the product
        db.add_product(obj, name, price, description, tags, images)

        # get new id
        product_id, name, price, description, tags, images = db.object_by_name(obj, name)

        return HttpResponse(json.dumps(f"Successfully created {product_name}."), content_type="application/json")

    except:

        return HttpResponse(json.dumps({

            'message': "Error."

        }), content_type="application/json")


def get_story(request):
    """
        This function returns the story.
    """

    # open story file for reading
    with open(STORY_FILE, "r") as story_file:

        story = story_file.read()

    # return the story
    return HttpResponse(json.dumps(story), content_type = "application/json")


def set_story(request):
    """
        This function sets the story to the new one.
    """

    try:

        # get the data
        story = request.POST['story']

    except:

        return HttpResponse(json.dumps("Error: argument 'story' is required."))

    try:

        # open story file for writing
        with open(STORY_FILE, "w") as story_file:

            # override the story file
            story_file.write(story)

        return HttpResponse(json.dumps("Success"))

    except:

        return HttpResponse(json.dumps("Error: can not reach story file."))


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