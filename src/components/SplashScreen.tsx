// components/SplashScreen.tsx
"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 700); // show for 700ms
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center">
      <Logo/>
    </div>
  );
}
