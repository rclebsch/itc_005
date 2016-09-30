from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.core.exceptions import ValidationError
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.mail import send_mail
from django.conf import settings
import os.path
import PyPDF2
import docx2txt


class Country(models.Model):
    countryId = models.AutoField(unique=True, primary_key=True, verbose_name='Country ID')
    countryName = models.CharField(max_length=255, unique=True, verbose_name='Country Name')
    countryCode = models.CharField(max_length=2, unique=True, verbose_name='Country Code')
    orderPriority = models.IntegerField(default=0, verbose_name='Priority')
    phonePrefix = models.CharField(max_length=4, null=True, unique=True, verbose_name='Phone Prefix')
    visible = models.BooleanField(default=True, verbose_name='Visible')

    def __str__(self):
        return self.countryName

    class Meta:
        verbose_name = 'Country'
        verbose_name_plural = 'Countries'
        ordering = ['orderPriority', 'countryName', ]


class Border(models.Model):
    borderId = models.AutoField(unique=True, primary_key=True, verbose_name='Border ID')
    borderName = models.CharField(max_length=255, unique=True, verbose_name='Border Name')

    def __str__(self):
        return self.borderName

    class Meta:
        verbose_name = 'Border'
        verbose_name_plural = 'Borders'
        ordering = ['borderName', ]


class Language(models.Model):
    languageId = models.AutoField(unique=True, primary_key=True, verbose_name='Language ID')
    languageName = models.CharField(max_length=255, unique=True, verbose_name='Language Name')

    def __str__(self):
        return self.languageName

    class Meta:
        ordering = ['languageName', ]


class Event(models.Model):
    eventId = models.AutoField(unique=True, primary_key=True, verbose_name='Event ID')
    eventTitle = models.CharField(max_length=255, verbose_name='Event Title')
    eventDateStart = models.DateTimeField(verbose_name='Event Start Date and Time')
    eventDateEnd = models.DateTimeField(verbose_name='Event End Date and Time')
    eventCountry = models.ForeignKey(Country, null=True, db_index=True, related_name='event_country',
                                     verbose_name='Country')
    eventLocation = models.CharField(max_length=255, verbose_name='Event Location')
    eventCoverage = models.TextField(blank=True, verbose_name='Event Geographical Objectives')
    mainDocument = models.FileField(blank=True, null=True, upload_to='events', verbose_name='Main Document')
    additionalDocument = models.FileField(blank=True, null=True, upload_to='events', verbose_name='Additional Document')
    contactInfo = models.CharField(max_length=255, verbose_name='Contact Information')
    objectives = models.TextField(blank=True, verbose_name='Event Objectives')
    communication = models.TextField(blank=True, null=True, verbose_name='Communication text')
    beneficiaries = models.CharField(max_length=255, verbose_name='Number of beneficiaries')
    otherInformation = models.TextField(blank=True, verbose_name='Other Information (private)')
    report = models.TextField(blank=True, verbose_name='Report (private)')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Creation date and time')
    lastUpdate = models.DateTimeField(auto_now=True, verbose_name='Last update date and time')
    indexText = models.TextField(blank=True, verbose_name='Parsed text for indexing')

    def save(self, *args, **kwargs):
        super(Event, self).save(*args, **kwargs)
        self.indexText = ' '.join([self.eventTitle,
                                   self.eventCountry.countryName,
                                   self.eventLocation,
                                   self.eventCoverage,
                                   self.contactInfo,
                                   self.objectives,
                                   self.beneficiaries,
                                   '' if not self.mainDocument.name else build_index_text(self.mainDocument.path),
                                   '' if not self.additionalDocument.name else build_index_text(self.additionalDocument.path)])
        super(Event, self).save(*args, **kwargs)

    def __str__(self):
        return self.eventTitle


