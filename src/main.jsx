import React from 'react'
import ReactDOM from 'react-dom/client'
import { storyblokInit, apiPlugin } from '@storyblok/react'
import App from '@/App.jsx'
import '@/index.css'

const sbToken = import.meta.env.VITE_STORYBLOK_PREVIEW_TOKEN || ""
storyblokInit({
  accessToken: sbToken,
  use: sbToken ? [apiPlugin] : [],
  apiOptions: {
    cache: { clear: "auto", type: "memory" },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)