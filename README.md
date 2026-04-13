# Supermarket Backend

Este es el backend de un sistema de gestión de supermercados, construido con Node.js, Express y Sequelize (PostgreSQL).

## 🚀 Características

- **Inicio Asíncrono**: El servidor solo inicia si la conexión a la base de datos es exitosa.
- **UUID como llaves primarias**: Todos los modelos utilizan UUID v4 como identificadores únicos para mayor seguridad y escalabilidad.
- **Mapeo Relacional**: Incluye modelos para `Usuarios`, `Proveedores`, `Productos`, `Ventas` y `Detalles de Venta`.
- **Integridad de Datos**: Las relaciones están configuradas con `ON DELETE CASCADE` y otras restricciones para mantener la consistencia.

## 🛠️ Tecnologías

- **Node.js** & **Express 5**
- **Sequelize ORM** (v6)
- **PostgreSQL** (vía `pg` & `pg-hstore`)
- **Nodemon** (Entorno de desarrollo)
- **Dotenv** (Gestión de variables de entorno)

## 📁 Estructura del Proyecto

```text
supermarket-backend/
├── src/
│   ├── config/
│   │   └── database.js    # Configuración de Sequelize
│   ├── models/
│   │   ├── index.js       # Modelos centralizados y asociaciones
│   │   ├── Product.js     # Modelo de Producto
│   │   ├── Provider.js    # Modelo de Proveedor
│   │   ├── Sale.js        # Modelo de Venta
│   │   ├── SaleDetail.js  # Modelo de Detalle de Venta
│   │   └── User.js        # Modelo de Usuario
│   ├── controllers/       # Controladores de la API
│   ├── routes/            # Endpoints de la API
│   └── services/          # Lógica de negocio
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

## 🗃️ Modelos y Entidades

El sistema gestiona la información agrupada en los siguientes módulos:
- **Proveedores (Providers)**: Suministro e información de los proveedores.
- **Productos (Products)**: Inventario de los artículos disponibles y stock.
- **Usuarios (Users)**: Usuarios y gestores dentro del sistema.
- **Ventas (Sales)**: Registro de cada transacción procesada.
- **DetalleVentas (SaleDetails)**: Desglose línea por línea de los productos facturados en cada venta.

## 👥 Equipo y Responsabilidades

Responsabilidades de cada integrante del equipo:

- **Juan Diego Varon Valencia**
  - Configuración inicial del proyecto (Express, Nodemon) e integración de base de datos (PostgreSQL, Sequelize).
  - Integración base de Swagger para documentación de API.
  - Creación de rama de características base y modelos iniciales.

- **Sandra Milena Ramos Melchor**
  - Configuración general de la aplicación (`app.js`).
  - Implementación integral de las funcionalidades CRUD para las entidades funcionales: **Usuarios**, **Proveedores** y **Productos**.

- **Juan Diego Ramirez Muñoz**
  - Desarrollo de la lógica de negocio estructurada (Controladores, Rutas y Servicios) orientada a facturación.
  - Implementación y documentación en Swagger para los módulos transaccionales de **Ventas** (Sales) y **Detalles de Ventas** (Sales Details).
