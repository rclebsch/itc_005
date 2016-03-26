# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-23 07:10
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='contact',
            options={'ordering': ['contactCategory', 'organizationName', 'lastName', 'firstName'], 'verbose_name': 'Contact', 'verbose_name_plural': 'Contacts'},
        ),
        migrations.AddField(
            model_name='contact',
            name='contactCategory',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='contact_category', to='app.ContactCategory', verbose_name='Category'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='contact',
            name='activityFree',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Activity'),
        ),
        migrations.AlterField(
            model_name='contact',
            name='activityFromList',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='contact_activity_from_list', to='app.ContactActivity', verbose_name='Activity from List'),
        ),
        migrations.AlterField(
            model_name='contact',
            name='borderLocationFree',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Border Location'),
        ),
        migrations.AlterField(
            model_name='contact',
            name='borderLocationFromList',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='border_from_list', to='app.Border', verbose_name='Border from List'),
        ),
        migrations.AlterField(
            model_name='contact',
            name='contactAfiliationFree',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Afiliation'),
        ),
        migrations.AlterField(
            model_name='contact',
            name='contactAfiliationFromList',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='afiliation_from_list', to='app.ContactAfiliation', verbose_name='Afiliation from List'),
        ),
        migrations.AlterField(
            model_name='contact',
            name='firstName',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='First Name'),
        ),
        migrations.AlterField(
            model_name='contact',
            name='lastName',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Last Name'),
        ),
        migrations.AlterField(
            model_name='contact',
            name='organizationName',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Organization Name'),
        ),
        migrations.AlterField(
            model_name='contact',
            name='phoneLocalNumber',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Phone Local Number'),
        ),
        migrations.AlterField(
            model_name='contact',
            name='rejectReason',
            field=models.TextField(blank=True, null=True, verbose_name='Rejection Reason'),
        ),
    ]
