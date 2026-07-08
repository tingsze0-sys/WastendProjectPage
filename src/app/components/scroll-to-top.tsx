import { useEffect } from "react";
import { useLocation } from "react-router";

/** Resets scroll position on route change so each frame opens at the top. */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}