class ResourceCategory(models.Model):
    resourceCategoryId = models.AutoField(unique=True, primary_key=True, verbose_name='Resource Category ID')
    resourceCategoryName = models.CharField(max_length=255, unique=True, verbose_name='Resource Category Name')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Creation date and time')
    lastUpdate = models.DateTimeField(auto_now=True, verbose_name='Last update date and time')

    def __str__(self):
        return self.resourceCategoryName

    class Meta:
        verbose_name = 'Resource Category'
        verbose_name_plural = 'Resource Categories'
        ordering = ['resourceCategoryName']


class Resource(models.Model):
    resourceId = models.AutoField(unique=True, primary_key=True, verbose_name='Resource ID')
    resourceCategory = models.ForeignKey(ResourceCategory, null=True, db_index=True, related_name='resourceCategory',
                                         verbose_name='Resource Category')
    title = models.CharField(max_length=255, unique=True, verbose_name='Resource Title')
    pdfFile = models.FileField(blank=True, upload_to='resources', verbose_name='PDF')
    language = models.ForeignKey(Language, null=True, db_index=True, related_name='language', verbose_name='Language')
    firstPagePicture = models.ImageField(blank=True, upload_to='resources', verbose_name='First Page Picture')
    description = models.TextField(blank=True, verbose_name='Description')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Creation date and time')
    lastUpdate = models.DateTimeField(auto_now=True, verbose_name='Last update date and time')
    indexText = models.TextField(blank=True, verbose_name='Parsed text for indexing')

    def save(self, *args, **kwargs):
        super(Resource, self).save(*args, **kwargs)
        self.indexText = ' '.join([self.language.languageName,
                                   self.resourceCategory.resourceCategoryName,
                                   self.title,
                                  self.description,
                                  '' if not self.pdfFile.name else build_index_text(self.pdfFile.path)])
        super(Resource, self).save(*args, **kwargs)

    def __str__(self):
        return self.title


class ContactCategory(models.Model):
    contactCategoryId = models.AutoField(unique=True, primary_key=True, verbose_name='Contact Category ID')
    contactCategoryName = models.CharField(max_length=255, unique=True, verbose_name='Contact Category Name')
    isIndividual = models.BooleanField(verbose_name='Is an Individual')

    def __str__(self):
        return self.contactCategoryName

    class Meta:
        verbose_name = 'Contact Category'
        verbose_name_plural = 'Contact Categories'
        ordering = ['contactCategoryName']


class ContactStatus(models.Model):
    contactStatusId = models.AutoField(unique=True, primary_key=True, verbose_name='Contact Status ID')
    contactStatusDesc = models.CharField(max_length=255, unique=True, verbose_name='Contact Status Description')

    def __str__(self):
        return self.contactStatusDesc


class ContactActivity(models.Model):
    contactActivityId = models.AutoField(unique=True, primary_key=True, verbose_name='Contact Activity ID')
    contactActivityName = models.CharField(max_length=255, unique=True, verbose_name='Contact Activity Name')

    def __str__(self):
        return self.contactActivityName

    class Meta:
        verbose_name = 'Contact Activity'
        verbose_name_plural = 'Contact Activities'
        ordering = ['contactActivityName']


class ContactAfiliation(models.Model):
    contactAfiliationId = models.AutoField(unique=True, primary_key=True, verbose_name='Contact Afiliation ID')
    contactAfiliationName = models.CharField(max_length=255, unique=True, verbose_name='Contact Afiliation Name')

    def __str__(self):
        return self.contactAfiliationName

    class Meta:
        verbose_name = 'Contact Afiliation'
        verbose_name_plural = 'Contact Afiliations'
        ordering = ['contactAfiliationName']


