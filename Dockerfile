FROM node:18

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias (sin devDependencies si es necesario)
RUN npm install --only=production

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto que usará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
