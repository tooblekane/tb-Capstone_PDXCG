# Generated by Django 4.1.4 on 2022-12-15 23:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_rename_wishlist_id_wishlist_wishlist_steamid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wishlist',
            name='wishlist_steamID',
            field=models.IntegerField(verbose_name='steamID'),
        ),
    ]
