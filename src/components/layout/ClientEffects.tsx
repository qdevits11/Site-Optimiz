"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

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

export function ClientEffects() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      {isHome ? <Preloader key="home-intro" /> : null}
      <GradientOrbs />
      <CustomCursor />
    </>
  );
}
