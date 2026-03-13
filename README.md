# 🗓️ G.Congé — Application de Gestion des Congés Full-Stack

> Application web complète de gestion des demandes de congé développée avec **Angular** (Frontend) et **Spring Boot** (Backend), enrichie d'un pipeline ETL **SSIS** pour le nettoyage des données et de tableaux de bord analytiques **Power BI**. Réalisée dans le cadre d'un projet de fin d'études à **ARAB SOFT**.

---

## 🎯 Problématique & Objectif

La gestion manuelle des congés au sein des entreprises engendre plusieurs problèmes récurrents :

- **Erreurs humaines** — saisie manuelle, pertes de données
- **Perte de temps** — traitement papier ou par email sans suivi centralisé
- **Manque de visibilité** — absence de vue globale sur les absences en temps réel

Ce projet apporte une solution digitale complète permettant aux employés de soumettre leurs demandes en ligne, aux administrateurs de les gérer efficacement, et à la direction d'analyser les données via des tableaux de bord interactifs.

---

## 🗂️ Structure du projet

```
📁 gestion-conges/
│
├── 📁 frontend/                        # Application Angular
│   ├── authentification/               # Login / Logout selon le rôle
│   ├── gestion-utilisateurs/           # Interface admin — liste & ajout d'employés
│   ├── gestion-conges/                 # Formulaire & gestion des demandes
│   └── calendrier/                     # Visualisation des congés approuvés
│
├── 📁 backend/                         # API Spring Boot
│   ├── auth/                           # Authentification & gestion des rôles
│   ├── employes/                       # CRUD employés
│   └── conges/                         # CRUD demandes de congé
│
├── 📁 etl/                             # Pipeline ETL — SSIS
│   └── Package.dtsx                    # Nettoyage & transformation des données
│
├── 📁 powerbi/                         # Tableaux de bord Power BI
│   └── dashboard_conges.pbix           # Fichier Power BI — schéma en étoile
│
└── 📁 images/                          # Captures d'écran de l'application
```

---

## 🏗️ Architecture de l'application

```
┌─────────────────────────────────────────────────────┐
│           Application Angular (Frontend)             │
│   Login · Gestion employés · Congés · Calendrier    │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP REST API
┌──────────────────────▼──────────────────────────────┐
│              API Spring Boot (Backend)               │
│     Authentification · Logique métier · CRUD        │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│           SQL Server (Base de données)               │
│     Employés · Demandes de congé · Rôles            │
└──────────────────────┬──────────────────────────────┘
                       │ ETL (SSIS)
┌──────────────────────▼──────────────────────────────┐
│              Power BI (Analyse & Reporting)          │
│     Schéma en étoile · Tableaux de bord interactifs │
└─────────────────────────────────────────────────────┘
```

---

## 🔐 Sprint 1 — Authentification & Gestion des utilisateurs

L'accès à l'application est sécurisé par un système d'authentification basé sur les rôles. Selon le rôle attribué (**Admin** ou **User**), l'interface et les fonctionnalités accessibles sont différentes.

**Administrateur** → Ajouter, modifier, supprimer des employés, consulter la liste complète  
**Utilisateur** → Se connecter, consulter et gérer ses propres demandes de congé

### Page de connexion

![Authentification](images/01_authentification.png)

*Page d'accueil de l'application — l'utilisateur doit s'authentifier pour accéder à son espace personnel. En cas d'identifiants invalides, un message d'erreur s'affiche.*

### Liste des employés (Admin)

![Liste des employés](images/02_liste_employes.png)

*Interface réservée à l'administrateur — affiche la liste complète des employés avec leurs identifiants, emails et rôles.*

### Ajout d'un utilisateur (Admin)

![Ajout utilisateur](images/03_ajout_utilisateur.png)

*Formulaire d'ajout d'un nouvel utilisateur avec définition du rôle (Admin ou User).*

---

## 📋 Sprint 2 — Gestion des demandes de congé

### Gestion des demandes (Admin)

![Gestion des congés Admin](images/04_gestion_conges_admin.png)

*L'administrateur consulte toutes les demandes de congé et peut les **approuver** ✅ ou les **rejeter** 🚫. Le statut est affiché en temps réel : Accepté (vert), Refusé (rouge), En Cours (orange).*

