# Projet de visualisation de données - InsideAirbnb Barcelona

## Description du projet

Ce projet s'intéresse à l'offre d'Airbnb pour la ville de Barcelone. Plus particulièrement, il vise à dresser une comparaison des quartiers selon plusieurs dimensions (ex : le prix médian par personne et par nuit).

## Démo

![alt text](https://github.com/dbssn/projet_VisDon/blob/master/demo.png)

## Données

Les données utilisées pour ce projet ont été récoltées par Murray Cox et mise à disposition sur la plateforme Inside Airbnb. Le fichier utilisé comporte la liste des annonces actives sur la plateforme Airbnb pour la ville de Barcelone à un instant t (ici, le 13 juin 2020). Chaque ligne du fichier représente un logement, pour lequel une multitude de propriétés (scores laissés par les hôtes, nombre de nuits minimum pour un séjour, quartier, nom de l'hôte, prix par ex.) ont étés récoltées.

Source : (2020, 13 Juin). Detailed Listings data for Barcelona. Inside Airbnb : Adding data to the debate. Repéré à http://insideairbnb.com/get-the-data.html. Consulté le 30.08.2019. | Nom du fichier : "listings.csv.gz"

## Traitement des données

Les données présentées ci-dessus ont été traitées à l'aide d'un script python développé pour ce projet. Ce script s'appuie sur la librairie pandas afin de filtrer et aggréger les données pour obtenir des informations sur les différents quartiers de Barcelone.

Le notebook à l'adresse https://nbviewer.jupyter.org/github/dbssn/projet_VisDon/blob/master/dataPrep/DataVis_data_prep.ipynb permet de consulter les opérations effectuées sur les données brutes.

