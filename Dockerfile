# Utiliser une image Node.js officielle en tant qu'image de base
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm ci --force

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application Next.js
RUN npm run build

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Définir la commande de démarrage de l'application
CMD [ "npm", "start" ]
