# Basis Node.js Image
FROM node:18-alpine

# Arbeitsverzeichnis erstellen
WORKDIR /app

# Package files kopieren
COPY package*.json ./

# Dependencies installieren
RUN npm install

# Source code kopieren
COPY . .

# Astro für Produktion bauen
RUN npm run build

# Port exponieren (angepasst auf 3000)
EXPOSE 3000

# Non-root user für Sicherheit
RUN adduser -D -s /bin/sh astro
USER astro

# Server starten
CMD ["npm", "start"]