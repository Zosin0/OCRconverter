# Usar uma imagem de node como base
FROM node:14

# Definir o diretório de trabalho como /app
WORKDIR /app

# Copiar os arquivos do front-end para o diretório de trabalho
COPY . .

# Instalar as dependências
RUN npm install

# Construir o projeto
RUN npm run build

# Expor a porta 3000
EXPOSE 3000

# Executar o comando para iniciar o servidor de desenvolvimento do React
CMD ["npm", "start"]
