type TabsProps = {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
};

export function Tabs({
  tabs,
  activeTab,
  onChange,
}: TabsProps) {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}