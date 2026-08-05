"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(
  () => import("@/components/ui/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false },
);

const GradientOrbs = dynamic(
  () => import("@/components/ui/GradientOrbs").then((m) => m.GradientOrbs),
  { ssr: false },
);

export function ClientEffects() {
  return (
    <>
      <GradientOrbs />
      <CustomCursor />
    </>
  );
}
