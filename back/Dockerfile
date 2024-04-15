# Use uma imagem base que inclua o Python e o Tesseract OCR
FROM python:3.8-slim

# Instale as dependências do Tesseract OCR
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-por \
    tesseract-ocr-spa \
    tesseract-ocr-eng \
 && rm -rf /var/lib/apt/lists/*

# Configuração do ambiente Python
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Configuração do Tesseract OCR
ENV TESSDATA_PREFIX /usr/share/tesseract-ocr/4.00/tessdata

# Copie o restante do seu aplicativo
COPY . .

# Exponha a porta do Flask
EXPOSE 5000

# Comando padrão para iniciar o servidor Flask
CMD ["python", "app.py"]
