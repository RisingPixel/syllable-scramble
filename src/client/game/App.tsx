import { BrowserRouter as Router, Routes, Route, HashRouter } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Toaster } from "./components/ui/toaster";
import Index from "./pages/Index";

export default function App() {
  // Use HashRouter for production to avoid server routing requirements
  const BrowserRouter = typeof window !== "undefined" && window.location.href.includes("localhost") 
    ? Router 
    : HashRouter;

  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </LanguageProvider>
  );
}
