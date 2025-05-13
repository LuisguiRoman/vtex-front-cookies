# Fortune Cookies VTEX IO App

Una aplicación personalizada para VTEX IO que muestra una “galleta de la fortuna” con un mensaje aleatorio y un número de la suerte. Usa React, VTEX Styleguide y traducciones con `react-intl`.

---

## 🚀 Características

- Animación de galleta al hacer clic
- Obtención de frases desde Master Data (entidad `CF`)
- Generación de número de la suerte con formato `XX-XX-XXXX`
- Textos traducibles (`react-intl`)
- Spinner de carga (vtex.styleguide)
- Estilos personalizados con CSS Modules

---
## Ver aplicación
[Dirigirse al workspace romanchallenge](https://romanchallenge--valtech.myvtex.com/fortune-cookies)

---

## 📋 Requisitos

- Node.js ≥ 14
- VTEX Toolbelt (`vtex`)
- Acceso a un workspace en VTEX IO
- Master Data configurado con entidad `CF` y campo `CookieFortune`

---

## ⚙️ Instalación

1. Clona el repositorio:
- `git clone https://github.com/your-org/front-cookies.git`

---

## Enlaza tu app en un workspace de VTEX:
- `vtex login youraccount`
- `vtex use yourworkspace`
- `vtex link`

---

## Deploy
- `vtex publish`
- `vtex deploy vendor.appname@x.x.x`
- `vtex install vendor.appname@x.x.x`

