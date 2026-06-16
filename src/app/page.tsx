'use client';

import CitizensPage from "./ward/citizens/page";
import WardDashboardPage from "./ward/dashboard/page";

export default function Home() {
  return (
    <div>
      <WardDashboardPage />
      <CitizensPage />
    </div>
  );
}
