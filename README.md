# Mis XV Años — Invitación Web

Un proyecto web estático desarrollado con **Next.js** para una tarjeta de invitación digital de XV años. Cuenta con un diseño elegante, animaciones, confirmación de asistencia por WhatsApp y un reloj en cuenta regresiva.

## 🚀 Tecnologías

* **Next.js** (App Router)
* **React**
* **Tailwind CSS** (para estilos)
* **Radix UI** (componentes accesibles)
* **Lucide React** (iconos)

## 🛠 Instalación y Desarrollo Local

1. Asegúrate de tener **Node.js** instalado en tu computadora.
2. Clona este repositorio o descarga el código fuente.
3. Instala las dependencias en la terminal (recomendado con `pnpm` o `npm`):

   ```bash
   pnpm install
   # o
   npm install
   ```

4. Corre el servidor de desarrollo local:

   ```bash
   pnpm run dev
   # o
   npm run dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la página en vivo.

## 📦 Construcción (Build)

Este proyecto está configurado para exportarse de manera 100% estática (`output: 'export'`), lo que significa que es perfectamente compatible con servicios de hosting gratuitos como **GitHub Pages**.

Para compilar el proyecto y generar la versión estática final:

```bash
pnpm run build
# o
npm run build
```

Esto generará una carpeta llamada `out/` que contendrá todo el HTML, CSS y JS optimizado, listo para subirse a cualquier servidor.

## 🌐 Despliegue en GitHub Pages

La forma más recomendada de subirlo a GitHub Pages es mediante **GitHub Actions**:
1. Sube tu código a un repositorio en GitHub.
2. Ve a la pestaña **Settings > Pages**.
3. En la sección **Build and deployment**, cambia el "Source" a **GitHub Actions**.
4. Selecciona la plantilla de **Next.js** y haz commit al archivo `.yml` sugerido.
5. GitHub automáticamente compilará tu proyecto y lo expondrá en internet en pocos minutos.
