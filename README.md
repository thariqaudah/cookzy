# Cookzy

Cookzy is an front-end application to you for find your best and favorite food recipe in a fun way. It's beacuse cook is easy. You can search food by keyword, filter based on your preferences and save it for later.

Production site: ...

## 📦 Features

- Find recipes by any keyword
- Filter based on preferences
- Save it for later
- Dynamic ingredients per total servings
- Responsive design across multi devices

## 💻 Tech Stack

- [Vue JS](https://vuejs.org/)
- [Vite](https://vitejs.dev/): As a build tool
- [vue-router](https://router.vuejs.org/): For routing
- [Edamam Recipe Search API](https://developer.edamam.com/edamam-recipe-api): For an API
- [Font Awesome](https://fontawesome.com/): For icons library
- [Axios](https://axios-http.com/): For handle async communication to server

## 🛠 Installation Steps

Clone the repository

```bash
git clone https://github.com/thariqaudah/cookzy.git
```

Change the working directory

```bash
cd cookzy
```

Install dependencies

```bash
npm install
```

Create `.env` file in the root folder and add your API key from [Edamam Recipe Search API](https://developer.edamam.com/edamam-recipe-api)

```bash
VITE_API_URL=https://api.edamam.com/api/recipes/v2
VITE_API_ID=YOUR_API_ID
VITE_API_KEY=YOUR_API_KEY
```

Run the app

```bash
npm run dev
```

You are all set! Open [localhost:3100](http://localhost:3100/) to see the app.

## 🚀 Feedback

Feedback is appreciated. If you have any, please reach out me in [Twitter](https://twitter.com/mt_audah) or go to this repo Issues tab.

## 🛡️ License

[MIT](https://choosealicense.com/licenses/mit/)
