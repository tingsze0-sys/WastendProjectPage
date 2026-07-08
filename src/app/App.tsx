import { BrowserRouter, Routes, Route } from "react-router";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { Footer } from "./components/footer";
import { GlassNav } from "./components/glass-nav";
import { ScrollToTop } from "./components/scroll-to-top";
import { WastendPage } from "./pages/wastend";

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
          <GlassNav />
          <main className="flex-1">
            <Routes>
              <Route path="*" element={<WastendPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </I18nextProvider>
  );
}
