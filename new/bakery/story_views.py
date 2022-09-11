# django imports
from django.http import HttpResponse

# other imports
import json

# constants
STORY_FILE = "./bakery/ourStory"


def get_story(request):
    """
        This function returns the story.
    """

    # open story file for reading
    with open(STORY_FILE, "r") as story_file:

        story = story_file.read()
    
    content = story.split("###")[0]
    images = story.split("###")[1]

    data = {

        "story": content,
        "images": images

    }

    # return the story
    return HttpResponse(json.dumps(data), content_type = "application/json")


def set_story(request):
    """
        This function sets the story to the new one.
    """

    try:

        # get the data
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        story = body['story']
        images = body['images']

    except:

        return HttpResponse(json.dumps("Error: argument 'story' is required."))

    try:

        # open story file for writing
        with open(STORY_FILE, "w") as story_file:

            # override the story file
            story_file.write(story + "\n###" + str(images))

        return HttpResponse(json.dumps("Success"))

    except:

        return HttpResponse(json.dumps("Error: can not reach story file."))