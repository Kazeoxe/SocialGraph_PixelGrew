import json
import math

with open('src/scripts/data/players_info.json', 'r') as file:
    data = json.load(file)

nodes = []
edges = []
all_players = set()
author_to_id = {}  # Dictionnaire pour mapper les noms des joueurs aux identifiants
node_id = 1  # Identifiant de départ pour les nœuds

# Ajouter les nœuds pour chaque auteur et chaque joueur lié à un land
for author, lands in data.items():
    nodes.append({'id': node_id, 'label': author, 'value': 0})  # Utilisation d'un identifiant numérique
    author_to_id[author] = node_id  # Associer le nom de l'auteur à l'identifiant
    all_players.add(author)  # Ajouter l'auteur à la liste des joueurs
    node_id += 1
    for land, info in lands.items():
        for player in info['players']:
            if player not in all_players:
                nodes.append({'id': node_id, 'label': player, 'value': 0})  # Ajouter le joueur avec un nouvel identifiant
                author_to_id[player] = node_id  # Associer le nom du joueur à l'identifiant
                all_players.add(player)  # Ajouter le joueur à la liste des joueurs
                node_id += 1

# Ajouter les arêtes entre les auteurs et les joueurs connectés à leurs lands
for author, lands in data.items():
    author_id = author_to_id[author]  # Obtenir l'identifiant de l'auteur
    for land, info in lands.items():
        for player in info['players']:
            if author != player:  # Vérifier si l'auteur est différent du joueur
                player_id = author_to_id[player]  # Obtenir l'identifiant du joueur
                edges.append({'from': author_id, 'to': player_id})  # Utilisation des identifiants numériques
                nodes[next(i for i, node in enumerate(nodes) if node['id'] == author_id)]['value'] += 1  # Incrémenter value pour l'auteur
                nodes[next(i for i, node in enumerate(nodes) if node['id'] == player_id)]['value'] += 1  # Incrémenter value pour le joueur

# Supprimer les nœuds en double en conservant celui avec la valeur la plus élevée
unique_nodes = {}
for node in nodes:
    label = node['label']
    if label not in unique_nodes:
        unique_nodes[label] = node
    else:
        if node['value'] > unique_nodes[label]['value']:
            unique_nodes[label] = node

# Appliquer la multiplication exponentielle légère aux valeurs des nœuds
for node in unique_nodes.values():
    node['value'] = math.pow(node['value'], 1.1)

# Mettre à jour les arêtes pour qu'elles pointent vers les nœuds conservés
edges = [
    {'from': unique_nodes[nodes[edge['from'] - 1]['label']]['id'], 'to': unique_nodes[nodes[edge['to'] - 1]['label']]['id']}
    for edge in edges
]

# Créer le dictionnaire final pour les nœuds et les arêtes
graph_data = {
    'nodes': list(unique_nodes.values()),
    'edges': edges
}

# Écrire les données du graphe dans un fichier JSON
with open('src/scripts/data/nodes-edges_data.json', 'w') as file:
    json.dump(graph_data, file, indent=2)

print("Les données du graphe ont été enregistrées dans 'nodes-edges_data.json'.")
