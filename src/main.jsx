import React from 'react'
import ReactDOM from 'react-dom/client'
import { storyblokInit, apiPlugin } from '@storyblok/react'
import App from '@/App.jsx'
import '@/index.css'

storyblokInit({
  accessToken: import.meta.env.VITE_STORYBLOK_TOKEN,
  use: [apiPlugin],
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)