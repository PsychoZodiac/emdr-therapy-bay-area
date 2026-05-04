import { SpeedInsights } from '@vercel/speed-insights/react'

// Inside the render, add <SpeedInsights /> alongside <App />
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
      <SpeedInsights />
    </HelmetProvider>
  </React.StrictMode>,
)
