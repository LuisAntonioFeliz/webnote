# Webnote 📝✨

**Webnote** es un cuaderno digital *tablet-first* diseñado específicamente para estudiantes. Combina una experiencia de escritura fluida (soporte para entrada manual y digital) con una estética minimalista inspirada en la filosofía de diseño de Apple y una identidad visual cálida de carácter analógico.

---

## 🚀 Stack Definitivo

* **Core & Framework:** Next.js (App Router) + TypeScript
* **Estilos & Interfaz:** Tailwind CSS (configurado con sistema de diseño personalizado: Blanco Tiza, Verde Pizarra, Azul Tinta y Gris Grafito)
* **Backend & Lógica:** Server Actions y API Routes (Full-stack unificado)
* **Base de Datos:** PostgreSQL
* **ORM:** Prisma
* **Autenticación:** NextAuth.js (Auth.js)
* **Offline-First:** Dexie.js (IndexedDB) para almacenamiento local y sincronización de trazos/notas
* **Infraestructura & Despliegue:** Vercel (Frontend) & Render (Base de datos PostgreSQL)

---

## 🎨 Sistema de Diseño y Paleta (Resumen)

El proyecto rechaza los temas genéricos en favor de un estudio visual cálido:
* **Fondo general (Blanco Tiza):** `#F3F2EC`
* **Acento / Acciones (Verde Pizarra):** `#658D6D`
* **Títulos (Azul Tinta):** `#263746`
* **Texto General (Gris Grafito):** `#646762`
* **Texto Secundario (Gris Lápiz):** `#858781`
* **Tarjetas y Contenedores (Blanco Cálido):** `#FAF9F5` con bordes de 1px en `#E2DFD5`

### 📓 Excepción del Lienzo del Cuaderno
* **Papel:** `#FAF9F3`
* **Líneas horizontales:** `#9CB9D8`
* **Margen vertical:** `#C71585`

---

## 📂 Estructura del Repositorio
* `design.md` — Guía de estilos estricta para el diseño de componentes.
* `prisma/` — Esquema y migraciones de la base de datos.
* `src/app/` — Rutas, páginas y Server Actions de Next.js.