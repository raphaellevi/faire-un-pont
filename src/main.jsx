import React from 'react'
import ReactDOM from 'react-dom/client'
import { storyblokInit, apiPlugin } from '@storyblok/react'
import App from '@/App.jsx'
import '@/index.css'

storyblokInit({
  accessToken: import.meta.env.DEV
    ? import.meta.env.VITE_STORYBLOK_PREVIEW_TOKEN
    : import.meta.env.VITE_STORYBLOK_PUBLIC_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    cache: { clear: "auto", type: "memory" },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)