class Contact(models.Model):
    NEW = 1
    APPROVED = 2
    REJECTED = 3
    DISABLED = 4

    Status = (
        (NEW, 'New'),
        (APPROVED, 'Approved'),
        (REJECTED, 'Rejected'),
        (DISABLED, 'Disabled')
    )
    errorDesc = ''

    contactId = models.AutoField(unique=True, primary_key=True, verbose_name='Contact ID')
    contactCategory = models.ForeignKey(ContactCategory, blank=False, db_index=True,
                                        related_name='contact_category',
                                        verbose_name='Category')
    firstName = models.CharField(max_length=255, blank=True, null=True, verbose_name='First Name')
    lastName = models.CharField(max_length=255, blank=True, null=True, verbose_name='Last Name')
    organizationName = models.CharField(max_length=255, blank=True, null=True, verbose_name='Organization Name')
    activityFree = models.CharField(max_length=255, blank=True, null=True, verbose_name='Activity')
    activityFromList = models.ForeignKey(ContactActivity, blank=True, null=True, db_index=True,
                                         related_name='contact_activity_from_list',
                                         verbose_name='Activity from List')
    borderLocationFree = models.CharField(max_length=255, blank=True, null=True, verbose_name='Border Location')
    borderLocationFromList = models.ForeignKey(Border, blank=True, null=True, db_index=True,
                                               related_name='border_from_list',
                                               verbose_name='Border from List')
    contactCountry = models.ForeignKey(Country, db_index=True,
                                       related_name='contact_country',
                                       verbose_name='Country')
    contactAfiliationFree = models.CharField(max_length=255, blank=True, null=True, verbose_name='Afiliation')
    contactAfiliationFromList = models.ForeignKey(ContactAfiliation, blank=True, null=True, db_index=True,
                                                  related_name='afiliation_from_list',
                                                  verbose_name='Afiliation from List')
    phoneLocalNumber = models.CharField(max_length=255, blank=True, null=True, verbose_name='Phone Local Number')
    email = models.EmailField(max_length=255, blank=True, null=True, verbose_name='E-Mail')
    contactStatus = models.ForeignKey(ContactStatus, db_index=True,
                                      related_name='contactStatus',
                                      verbose_name='Contact Status')
    rejectReason = models.TextField(blank=True, null=True, verbose_name='Rejection Reason')
    address = models.TextField(blank=True, null=True, verbose_name='Address')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Creation date and time')
    lastUpdate = models.DateTimeField(auto_now=True, verbose_name='Last update date and time')
    indexText = models.TextField(blank=True, verbose_name='Parsed text for indexing')

    def __str__(self):
        if self.contactCategory.isIndividual or self.organizationName == '':
            return self.lastName + ', ' + self.firstName
        else:
            return self.organizationName

    def clean(self):
        if self.contactCategory is None:
            raise ValidationError('No category specified')
        if self.contactCategory.isIndividual and (self.activityFromList is None) \
                and (not self.activityFree or (self.contactStatus.contactStatusId == self.APPROVED)):
            raise ValidationError('No activity specified')
        if (not self.borderLocationFree or (self.contactStatus.contactStatusId == self.APPROVED)) \
                and (self.borderLocationFromList is None):
            raise ValidationError('No border specified')
        if self.contactCountry is None:
            raise ValidationError('No country specified')
        if (not self.contactCategory.isIndividual) and (not self.organizationName):
            raise ValidationError('No Organization name specified')
        elif self.contactCategory.isIndividual and (not (self.firstName + self.lastName)):
            raise ValidationError('No names specified')
        if self.contactCategory.isIndividual and (self.contactAfiliationFromList is None) \
                and (not self.contactAfiliationFree or (self.contactStatus.contactStatusId == self.APPROVED)):
            raise ValidationError('No afiliation specified')

    def build_index_text(self):
        text_parts = [self.contactCategory.contactCategoryName,
                      self.borderLocationFromList.borderName if self.borderLocationFromList is not None else '',
                      self.contactCountry.countryName,
                      self.phoneLocalNumber]
        if self.contactCategory.isIndividual:
            text_parts.extend([self.firstName,
                               self.lastName,
                               self.activityFromList.contactActivityName if self.activityFromList is not None else '',
                               self.contactAfiliationFromList.contactAfiliationName if self.contactAfiliationFromList is not None else '', ])
        else:
            text_parts.extend([self.organizationName, ])
        text = ' '.join(text_parts)
        return text

    def save(self, *args, **kwargs):
        self.originalContactStatus = self.contactStatus
        self.indexText = self.build_index_text()
        if self.pk is not None:
            self.originalContactStatusId = Contact.objects.get(pk=self.pk).contactStatus.contactStatusId
        super(Contact, self).save(*args, **kwargs)

    class Meta:
        verbose_name = 'Contact'
        verbose_name_plural = 'Contacts'
        ordering = ['contactCategory', 'organizationName', 'lastName', 'firstName']


