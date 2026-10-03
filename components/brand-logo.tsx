"use client";

import { useEffect, useState } from "react";

export function BrandLogo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setTheme(root.dataset.theme === "dark" ? "dark" : "light");
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={`/assets/helios-logo-${theme}.svg`}
      alt="Helios Digital Technology"
      width="174"
      height="58"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
