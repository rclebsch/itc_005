from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError
import requests
from django.views.decorators.cache import cache_page
from django.conf import settings

import json
import re
import csv

from app.models import Contact, ContactCategory, ContactActivity, ContactAfiliation, ContactStatus,\
    Country, Border, Language, Resource, ResourceCategory, Event


class SessionData:
    session = None

    # def __init__(self, session):

    def refresh(self, session):
        self.session = session


def simplify_data(data, fields):
    results = []
    for item in data:
        element = {'id': item.pk}
        for field in fields:
            if field.startswith('url__'):
                if getattr(item, field[5:]):
                    element[field[5:]] = getattr(item, field[5:]).url
                else:
                    element[field[5:]] = ''
            elif field.startswith('fk__'):
                m = re.search('fk__([a-zA-Z0-9]*)(__([a-zA-Z0-9]*))?', field)
                field_name = m.group(1)
                fk_field_name = m.group(3)
                if fk_field_name:
                    element[fk_field_name] = getattr(getattr(item, field_name), fk_field_name)
                else:
                    element[field_name] = getattr(item, field_name).__str__()
            elif field.startswith('ts__'):
                element[field[4:]] = getattr(item, field[4:]).isoformat()
            else:
                element[field] = getattr(item, field)
        results.append(element)
    return results


@cache_page(settings.CACHE_LONG_TERM)
@require_http_methods(["GET"])
def index(request):
    return render(request, 'app/main.html', context={'settings': settings})


@cache_page(settings.CACHE_LONG_TERM)
@require_http_methods(["GET"])
def contacts(request):
    try:
        category_id = int(request.GET.get('category_id', 0))
        activity_id = int(request.GET.get('activity_id', 0))
        country_id = int(request.GET.get('country_id', 0))
        border_id = int(request.GET.get('border_id', 0))
        afiliation_id = int(request.GET.get('afiliation_id', 0))
        is_individual = (1 == int(request.GET.get('is_individual', 0)))
    except ValueError:
        category_id = 0
        activity_id = 0
        country_id = 0
        border_id = 0
        afiliation_id = 0
        is_individual = False
    query = Contact.objects
    if category_id > 0:
        query = query.filter(contactCategory=category_id)
        try:
            is_individual = ContactCategory.objects.filter(contactCategoryId=category_id)[0].isIndividual
        except IndexError:
            is_individual = False
    if activity_id > 0:
        query = query.filter(activityFromList=activity_id)
    if country_id > 0:
        query = query.filter(contactCountry=country_id)
    if border_id > 0:
        query = query.filter(borderLocationFromList=border_id)
    if afiliation_id > 0:
        query = query.filter(contactAfiliationFromList=afiliation_id)
    if is_individual:
        object_list = simplify_data(
            query.filter(contactStatus=2, contactCategory__isIndividual=True).order_by(
                'lastName', 'firstName'),
            ['fk__contactCategory', 'firstName', 'lastName',
             'fk__activityFromList', 'fk__borderLocationFromList', 'fk__contactAfiliationFromList',
             'fk__contactCountry', 'fk__contactCountry__phonePrefix', 'phoneLocalNumber', 'email'])
    else:
        object_list = simplify_data(
            query.filter(contactStatus=2, contactCategory__isIndividual=False).order_by(
                'lastName', 'firstName'),
            ['fk__contactCategory', 'organizationName',
             'fk__borderLocationFromList',
             'fk__contactCountry', 'fk__contactCountry__phonePrefix', 'phoneLocalNumber', 'email'])
    return HttpResponse(status=200,
                        content=json.dumps(object_list),
                        content_type='application/json')


@cache_page(settings.CACHE_SHORT_TERM)
@require_http_methods(["GET"])
def contact_categories(request):
    is_individual = int(request.GET.get('is_individual', None))
    query = ContactCategory.objects
    if is_individual is not None:
        query = query.filter(isIndividual=is_individual)

    object_list = simplify_data(query.order_by('contactCategoryName'),
                                ['contactCategoryName', 'isIndividual'])
    return HttpResponse(status=200,
                        content=json.dumps(object_list),
                        content_type='application/json')


@cache_page(settings.CACHE_SHORT_TERM)
@require_http_methods(["GET"])
def contact_activities(request):
    object_list = simplify_data(ContactActivity.objects.all().order_by('contactActivityName'),
                                ['contactActivityName'])
    return HttpResponse(status=200,
                        content=json.dumps(object_list),
                        content_type='application/json')


@cache_page(settings.CACHE_SHORT_TERM)
@require_http_methods(["GET"])
def contact_afiliations(request):
    object_list = simplify_data(ContactAfiliation.objects.all().order_by('contactAfiliationName'),
                                ['contactAfiliationName'])
    return HttpResponse(status=200,
                        content=json.dumps(object_list),
                        content_type='application/json')


@cache_page(settings.CACHE_LONG_TERM)
@require_http_methods(["GET"])
def events(request):
    try:
        count = int(request.GET.get('count', 1000000))
    except ValueError:
        count = 1000000
    object_list = simplify_data(Event.objects.all().order_by('-eventDateStart', 'eventTitle')[0:count],
                                ['eventTitle', 'ts__eventDateStart', 'ts__eventDateEnd',
                                 'fk__eventCountry', 'eventLocation', 'eventCoverage', 'beneficiaries',
                                 'url__mainDocument', 'url__additionalDocument',
                                 'contactInfo', 'objectives'])
    return HttpResponse(status=200,
                        content=json.dumps(object_list),
                        content_type='application/json')


