"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

function idFromHash(hash: string) {
  if (!hash || hash === "#") return "";
  try {
    return decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return hash.replace(/^#/, "");
  }
}

/**
 * Re-scroll to in-page anchors even when the URL hash is already set
 * (browsers skip navigation if the hash does not change).
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const id = idFromHash(window.location.hash);
    if (!id) return;
    const t = window.setTimeout(() => {
      scrollToId(id);
    }, 50);
    return () => window.clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.hasAttribute("download") || anchor.target === "_blank") return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      const id = idFromHash(url.hash);
      if (!id) return;

      // Same-page hash link (e.g. already on /#devis)
      if (url.pathname === window.location.pathname) {
        event.preventDefault();
        if (window.location.hash !== url.hash) {
          window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
        }
        scrollToId(id);
      }
    }

    function onHashChange() {
      const id = idFromHash(window.location.hash);
      if (id) scrollToId(id);
    }

    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
