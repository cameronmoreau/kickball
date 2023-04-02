import classNames from "classnames";
import React from "react";

interface TabsProps {
  tabs: string[];
  onTabClick: (tab: string) => void;
  selected?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, selected, onTabClick }) => {
  return (
    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
      {tabs.map((tab) => (
        <div
          key={`tab-${tab}`}
          onClick={() => onTabClick(tab)}
          className={classNames(
            tab === selected
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
            "w-1/2 border-b-2 py-4 px-1 text-center text-sm font-medium"
          )}
        >
          {tab}
        </div>
      ))}
    </nav>
  );
};

export default Tabs;
