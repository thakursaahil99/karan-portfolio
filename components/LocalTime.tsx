"use client";

import { useEffect, useState } from "react";

/** Current time in India, ticking every second; renders a stable placeholder on the server. */
export default function LocalTime({ seconds = false }: { seconds?: boolean }) {
  const [t, setT] = useState<string>("--:--");
  useEffect(() => {
    const f = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: seconds ? "2-digit" : undefined,
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setT(f.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [seconds]);
  return <span suppressHydrationWarning>{t}</span>;
}
