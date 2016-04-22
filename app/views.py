from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from django.core import serializers
from django.utils import timezone
from django.views.decorators.http import require_http_methods

from datetime import datetime, date
import json

import itc_005.settings
from app.models import Contact, ContactCategory, Country, Event, Language, Resource, ResourceCategory


class SessionData():
    session = None

    # def __init__(self, session):

    def refresh(self, session):
        self.session = session


def index(request):
    return render(request, 'app/main.html')

