# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-03-20 20:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kolibriauth', '0009_auto_20180301_1123'),
    ]

    operations = [
        migrations.AlterField(
            model_name='role',
            name='kind',
            field=models.CharField(choices=[('admin', 'Admin'), ('coach', 'Coach'), ('classroom assignable coach', 'Classroom Assignable Coach')], max_length=26),
        ),
    ]
