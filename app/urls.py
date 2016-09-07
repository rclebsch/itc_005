from django.conf.urls import url

from app import views

urlpatterns = [
    url(r'^$', views.index, name='index'),

    url(r'^contacts/$', views.contacts, name='contacts'),
    url(r'^contact_categories/$', views.contact_categories, name='contact_categories'),
    url(r'^contact_activities/$', views.contact_activities, name='contact_activities'),
    url(r'^contact_afiliations/$', views.contact_afiliations, name='contact_afiliations'),

    url(r'^events/$', views.events, name='events'),

    url(r'^resources/$', views.resources, name='resources'),
    url(r'^resource_categories/$', views.resource_categories, name='resource_categories'),

    url(r'^countries/$', views.countries, name='countries'),
    url(r'^borders/$', views.borders, name='borders'),
    url(r'^languages/$', views.languages, name='languages'),

    url(r'^register/$', views.register, name='register'),
    # -Captcha http://django-simple-captcha.readthedocs.org/en/latest/usage.html
    url(r'^export/$', views.export, name='export'),

    # Sphinx Search API
    url(r'^search/$', views.search, name='search'),

]
