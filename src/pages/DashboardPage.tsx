import React from 'react';
import { useInventoryStore } from '../store/inventoryStore';
import { format } from 'date-fns';
import { Package, ArrowDown, ArrowUp } from 'lucide-react';

export default function DashboardPage() {
  const { items, checkoutRecords } = useInventoryStore();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const checkedOutItems = checkoutRecords.filter(
    (record) => record.status === 'checked-out'
  ).length;

  const recentActivity = checkoutRecords
    .slice()
    .sort((a, b) => b.checkoutDate.getTime() - a.checkoutDate.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Items
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">{totalItems}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ArrowDown className="h-6 w-6 text-red-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Checked Out Items
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">{checkedOutItems}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ArrowUp className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Available Items
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {totalItems - checkedOutItems}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Activity
          </h3>
          <div className="mt-5">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentActivity.map((record) => (
                  <li key={record.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Item ID: {record.itemId}
                        </p>
                        <p className="text-sm text-gray-500">
                          {record.status === 'checked-out' ? 'Checked out' : 'Returned'} by{' '}
                          {record.userId}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(record.checkoutDate, 'MMM d, yyyy')}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}