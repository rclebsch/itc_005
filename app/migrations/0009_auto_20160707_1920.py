# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-07-07 19:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_auto_20160707_1919'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='eventLocation',
            field=models.CharField(max_length=255, verbose_name='Event Location'),
        ),
    ]