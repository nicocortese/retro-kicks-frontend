# 👟 Retro Kicks | Frontend

**Retro Kicks** es una tienda de comercio electrónico especializada en zapatillas retro, streetwear y moda deportiva. Este proyecto es el resultado de un **desarrollo colaborativo**, diseñado para ofrecer una experiencia de usuario inmersiva en la cultura *sneaker*.

> ⚠️ **Aviso legal / Proof of Concept:** Este proyecto fue desarrollado exclusivamente con fines de demostración. **No es una tienda real** y en ningún momento se solicitan, procesan ni almacenan datos bancarios o tarjetas de crédito de los usuarios.

⚙️ **Repositorio del Backend:** [retro-kicks-backend](https://github.com/tiagocollado/retro-kicks-backend)

---

## 🛠️ Stack Tecnológico

El proyecto completo es una aplicación Full-Stack (MERN + Next.js). Este repositorio abarca la capa de presentación (Frontend):

* **Framework:** [Next.js](https://nextjs.org/)
* **Librería UI:** [React](https://react.dev/)
* **Diseño UI/UX:** Figma
* *(El backend asociado utiliza Node.js, Express y MongoDB).*

---

## ✨ Estructura y Funcionalidades

La interfaz está dividida en secciones clave diseñadas para la conversión y la retención del usuario:

### 🛍️ E-Commerce Core
* **Shop & Brands:** Catálogo completo de zapatillas con estados de carga optimizados.
* **Wishlist:** Funcionalidad para guardar modelos favoritos.
* **Beneficios Destacados:** * 🚚 Envíos GRATIS a todo el país.
    * 🎧 Soporte 24/7.
    * 🔄 Devolución en 30 días.
    * 🔒 Pago 100% Seguro (Simulado).

### 📖 Blog: "Sneaker Stories"
Una sección dedicada a la cultura urbana y la historia del calzado, destacando artículos como:
* *AND1: La Revolución del Streetball*
* *Converse All Star: 100 Años de Rebeldía*
* *Vans: Del Skate a la Moda*

### 🏢 About Us
Página institucional que narra la historia de Retro Kicks (fundada en 2018) y sus valores fundamentales:
* **Autenticidad:** Verificación y garantía de originalidad.
* **Pasión:** Amor compartido por la cultura sneaker.
* **Comunidad:** Conexiones entre amantes del estilo retro.

### ✉️ Newsletter
Sistema de suscripción para recibir novedades, promociones y los últimos artículos del blog.

---

## 🚀 Instalación y Ejecución Local

Para correr este entorno de frontend en tu máquina local, es recomendable tener el [Backend](https://github.com/tiagocollado/retro-kicks-backend) corriendo en paralelo para que la carga de datos funcione correctamente.

1.  **Clonar el repositorio:**
    ```bash
    git clone [URL_DE_ESTE_REPOSITORIO]
    ```

2.  **Navegar al directorio:**
    ```bash
    cd retro-kicks-frontend
    ```

3.  **Instalar las dependencias:**
    ```bash
    npm install
    ```

4.  **Configurar Variables de Entorno:**
    Crear un archivo `.env.local` en la raíz del proyecto y vincular la URL del backend local o de producción:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:PUERTO_DEL_BACKEND/api
    ```

5.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

6.  **Visualizar la aplicación:**
    Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---
*Diseñado y desarrollado colaborativamente para los amantes de la cultura sneaker.*