class Search(models.Model):
    SEARCH_RESULT_CONTACT = 1
    SEARCH_RESULT_EVENT = 2
    SEARCH_RESULT_RESOURCE = 3
    SEARCH_LIMIT = 1000
    SEARCH_QUERY = 'SELECT * FROM eac WHERE MATCH(%s) limit 0, %s option max_matches=%s'

    id = models.IntegerField(unique=True, primary_key=True)
    type = models.IntegerField()

    @staticmethod
    def build_search(query_string):
        return Search.objects.using('sphinx').raw(Search.SEARCH_QUERY,
                                                  [query_string, int(Search.SEARCH_LIMIT), int(Search.SEARCH_LIMIT)])

    class Meta:
        managed = False


class SearchLog(models.Model):
    id = models.AutoField(unique=True, primary_key=True)
    searchTs = models.DateTimeField(auto_now_add=True, verbose_name='Search timestamp')
    total = models.IntegerField(blank=False, null=False, verbose_name='Search query')
    query = models.CharField(max_length=512, blank=False, null=False, verbose_name='Search query')

    def __str__(self):
        return self.query


# After the save of a Contact
@receiver(post_save, sender=Contact)
def send_registration_email(instance, created, **kwargs):
    if instance.email:
        if created:
            if instance.contactStatus.contactStatusId == Contact.NEW:
                send_registration_received_email(instance)
            elif instance.contactStatus.contactStatusId == Contact.APPROVED:
                send_registration_approved_email(instance)
        elif (instance.originalContactStatusId != instance.contactStatus.contactStatusId) \
                and (instance.contactStatus.contactStatusId == Contact.APPROVED):
            send_registration_approved_email(instance)


def send_registration_received_email(contact):
    body = contact.__str__() + \
           '\n\nYour registration has been received.' + \
           '\nYou will receive a new email once your registration is approved.' + \
           '\n\n Kind regards,' + \
           '\nThe EAC team'

    send_email(
        'Your registration has been approved',
        body,
        [contact.email]
    )


def send_registration_approved_email(contact):
    body = contact.__str__() + \
           '\n\n Your registration has been approved and you are now part of the EAC e-directory.' + \
           '\n\n Kind regards,' + \
           '\nThe EAC team'

    send_email(
        'Your registration has been approved',
        body,
        [contact.email]
    )


def send_email(subject, body, recipient_list):
    if settings.DEBUG:
        send_mail(subject, body, 'no-reply@eac.itc.org', settings.DEBUG_EMAIL_DESTINATIONS, fail_silently=False)
    else:
        send_mail(subject, body, 'no-reply@eac.itc.org', recipient_list, fail_silently=False)


def build_index_text_pdf(file_name):
    pdf_file_obj = open(file_name,'rb')
    pdf_reader = PyPDF2.PdfFileReader(pdf_file_obj)
    text_items = []
    for i in range(pdf_reader.numPages):
        text_items.append(pdf_reader.getPage(i).extractText())
    return (' '.join(text_items)).replace('\n\n', ' ').replace('\n', '')


def build_index_text_docx(file_name):
    return docx2txt.process(file_name).replace('\n\n', ' ')


def build_index_text_html(file_name):
    # TODO html parser
    return ''


def build_index_text(file_name):
    extension = os.path.splitext(file_name)[1]
    if extension == '.pdf':
        return build_index_text_pdf(file_name)
    elif extension == '.docx':
        return build_index_text_docx(file_name)
    elif extension == '.html':
        return build_index_text_html(file_name)
    else:
        raise Exception('No parser for the extension: ' + extension)
