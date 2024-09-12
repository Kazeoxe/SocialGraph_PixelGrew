import json
import re
import requests
from datetime import datetime

marker_url = "https://map.pixelgrew.com/maps/world/live/markers.json"

# Function to fetch and log data
def fetch_url():
    try:
        # Fetch the data from the URL
        response = requests.get(marker_url)
        response.raise_for_status()  # Raise an exception for HTTP errors
        data = response.json()

        # Get the current timestamp
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        print(f"Data fetched at {timestamp}")

        # Call fetch_and_log_Chunksdata() with the fetched data
        fetch_and_log_Chunksdata(data, timestamp)
    
    except requests.RequestException as e:
        print(f"Error fetching data: {e}")
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")

def fetch_and_log_Chunksdata(data, timestamp):
    # Initialisation d'un dictionnaire pour stocker les informations des joueurs
    players_info = {}
    details = {}
    formatted_data = {}

    # Parcours des markers pour extraire les informations des joueurs
    for marker_id, marker_info in data['me.angeschossen.lands']['markers'].items():
        if 'detail' in marker_info:
            details[marker_id] = {
                "detail": marker_info["detail"]
            }
    # Parcours des markers pour extraire les informations des joueurs
    for marker_id, marker_info in details.items():
        if 'detail' in marker_info:
            detail_text = marker_info['detail']

            # Utilisation de regex pour extraire le nom du joueur
            match_name = re.search(r'<span style="color: {land_color};">(.+?)</span>', detail_text)
            if match_name:
                player_name = match_name.group(1).strip()

                # Recherche de la liste des joueurs
                match_players = re.search(r'Players \(\d+\): (.+?)</li>', detail_text)
                if match_players:
                    player_list = match_players.group(1).strip()

                    # Ajout des informations dans le dictionnaire players_info
                    players_info[player_name] = player_list

    # Parcours des clés et valeurs pour retirer <br/>
    for key, value in players_info.items():
        if isinstance(value, str):
            # Remplacement de <br/> par une chaîne vide
            cleaned_value = value.replace('<br/>', '')
            players_info[key] = cleaned_value

    # Parcourir les données et créer la structure demandée
    for key, value in players_info.items():
        # Prendre le premier nom de la liste des joueurs comme clé principale
        player_names = value.split(', ')
        first_player = player_names[0]

        # Créer une liste des lands restants associés à chaque joueur
        other_players = player_names[1:]

        # Si le joueur principal n'existe pas encore dans formatted_data, le créer
        if first_player not in formatted_data:
            formatted_data[first_player] = {}

        # Vérifier si la land existe déjà sous ce joueur
        if key in formatted_data[first_player]:
            # Si oui, ajouter les autres joueurs à la liste existante
            formatted_data[first_player][key]["players"].extend(other_players)
        else:
            # Sinon, créer une nouvelle land avec la liste des autres joueurs
            formatted_data[first_player][key] = {
                "players": other_players
            }

    # Générer le nom de fichier avec le timestamp actuel
    # output_file = f"players_info_{timestamp}.json"
    output_file = f"players_info.json"

    # Enregistrer les résultats dans un nouveau fichier JSON
    with open("assets/scripts/data/" + output_file, 'w') as file:
        json.dump(formatted_data, file, indent=2)

    print(f"Les données ont été formatées et enregistrées dans '{output_file}'.")

# Appel initial de la fonction fetch_url pour démarrer le processus
fetch_url()
