# constants
IMAGE_BASE = './bakery/images'
# IMAGE_BASE = './images'

def from_binary(filename, binary):
    """
        This function takes a filename and its binary contents and saves it.
    """

    # open the file for reading
    with open(f"{IMAGE_BASE}/{filename}", "wb") as image_file:

        image_file.write(binary)

    return f"{IMAGE_BASE}/{filename}"


# with open(f"{IMAGE_BASE}/try.jpg", "rb") as image_file:

#     content = image_file.read()
#     print(type(content))
#     from_binary("try1.jpg", content)