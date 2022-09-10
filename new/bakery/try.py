import stripe
import urllib
stripe.api_key = 'sk_test_51FEENmLXM9Y1aZOIN1YMw9RndUORhwcd5ZBvXZWGja1KAyU7fHLWqUHlJruxMFA4djrdDNEKvqU4NSc3mchndf7E0025oflX8N'

obj = "cakes"
id = "2"
product_name = f"{id}:{obj}"

products = stripe.Product.list()

for product in products:

    if product['description'] == product_name:

        final_product = product

stripe.Product.modify(final_product['id'], default_price = "", active = False)