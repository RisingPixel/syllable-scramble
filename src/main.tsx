import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageProvider } from "./contexts/LanguageContext";

// Prevent scroll with arrow keys and spacebar
window.addEventListener('keydown', (ev) => {
  if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', ' '].includes(ev.key)) {
    ev.preventDefault();
  }
});

// Register Service Worker for dictionary caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(reg => console.log('✅ Service Worker registered for dictionary caching'))
      .catch(err => console.error('❌ Service Worker registration failed:', err));
  });
}

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
