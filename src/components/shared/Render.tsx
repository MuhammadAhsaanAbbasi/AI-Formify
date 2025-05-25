// components/ReorderableList.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Reorder } from "framer-motion";

export type ReorderableListProps<T> = {
  isEditable: boolean;
  items: T[];
  onReorder: (newItems: T[]) => void;
  className?: string;
  children: (item: T, index: number) => React.ReactNode;
};

export function ReorderableList<T>({
  isEditable,
  items,
  onReorder,
  className,
  children,
}: ReorderableListProps<T>) {
  // 1️⃣ keep local copy
  const [localItems, setLocalItems] = useState<T[]>(items);

  // keep sync if parent items change
  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  if (!isEditable) {
    return <>{items.map((item, idx) => children(item, idx))}</>;
  }

  return (
    <Reorder.Group
      axis="y"
      values={localItems}
      onReorder={setLocalItems}      // 2️⃣ updates continuously
      className={className}
    >
      {localItems.map((item, idx) => (
        <Reorder.Item
          key={idx}
          value={item}
          onDragEnd={() => {
            onReorder(localItems);    // 3️⃣ only fire once, on drop
          }}
        >
          {children(item, idx)}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