### Soumettre une demande (User)

![Demande de congé User](images/05_demande_conge_user.png)

*L'utilisateur remplit un formulaire avec la date de début, la date de fin, la cause et le type de congé pour soumettre sa demande.*

### Calendrier des congés approuvés

![Calendrier des congés](images/06_calendrier_conges.png)

*Une fois la demande approuvée par l'administrateur, le congé apparaît automatiquement dans le calendrier de l'utilisateur, affiché de la date de début à la date de fin.*

---

## 📊 Sprint 3 — Pipeline ETL & Tableaux de bord Power BI

### Nettoyage des données avec SSIS

Les données brutes exportées depuis SQL Server contenaient des incohérences (formats de dates incorrects, colonnes mal structurées). Un pipeline ETL a été développé avec **SSIS (SQL Server Integration Services)** pour nettoyer et uniformiser les données avant leur chargement dans Power BI.

#### Pipeline ETL — Flux de données

![Pipeline ETL SSIS](images/07_etl_talend_pipeline.png)

*Le pipeline extrait les données depuis une **Source Excel**, applique une transformation via une **Colonne dérivée** (correction du format des dates), puis exporte le résultat dans une **Destination Excel** nettoyée. 100 lignes traitées.*

#### Transformation des colonnes

![Transformation SSIS](images/08_etl_talend_transformation.png)

*Exemple de transformation appliquée : correction du format de la date via une expression SSIS — `LEN(DT_STR,10,1252)(date) == 8 ? SUBSTRING(...)` — pour uniformiser les dates au format standard avant l'import dans Power BI.*

### Dashboard Power BI

![Dashboard Power BI](images/09_dashboard_powerbi.png)

*Tableau de bord interactif construit sur un **schéma en étoile** avec les KPIs clés :*

| KPI | Valeur |
|---|---|
| Nombre total d'employés | **100** |
| Employés ayant pris des congés | **86** |
| Nombre total de congés | **200** |

*Visualisations disponibles :*
- 📊 **Congés par département** — Finance, IT, Ressources Humaines, Marketing
- 🥧 **Congés selon la raison** — Maladie (24.48%), Accident (13.1%), Autre (62.41%)
- 📈 **Congés selon le genre** — Répartition Hommes / Femmes par département
- 📅 **Congés selon le mois** — Évolution temporelle des absences

---

## 🛠️ Technologies utilisées

| Technologie | Usage |
|---|---|
| **Angular** | Framework Frontend — SPA, routing, formulaires réactifs |
| **Spring Boot** | Framework Backend — API REST, logique métier, sécurité |
| **SQL Server** | Base de données relationnelle |
| **SSIS** | Pipeline ETL — nettoyage et transformation des données |
| **Power BI** | Tableaux de bord analytiques interactifs |
| **Scrum** | Méthodologie agile — 3 sprints |
| **POSTMAN** | Test des endpoints API REST |

---

## 🚀 Installation & Lancement

### Backend — Spring Boot

```bash
cd backend
mvn spring-boot:run
# → API disponible sur http://localhost:8080
```

### Frontend — Angular

```bash
cd frontend
npm install
ng serve
# → Application disponible sur http://localhost:4200
```

---

## 📊 Résultats clés

| Fonctionnalité | Statut |
|---|---|
| Authentification & gestion des rôles | ✅ Réalisé |
| Gestion des employés (CRUD) | ✅ Réalisé |
| Soumission et gestion des demandes de congé | ✅ Réalisé |
| Calendrier des congés approuvés | ✅ Réalisé |
| Pipeline ETL SSIS | ✅ Réalisé |
| Tableaux de bord Power BI | ✅ Réalisé |
| Version mobile | 🔮 Perspective future |
| Intégration avec les services RH | 🔮 Perspective future |
| Intégration Power BI directement dans l'app | 🔮 Perspective future |

---

## 👩‍💻 Auteure

**Sarra Lahbib** — Étudiante en Licence Appliquée Informatique de Gestion @ Esprit  
Projet réalisé au sein de **ARAB SOFT** — Encadré par Mr. Imed Hamadi & Mr. Mouadh Zidi  
Année universitaire : **2023–2024**