@cache_page(settings.CACHE_LONG_TERM)
@require_http_methods(["GET"])
def resources(request):
    try:
        language_id = int(request.GET.get('language_id', 0))
        category_id = int(request.GET.get('category_id', 0))
    except ValueError:
        language_id = 0
        category_id = 0
    query = Resource.objects
    if language_id > 0:
        query = query.filter(language=language_id)
    if category_id > 0:
        query = query.filter(resourceCategory=category_id)
    object_list = simplify_data(query.order_by('resourceCategory', 'language', 'title'),
                                ['fk__resourceCategory', 'fk__language', 'title', 'url__pdfFile',
                                 'url__firstPagePicture', 'description'])
    return HttpResponse(status=200,
                        content=json.dumps(object_list),
                        content_type='application/json')


@cache_page(settings.CACHE_SHORT_TERM)
@require_http_methods(["GET"])
def resource_categories(request):
    object_list = simplify_data(ResourceCategory.objects.all().order_by('resourceCategoryName'),
                                ['resourceCategoryName'])
    return HttpResponse(status=200,
                        content=json.dumps(object_list),
                        content_type='application/json')


@cache_page(settings.CACHE_SHORT_TERM)
@require_http_methods(["GET"])
def countries(request):
    object_list = simplify_data(Country.objects.filter(visible=True).order_by('orderPriority', 'countryName'),
                                ['countryName', 'countryCode', 'phonePrefix'])
    return HttpResponse(status=200,
                        content=json.dumps(object_list),
                        content_type='application/json')


@cache_page(settings.CACHE_SHORT_TERM)
@require_http_methods(["GET"])
def borders(request):
    object_list = simplify_data(Border.objects.all().order_by('borderName'),
                                ['borderName'])
    return HttpResponse(status=200,
                        content=json.dumps(object_list),
                        content_type='application/json')


@cache_page(settings.CACHE_SHORT_TERM)
@require_http_methods(["GET"])
def languages(request):
    object_list = simplify_data(Language.objects.all().order_by('languageName'),
                                ['languageName'])
    return HttpResponse(status=200,
                        content=json.dumps(object_list),
                        content_type='application/json')


@require_http_methods(["GET"])
def export(request):
    object_list = simplify_data(Contact.objects.filter(
        contactCategory__isIndividual=True, contactStatus=Contact.APPROVED).order_by('lastName', 'firstName'),
            ['fk__contactCategory', 'firstName', 'lastName',
             'fk__activityFromList', 'fk__borderLocationFromList', 'fk__contactAfiliationFromList',
             'fk__contactCountry', 'fk__contactCountry__phonePrefix', 'phoneLocalNumber', 'email'])
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="contacts.csv"'

    writer = csv.writer(response)
    line = []
    for fieldName in object_list[0]:
        line.append(fieldName)
    writer.writerow(line)
    for row in object_list:
        line = []
        for field in row:
            line.append(row[field])
        writer.writerow(line)
    return response


def validate_captcha(token):
    url = "https://www.google.com/recaptcha/api/siteverify"
    params = {
        'secret': settings.RECAPTCHA_SECRET_KEY,
        'response': token,
    }
    verify_rs = requests.get(url, params=params, verify=False)
    verify_rs = verify_rs.json()
    return verify_rs.get("success", False)


@require_http_methods(["POST"])
def register(request):
    try:
        body = json.loads(request.body.decode('utf-8'))
    except ValueError as e:
        return HttpResponse(status=401,
                            content='{"Error": "Invalid JSON string: ' + e.__str__() + '"}',
                            content_type='application/json')

    try:
        # Check captcha
        token = body['captchaToken']
        if not validate_captcha(token):
            raise ValidationError('Invalid Captcha')
        # Build Contact
        contact = Contact()
        contact.contactCategory = ContactCategory.objects.get(contactCategoryId=body['contact']['contactCategory'])

        if contact.contactCategory.isIndividual:
            contact.firstName = body['contact']['firstName']
            contact.lastName = body['contact']['lastName']
            contact.activityFree = body['contact']['activityFree']
            if (not body['contact']['activityFromList'] is None) and (int(body['contact']['activityFromList']) > 0):
                contact.activityFromList = ContactActivity.objects.get(
                    contactActivityId=body['contact']['activityFromList'])
            contact.contactAfiliationFree = body['contact']['afiliationFree']
            if (not body['contact']['afiliationFromList'] is None) and (int(body['contact']['afiliationFromList'])) > 0:
                contact.contactAfiliationFromList = ContactAfiliation.objects.get(
                    contactAfiliationId=body['contact']['afiliationFromList'])
        else:
            contact.organizationName = body['contact']['organizationName']

        contact.borderLocationFree = body['contact']['borderLocationFree']
        if (not body['contact']['borderLocationFromList'] is None) and \
                (int(body['contact']['borderLocationFromList']) > 0):
            contact.borderLocationFromList = Border.objects.get(borderId=body['contact']['borderLocationFromList'])
        contact.contactCountry = Country.objects.get(countryId=body['contact']['contactCountry'])
        contact.phoneLocalNumber = body['contact']['phoneLocalNumber']
        contact.email = body['contact']['email']
        contact.contactStatus = ContactStatus.objects.get(contactStatusId=Contact.NEW)

        try:
            contact.full_clean()
            contact.save()
        except ValidationError as e:
            return HttpResponse(status=400,
                                content='{"Error": "Invalid contact data: ' + e.__str__() + '"}',
                                        content_type='application/json')
    except Exception as e:
        return HttpResponse(status=400,
                            content='{"Error": "Contact not created (' + e.__str__() + ')"}',
                            content_type='application/json')

    return HttpResponse(status=200,
                        content=json.dumps(simplify_data([contact], [])),
                        content_type='application/json')
