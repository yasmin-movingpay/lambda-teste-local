# Use a imagem base oficial da AWS Lambda para Node.js 14
FROM public.ecr.aws/lambda/nodejs:14

# Copiar os arquivos de código
COPY package*.json ./
RUN npm install

# Copiar o restante do código
COPY . .

# Compilar o TypeScript
RUN npm run build

# Definir o CMD para o handler (dist/index.handler)
CMD [ "dist/index.handler" ]
