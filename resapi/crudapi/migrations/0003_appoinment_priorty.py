# Generated by Django 3.2.4 on 2021-06-26 15:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crudapi', '0002_alter_appoinment_mail'),
    ]

    operations = [
        migrations.AddField(
            model_name='appoinment',
            name='priorty',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]