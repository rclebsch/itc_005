# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-23 06:08
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Border',
            fields=[
                ('borderId', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='Border ID')),
                ('borderName', models.CharField(max_length=255, unique=True, verbose_name='Border Name')),
            ],
            options={
                'verbose_name_plural': 'Borders',
                'verbose_name': 'Border',
                'ordering': ['borderName'],
            },
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('contactId', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='Contact ID')),
                ('firstName', models.CharField(max_length=255, null=True, verbose_name='First Name')),
                ('lastName', models.CharField(max_length=255, null=True, verbose_name='Last Name')),
                ('organizationName', models.CharField(max_length=255, null=True, verbose_name='Organization Name')),
                ('activityFree', models.CharField(max_length=255, null=True, verbose_name='Activity')),
                ('borderLocationFree', models.CharField(max_length=255, null=True, verbose_name='Border Location')),
                ('contactAfiliationFree', models.CharField(max_length=255, null=True, verbose_name='Afiliation')),
                ('phoneLocalNumber', models.CharField(max_length=255, null=True, verbose_name='Phone Local Number')),
                ('email', models.CharField(max_length=255, unique=True, verbose_name='E-Mail')),
                ('rejectReason', models.TextField(blank=True, verbose_name='Rejection Reason')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Creation date and time')),
                ('lastUpdate', models.DateTimeField(auto_now=True, verbose_name='Last update date and time')),
            ],
        ),
        migrations.CreateModel(
            name='ContactActivity',
            fields=[
                ('contactActivityId', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='Contact Activity ID')),
                ('contactActivityName', models.CharField(max_length=255, unique=True, verbose_name='Contact Activity Name')),
            ],
            options={
                'verbose_name_plural': 'Contact Activities',
                'verbose_name': 'Contact Activity',
                'ordering': ['contactActivityName'],
            },
        ),
        migrations.CreateModel(
            name='ContactAfiliation',
            fields=[
                ('contactAfiliationId', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='Contact Afiliation ID')),
                ('contactAfiliationName', models.CharField(max_length=255, unique=True, verbose_name='Contact Afiliation Name')),
            ],
            options={
                'verbose_name_plural': 'Contact Afiliations',
                'verbose_name': 'Contact Afiliation',
                'ordering': ['contactAfiliationName'],
            },
        ),
        migrations.CreateModel(
            name='ContactCategory',
            fields=[
                ('contactCategoryId', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='Contact Category ID')),
                ('contactCategoryName', models.CharField(max_length=255, unique=True, verbose_name='Contact Category Name')),
                ('isIndividual', models.BooleanField(verbose_name='Is an Individual')),
            ],
            options={
                'verbose_name_plural': 'Contact Categories',
                'verbose_name': 'Contact Category',
                'ordering': ['contactCategoryName'],
            },
        ),
        migrations.CreateModel(
            name='ContactStatus',
            fields=[
                ('contactStatusId', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='Contact Status ID')),
                ('contactStatusDesc', models.CharField(max_length=255, unique=True, verbose_name='Contact Status Description')),
            ],
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('countryId', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='Country ID')),
                ('countryName', models.CharField(max_length=255, unique=True, verbose_name='Country Name')),
                ('countryCode', models.CharField(max_length=2, unique=True, verbose_name='Country Code')),
                ('orderPriority', models.IntegerField(default=0, verbose_name='Priority')),
                ('phonePrefix', models.CharField(max_length=4, null=True, unique=True, verbose_name='Phone Prefix')),
                ('visible', models.BooleanField(default=True, verbose_name='Visible')),
            ],
            options={
                'verbose_name_plural': 'Countries',
                'verbose_name': 'Country',
                'ordering': ['orderPriority', 'countryName'],
            },
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('eventId', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='Event ID')),
                ('eventTitle', models.CharField(max_length=255, unique=True, verbose_name='Event Title')),
                ('eventDate', models.DateTimeField(verbose_name='Event Date and Time')),
                ('eventLocation', models.CharField(max_length=255, unique=True, verbose_name='Event Location')),
                ('mainDocument', models.FileField(blank=True, upload_to='events', verbose_name='Main Document')),
                ('additionalDocument', models.FileField(blank=True, upload_to='events', verbose_name='Additional Document')),
                ('contactInfo', models.CharField(max_length=255, unique=True, verbose_name='Contact Information')),
                ('objectives', models.TextField(blank=True, verbose_name='Event Objectives')),
                ('communication', models.TextField(blank=True, verbose_name='Communication text')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Creation date and time')),
                ('lastUpdate', models.DateTimeField(auto_now=True, verbose_name='Last update date and time')),
                ('eventCountry', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='event_country', to='app.Country', verbose_name='Country')),
            ],
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('languageId', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='Language ID')),
                ('languageName', models.CharField(max_length=255, unique=True, verbose_name='Language Name')),
            ],
            options={
                'ordering': ['languageName'],
            },
        ),
        migrations.CreateModel(
            name='Resource',
            fields=[
                ('resourceId', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='Resource ID')),
                ('title', models.CharField(max_length=255, unique=True, verbose_name='Resource Title')),
                ('pdfFile', models.FileField(blank=True, upload_to='resources', verbose_name='PDF')),
                ('firstPagePicture', models.ImageField(blank=True, upload_to='resources', verbose_name='First Page Picture')),
                ('description', models.TextField(blank=True, verbose_name='Description')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Creation date and time')),
                ('lastUpdate', models.DateTimeField(auto_now=True, verbose_name='Last update date and time')),
                ('language', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='language', to='app.Language', verbose_name='Language')),
            ],
        ),
        migrations.CreateModel(
            name='ResourceCategory',
            fields=[
                ('resourceCategoryId', models.AutoField(primary_key=True, serialize=False, unique=True, verbose_name='Resource Category ID')),
                ('resourceCategoryName', models.CharField(max_length=255, unique=True, verbose_name='Resource Category Name')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Creation date and time')),
                ('lastUpdate', models.DateTimeField(auto_now=True, verbose_name='Last update date and time')),
            ],
            options={
                'verbose_name_plural': 'Resource Categories',
                'verbose_name': 'Resource Category',
                'ordering': ['resourceCategoryName'],
            },
        ),
        migrations.AddField(
            model_name='resource',
            name='resourceCategory',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='resourceCategory', to='app.ResourceCategory', verbose_name='Resource Category'),
        ),
        migrations.AddField(
            model_name='contact',
            name='activityFromList',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='contact_activity_from_list', to='app.ContactActivity', verbose_name='Activity from List'),
        ),
        migrations.AddField(
            model_name='contact',
            name='borderLocationFromList',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='border_from_list', to='app.Border', verbose_name='Border from List'),
        ),
        migrations.AddField(
            model_name='contact',
            name='contactAfiliationFromList',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='afiliation_from_list', to='app.Border', verbose_name='Afiliation from List'),
        ),
        migrations.AddField(
            model_name='contact',
            name='contactCountry',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contact_country', to='app.Country', verbose_name='Country'),
        ),
        migrations.AddField(
            model_name='contact',
            name='contactStatus',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contactStatus', to='app.ContactStatus', verbose_name='Contact Status'),
        ),
    ]
