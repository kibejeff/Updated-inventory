import React, { useState } from 'react';
import { useCategoryStore } from '../store/categoryStore';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function CategoryManagementPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategoryStore();
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<{ id: string; name: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory(editingCategory.id, newCategory);
      setEditingCategory(null);
    } else {
      addCategory(newCategory);
    }
    setNewCategory('');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
      
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Category name"
          className="flex-1 rounded-md border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          {editingCategory ? 'Update Category' : 'Add Category'}
        </button>
      </form>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {categories.map((category) => (
            <li key={category.id} className="px-4 py-4 flex items-center justify-between">
              <span className="text-gray-900">{category.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingCategory(category);
                    setNewCategory(category.name);
                  }}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}