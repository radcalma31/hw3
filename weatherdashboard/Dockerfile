# Dockerfile
# Backend
FROM node:latest as backend
WORKDIR /wapp/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .


# Frontend
FROM node:latest as frontend
WORKDIR /wapp/frontend
COPY frontend/ .


# Final Stage
FROM node:latest
WORKDIR /wapp
COPY --from=backend /wapp/backend ./backend
COPY --from=frontend /wapp/frontend/ ./frontend


EXPOSE 3000
CMD ["node", "backend/server.js"]

