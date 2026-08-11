"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { markIntroDone } from "@/lib/intro";

const CustomCursor = dynamic(
  () => import("@/components/ui/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false },
);

const GradientOrbs = dynamic(
  () => import("@/components/ui/GradientOrbs").then((m) => m.GradientOrbs),
  { ssr: false },
);

const Preloader = dynamic(
  () => import("@/components/ui/Preloader").then((m) => m.Preloader),
  { ssr: false },
);

/** Survives client navigations; resets only on full page reload. */
let bootPath: string | null = null;

export function ClientEffects() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (bootPath === null) {
      bootPath = window.location.pathname;
      if (bootPath === "/") {
        setShowIntro(true);
      } else {
        markIntroDone();
      }
    } else if (!showIntro) {
      markIntroDone();
    }
  }, [showIntro]);

  return (
    <>
      {showIntro ? (
        <Preloader
          onDone={() => {
            markIntroDone();
            setShowIntro(false);
          }}
        />
      ) : null}
      <GradientOrbs />
      <CustomCursor />
    </>
  );
}
