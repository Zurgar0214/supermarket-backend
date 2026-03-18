# Supermarket Backend

Este es el backend de un sistema de gestión de supermercados, construido con Node.js, Express y Sequelize (PostgreSQL).

## 🚀 Características

- **Inicio Asíncrono**: El servidor solo inicia si la conexión a la base de datos es exitosa.
- **UUID como llaves primarias**: Todos los modelos utilizan UUID v4 como identificadores únicos para mayor seguridad y escalabilidad.
- **Mapeo Relacional**: Incluye modelos predefinidos para `Users` (Usuarios) y `Roles` con asociaciones establecidas.
- **Eliminaciones en Cascada**: Las relaciones están configuradas con `ON DELETE CASCADE` para mantener la integridad de los datos.

## 🛠️ Tecnologías

- **Node.js** & **Express 5**
- **Sequelize ORM** (v6)
- **PostgreSQL** (vía `pg` & `pg-hstore`)
- **Nodemon** (Entorno de desarrollo)
- **Dotenv** (Gestión de variables de entorno)
- **Bcryptjs** (Encriptación de contraseñas)

## 📁 Estructura del Proyecto

```text
supermarket-backend/
├── src/
│   ├── config/
│   │   └── database.js    # Configuración de Sequelize
│   ├── models/
│   │   ├── index.js       # Modelos centralizados y asociaciones
│   │   ├── Role.js        # Modelo de Rol (Admin, Cashier, Customer)
│   │   └── User.js        # Modelo de Usuario
│   ├── controllers/       # (Pendiente) Controladores de peticiones
│   ├── routes/            # (Pendiente) Endpoints de la API
│   └── services/          # (Pendiente) Lógica de negocio
├── .env                  # Variables de entorno (no rastreado por git)
├── .gitignore            # Archivos ignorados por git
├── app.js                # Punto de entrada y configuración del servidor
└── package.json          # Dependencias y scripts
```

## ⚙️ Configuración e Instalación

### 1. Requisitos

- [Node.js](https://nodejs.org/) (v18+)
- [PostgreSQL](https://www.postgresql.org/)

### 2. Instalación

Clona el repositorio e instala las dependencias:

```bash
npm install
```

### 3. Variables de Entorno

Crtrea un archivo `.env` en el directorio raíz y configura tus credenciales de PostgreSQL:

```env
DB_NAME=supermarket_db
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```

### 4. Inicialización de la Base de Datos

El proyecto está configurado para sincronizar automáticamente los modelos con la base de datos al iniciar mediante `sequelize.sync()`. Asegúrate de que la base de datos definida en `DB_NAME` exista antes de ejecutar el servidor.

## 跑 Ejecución del Proyecto

### Modo Desarrollo

Ejecuta el servidor con `nodemon` para reinicios automáticos al detectar cambios:

```bash
npm run dev
```

### Modo Producción

```bash
npm start
```

## 🔑 Módulo de Autenticación

### Roles
El sistema incluye actualmente los siguientes roles por defecto:
- `admin`: Acceso total al sistema.
- `cashier`: Acceso a operaciones de venta e inventario.
- `customer`: Acceso limitado para gestión de perfil.

### Modelos
- **Roles**: Almacena los nombres y descripciones de los roles.
- **Users**: Almacena la información del usuario, incluyendo una llave foránea `roleId` vinculada a la tabla Roles.
- **Asociaciones**: `Role.hasMany(User)` con eliminación en cascada habilitada.