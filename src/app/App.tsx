import { BrowserRouter, Routes, Route } from "react-router";
import { Footer } from "./components/footer";
import { GlassNav } from "./components/glass-nav";
import { ScrollToTop } from "./components/scroll-to-top";
import { WastendPage } from "./pages/wastend";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-[var(--paper)] text-[var(--ink)]">
        <GlassNav />
        <main className="flex-1">
          <Routes>
            <Route path="*" element={<WastendPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
