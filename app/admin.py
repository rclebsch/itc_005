from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin

from app.models import Contact, ContactCategory, Country, Event, Language, Resource, ResourceCategory, Border, \
    ContactActivity, ContactAfiliation


class BorderAdmin(admin.ModelAdmin):
    search_fields = ('borderName',)

admin.site.register(Border, BorderAdmin)


class ContactActivityAdmin(admin.ModelAdmin):
    search_fields = ('contactActivityName', )

admin.site.register(ContactActivity, ContactActivityAdmin)


class ContactAfiliationAdmin(admin.ModelAdmin):
    search_fields = ('contactAfiliationName',)

admin.site.register(ContactAfiliation, ContactAfiliationAdmin)


class ContactCategoryAdmin(admin.ModelAdmin):
    list_display = ('contactCategoryName', 'isIndividual')

admin.site.register(ContactCategory, ContactCategoryAdmin)


class ContactResource(resources.ModelResource):
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
    search_fields = ('__str__', 'borderLocationFromList')
    list_filter = ('contactCategory', 'contactStatus')
    resource_class = ContactResource


admin.site.register(Contact, ContactAdmin)


class CountryAdmin(admin.ModelAdmin):
    list_display = ('countryCode', 'countryName', 'phonePrefix', 'visible', 'orderPriority')
    search_fields = ('countryCode', 'countryName', 'phonePrefix')

admin.site.register(Country, CountryAdmin)


class EventAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'lastUpdate')
    list_display = ('eventTitle', 'eventCountry', 'eventDate', 'eventLocation', 'created', 'lastUpdate')
    search_fields = ('eventTitle', 'eventLocation')

admin.site.register(Event, EventAdmin)


class ResourceCategoryAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'lastUpdate')
    list_display = ('resourceCategoryName', 'created', 'lastUpdate')

admin.site.register(ResourceCategory, ResourceCategoryAdmin)


class ResourceAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'lastUpdate')
    list_display = ('title', 'resourceCategory', 'language', 'created', 'lastUpdate')
    search_fields = ('title',)

admin.site.register(Resource, ResourceAdmin)

admin.site.register(Language)

