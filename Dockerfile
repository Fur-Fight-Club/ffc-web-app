# Utilisez une image de base Node.js pour la phase de build
FROM node:14-alpine as builder

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le package.json et le package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installez les dépendances du projet
RUN npm install

# Copiez tous les fichiers du répertoire de travail actuel vers le répertoire de travail du conteneur
COPY . .

# Build de l'application Next.js
RUN npm run build

# Utilisez une image légère Nginx pour la phase de production
FROM nginx:alpine

# Copiez les fichiers buildés de l'étape précédente vers le répertoire de travail du conteneur Nginx
COPY --from=builder /app/out /usr/share/nginx/html

# Exposez le port sur lequel Nginx s'exécute (par défaut : 80)
EXPOSE 80

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
