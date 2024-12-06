import React from 'react';
import { format } from 'date-fns';
import { useInventoryStore } from '../store/inventoryStore';
import type { InventoryItem } from '../types';

interface GroupedInventory {
  [key: string]: InventoryItem[];
}

export default function InventoryList() {
  const { items } = useInventoryStore();
  
  const groupedItems = items.reduce((acc: GroupedInventory, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{category}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {categoryItems.map((item) => (
              <div key={item.id} className="border border-gray-300 rounded-lg p-4">
                <div className="aspect-w-3 aspect-h-2 mb-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="object-cover w-full h-48 rounded-lg"
                  />
                </div>
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Quantity</dt>
                    <dd className="text-sm text-gray-900">{item.quantity}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Price</dt>
                    <dd className="text-sm text-gray-900">${item.price.toFixed(2)}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                    <dd className="text-sm text-gray-900">
                      {format(item.lastUpdated, 'MMM d, yyyy HH:mm')}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}