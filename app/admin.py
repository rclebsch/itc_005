from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from django.core.cache import cache

from app.models import Contact, ContactCategory, Country, Event, Language, Resource, ResourceCategory, Border, \
    ContactActivity, ContactAfiliation


def clear_cache(modeladmin, request, queryset):
    cache.clear()


def reindex_resources(modeladmin, request, queryset):
    objects = Resource.objects.order_by('resourceId')
    for item in objects:
        item.save()


def reindex_events(modeladmin, request, queryset):
    objects = Event.objects.order_by('eventId')
    for item in objects:
        item.save()

def reindex_contacts(modeladmin, request, queryset):
    objects = Contact.objects.order_by('contactId')
    for item in objects:
        item.save()


class BorderAdmin(admin.ModelAdmin):
    search_fields = ('borderName',)
    actions = [clear_cache]

admin.site.register(Border, BorderAdmin)


class ContactActivityAdmin(admin.ModelAdmin):
    search_fields = ('contactActivityName', )
    actions = [clear_cache]

admin.site.register(ContactActivity, ContactActivityAdmin)


class ContactAfiliationAdmin(admin.ModelAdmin):
    search_fields = ('contactAfiliationName',)
    actions = [clear_cache]

admin.site.register(ContactAfiliation, ContactAfiliationAdmin)


class ContactCategoryAdmin(admin.ModelAdmin):
    list_display = ('contactCategoryName', 'isIndividual')
    actions = [clear_cache]

admin.site.register(ContactCategory, ContactCategoryAdmin)


class ContactResource(resources.ModelResource):
    actions = [clear_cache]

    class Meta:
        model = Contact
        fields = ('contactId', 'contactCategory__contactCategoryName',
                  'organizationName', 'lastName', 'firstName',
                  'activityFromList__contactActivityName', 'contactAfiliationFromList__contactAfiliationName',
                  'borderLocationFromList__borderName', 'contactCountry__countryName', 'contactCountry__phonePrefix',
                  'phoneLocalNumber', 'email', 'contactStatus__contactStatusDesc')
        export_order = ('contactId', 'contactCategory__contactCategoryName',
                        'organizationName', 'lastName', 'firstName',
                        'activityFromList__contactActivityName', 'contactAfiliationFromList__contactAfiliationName',
                        'borderLocationFromList__borderName', 'contactCountry__countryName', 'contactCountry__phonePrefix',
                        'phoneLocalNumber', 'email', 'contactStatus__contactStatusDesc')


class ContactAdmin(ImportExportModelAdmin):
    readonly_fields = ('created', 'lastUpdate')
    list_display = ('__str__', 'contactCategory', 'contactCountry', 'borderLocationFromList', 'contactStatus',
                    'created', 'lastUpdate')
    search_fields = ['organizationName', 'lastName', 'firstName', 'contactCategory__contactCategoryName',
                     'contactCountry__countryName', 'borderLocationFromList__borderName']
    list_filter = ('contactCategory', 'contactStatus')
    resource_class = ContactResource
    actions = [clear_cache, reindex_contacts]

admin.site.register(Contact, ContactAdmin)


class CountryAdmin(admin.ModelAdmin):
    list_display = ('countryCode', 'countryName', 'phonePrefix', 'visible', 'orderPriority')
    search_fields = ('countryCode', 'countryName', 'phonePrefix')
    actions = [clear_cache]

admin.site.register(Country, CountryAdmin)


class EventAdmin(ImportExportModelAdmin):
    readonly_fields = ('created', 'lastUpdate')
    list_display = ('eventTitle', 'eventCountry', 'eventDateStart', 'eventLocation', 'created', 'lastUpdate')
    search_fields = ('eventTitle', 'eventLocation')
    actions = [clear_cache, reindex_events]

admin.site.register(Event, EventAdmin)


class ResourceCategoryAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'lastUpdate')
    list_display = ('resourceCategoryName', 'created', 'lastUpdate')
    actions = [clear_cache]

admin.site.register(ResourceCategory, ResourceCategoryAdmin)


class ResourceAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'lastUpdate')
    list_display = ('title', 'resourceCategory', 'language', 'created', 'lastUpdate')
    search_fields = ('title', 'resourceCategory__resourceCategoryName')
    actions = [clear_cache, reindex_resources]

admin.site.register(Resource, ResourceAdmin)

admin.site.register(Language)

