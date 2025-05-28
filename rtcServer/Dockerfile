FROM node:18-alpine

# Устанавливаем ffmpeg и зависимости
RUN apk add --no-cache ffmpeg

# Создаем директорию приложения
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения
COPY . .

# Открываем порт, который использует приложение
EXPOSE 3000

# Команда для запуска приложения
CMD ["node", "App.js"]