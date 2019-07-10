from .models import Aliment


def update_database(cat, dico_food):
    """ update database content """

    id_cat = 1
    try:
        for i in cat:
            for food in dico_food[i]:
                try:
                    new_food = Aliment()
                    new_food.name = food[0]
                    new_food.nutrition_group = food[1]
                    new_food.nova_group = food[2]
                    new_food.shop = food[3]
                    new_food.image = food[4]
                    new_food.link = food[5]
                    new_food.nutriments = food[6]
                    new_food.categorie_id = id_cat
                    new_food.save()
                except:
                    pass
            id_cat += 1
        return True
    except:
        return False