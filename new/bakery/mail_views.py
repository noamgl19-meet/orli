# django imports
from django.http import HttpResponse
from django.core.mail import send_mail, EmailMessage
from django.conf import settings

# other imports
import json


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


def sendmail(request):
    """
        This function takes fullname, phone, email and content and sends.
    """

    # get data
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    fullname = body['fullname']
    phone = body['phone']
    email = body['email']
    content = str(email) + "\n" + str(body['content'])

    subject = f"{fullname} - {phone}"

    # send mail
    result = mail_logic(subject = subject, content = content, to = ["noamg.j2@gmail.com"])

    # check if good
    if result == 0:

        return HttpResponse(json.dumps("Success"))
    
    else:

        return HttpResponse(json.dumps("Failed"))
