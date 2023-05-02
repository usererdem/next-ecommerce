"use client";

import { useThemeStore } from "@/store";
import { ReactNode, useEffect, useState } from "react";

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const themeStore = useThemeStore();
  // Wait till Nextjs rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return (
    <>
      {isHydrated ? (
        <body
          className='min-h-screen px-8 sm:px-28 md:px-44 lg:px-52 font-roboto'
          data-theme={themeStore.mode}>
          {children}
        </body>
      ) : (
        <body>
          <div>Loading...</div>
        </body>
      )}
    </>
  );
}
