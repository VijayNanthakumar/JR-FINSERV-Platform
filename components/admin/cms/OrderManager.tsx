"use client";

import React, { useRef, useState } from "react";
import { GripVertical } from "lucide-react";

export interface OrderItem {
  id: string;
  label: string;
  sublabel?: string;
}

interface OrderManagerProps {
  items: OrderItem[];
  onReorder: (items: OrderItem[]) => void;
}

/**
 * Drag-and-drop list reordering using the HTML5 DnD API.
 * No external library needed.
 */
export function OrderManager({ items, onReorder }: OrderManagerProps) {
  const dragItem = useRef<number | null>(null);
  const dragOver = useRef<number | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    dragItem.current = index;
    setDragging(index);
  };

  const handleDragEnter = (index: number) => {
    dragOver.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOver.current === null) {
      setDragging(null);
      return;
    }
    const newItems = [...items];
    const [moved] = newItems.splice(dragItem.current, 1);
    newItems.splice(dragOver.current, 0, moved);
    dragItem.current = null;
    dragOver.current = null;
    setDragging(null);
    onReorder(newItems);
  };

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => e.preventDefault()}
          className={`
            flex items-center gap-3 p-3 bg-white border rounded-xl cursor-grab active:cursor-grabbing transition-all
            ${dragging === index ? "opacity-50 border-blue-300 shadow-md scale-[0.99]" : "border-neutral-200 hover:border-neutral-300 hover:shadow-sm"}
          `}
        >
          <GripVertical className="h-4 w-4 text-neutral-400 shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-medium text-navy-900 truncate">{item.label}</span>
            {item.sublabel && (
              <span className="text-xs text-neutral-500 truncate">{item.sublabel}</span>
            )}
          </div>
          <span className="text-xs font-mono text-neutral-400 shrink-0">#{index + 1}</span>
        </div>
      ))}
    </div>
  );
}
