# Админка — быстрый запуск

## Что сделано
- Добавлена простая админка по адресу `/admin`
- Добавление товара
- Удаление товара
- Защита админки по роли `isAdmin`
- Переведена авторизация на JWT
- Пароли теперь хешируются через `bcryptjs`
- Изображения товара берутся из поля `image`, есть fallback на `/test.webp`

## Запуск
### Backend
```bash
cd backend
npm run dev
```

### Frontend
```bash
cd frontend
npm run dev
```

## Важно
В присланном архиве frontend `node_modules` собран под Windows. Поэтому в Linux-среде может не запускаться Vite build, пока не переустановить зависимости.

Локально лучше сделать так:

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

Аналогично при необходимости для backend:

```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```
