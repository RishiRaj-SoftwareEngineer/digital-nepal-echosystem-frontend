"use client";

import { useState, ReactNode } from "react";

type Tab = {
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultTab?: number;
};

export function Tabs({
  tabs,
  defaultTab = 0,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div>
      {/* Tab List */}
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 font-medium ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panel */}
      <div className="mt-4">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
}