"use client";

import React from "react";
import { Plus, FolderOpen, X } from "lucide-react";
import Loader from "@/components/Loader";

interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string | null;
  updatedAt: string;
}

interface CategoriesTabProps {
  categories: Category[];
  loading: boolean;
  error: string | null;
  message: string | null;
  onAddClick: () => void;
  onEditClick: (category: Category) => void;
  onDeleteClick: (id: string) => void;
}

export default function CategoriesTab({
  categories,
  loading,
  error,
  message,
  onAddClick,
  onEditClick,
  onDeleteClick,
}: CategoriesTabProps) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Manage Categories
        </h2>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {message && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader />
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12 text-gray-600">
          <FolderOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>No categories found</p>
          <p className="text-sm mt-2">
            Click &quot;Add Category&quot; to create your first category
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-gray-600 text-sm mb-3">
                      {category.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>ID: {category.id.substring(0, 8)}...</span>
                    <span>
                      Updated:{" "}
                      {new Date(category.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEditClick(category)}
                    className="text-blue-600 hover:text-blue-800 p-2"
                    title="Edit Category"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    onClick={async () => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this category?"
                        )
                      ) {
                        onDeleteClick(category.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-800 p-2"
                    title="Delete Category"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
