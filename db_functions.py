# AUTHOR: Noam Globerman
# File: server.py
# Description: Flask API server for the bakery application
# Date: 02.09.2022

# imports
import mysql.connector

# constants
DB_HOST = "127.0.0.1"
DB = "bakery"
DB_USERNAME = "root"
DB_PASSWORD = "xzaq1234"
DB_AUTH_PLUGIN = "mysql_native_password"


def connection():
    """
        Creates a connection to the database and returns it.
    """

    # connect
    conn = mysql.connector.connect(user = DB_USERNAME, password = DB_PASSWORD, host = DB_HOST, database = DB, auth_plugin = DB_AUTH_PLUGIN)
    cur = conn.cursor()

    return conn, cur


def close_connection(conn, cur):
    """
        Takes a connection and cursor and closes it.
    """

    conn.close()


def object_by_tag(obj, tag):
    """
        This function returns a list of all the cakes with a certain tag from DB.
    """

    # create a connection
    conn, cur = connection()

    # query
    query = f'select * from {obj} where tags like "%{tag}%"'

    # execute the query
    cur.execute(query)

    # keep the answer
    result = cur.fetchall()

    # close the connection
    close_connection(conn, cur)

    return result


def object_by_id(obj, id):
    """
        This function returns a list of objects with this id from DB.
    """

    # create a connection
    conn, cur = connection()

    # query
    query = f'select * from {obj} where id =  "{id}"'

    # execute the query
    cur.execute(query)

    # keep the answer
    result = cur.fetchone()

    # close the connection
    close_connection(conn, cur)

    return result


def object_by_name(obj, name):
    """
        This function returns a list of objects with this name from DB.
    """

    # create a connection
    conn, cur = connection()

    # query
    query = f'select * from {obj} where name =  "{name}"'

    # execute the query
    cur.execute(query)

    # keep the answer
    result = cur.fetchone()

    # close the connection
    close_connection(conn, cur)

    return result


def delete_product(obj, product_id):
    """
        This function takes an object type and id and deletes it.
    """

    # create a connection
    conn, cur = connection()

    # query
    query = f'delete from {obj} where id = "{product_id}"'

    # execute the query
    cur.execute(query)
    conn.commit()

    # close the connection
    close_connection(conn, cur)


def update_product(obj, product_id, field, value):
    """
        This function takes a field and value of a product and makes the change.
    """

    # create a connection
    conn, cur = connection()

    # query
    query = f'update {obj}  set {field} = "{value}" where id = "{product_id}"'

    # execute the query
    cur.execute(query)
    conn.commit()

    # close the connection
    close_connection(conn, cur)


def add_product(obj, name, price, description, tags, images):
    """
        This function creates a product object in the DB.
    """

    # create a connection
    conn, cur = connection()

    # query
    query = f'insert into {obj} (name, price, description, tags, images) values ("{name}", "{price}", "{description}", "{tags}", "{images}")'

    # execute the query
    cur.execute(query)
    conn.commit()

    # close the connection
    close_connection(conn, cur)