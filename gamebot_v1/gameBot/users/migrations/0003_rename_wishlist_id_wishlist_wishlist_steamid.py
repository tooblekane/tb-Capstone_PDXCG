# Generated by Django 4.1.4 on 2022-12-15 23:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_customuser_has_epic'),
    ]

    operations = [
        migrations.RenameField(
            model_name='wishlist',
            old_name='wishlist_id',
            new_name='wishlist_steamID',
        ),
    ]
