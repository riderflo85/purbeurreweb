from django.core.management.base import BaseCommand, CommandError
from search.complete_db import main
from search.update_db import update_database


class Command(BaseCommand):
    help = "Update database food content"

    def handle(self, *args, **options):
        """ execute an action according to the command """

        cat = [
            "boissons", "cereales-et-derives", "desserts", "fruits",
            "legumes-et-derives", "poissons", "produits-laitiers", "viandes"
        ]

        food = main()
        result = update_database(cat, food)

        if result['status']:
            self.stdout.write(self.style.SUCCESS(
                "La mise à jour de la base de données est terminée.\
                \n{} produits on été ajoutés.".format(result['counter'])
            ))
        
        else:
            self.stdout.write(self.style.ERROR(
                'Une erreur est survenu au niveau de la base de données.'
            ))
