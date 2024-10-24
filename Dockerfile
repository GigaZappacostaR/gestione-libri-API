# Usa un'immagine di Node.js come base
FROM node:14

# Imposta la directory di lavoro
WORKDIR /usr/src/app

# Copia i file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto dei file dell'app
COPY . .

# Espone la porta su cui l'app è in esecuzione
EXPOSE 3000

# Comando per avviare l'app
CMD [ "npm", "start" ]
