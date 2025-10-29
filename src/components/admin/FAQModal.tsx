"use client";

import React from "react";
import { X } from "lucide-react";

interface FAQFormData {
  question: string;
  answer: string;
}

interface FAQModalProps {
  isOpen: boolean;
  isEditing: boolean;
  formData: FAQFormData;
  loading: boolean;
  error?: string | null;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (data: FAQFormData) => void;
}

export default function FAQModal({
  isOpen,
  isEditing,
  formData,
  loading,
  error,
  onClose,
  onSubmit,
  onChange,
}: FAQModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">
            {isEditing ? "Edit FAQ" : "Add New FAQ"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question
            </label>
            <input
              type="text"
              required
              value={formData.question}
              onChange={(e) =>
                onChange({ ...formData, question: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Answer
            </label>
            <textarea
              required
              rows={4}
              value={formData.answer}
              onChange={(e) =>
                onChange({ ...formData, answer: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                ? "Update FAQ"
                : "Create FAQ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
