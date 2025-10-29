"use client";

import React from "react";
import { Plus, HelpCircle, X } from "lucide-react";
import Loader from "@/components/Loader";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  createdAt: string | null;
  updatedAt: string;
}

interface FAQsTabProps {
  faqs: FAQ[];
  loading: boolean;
  error: string | null;
  message: string | null;
  onAddClick: () => void;
  onEditClick: (faq: FAQ) => void;
  onDeleteClick: (id: string) => void;
}

export default function FAQsTab({
  faqs,
  loading,
  error,
  message,
  onAddClick,
  onEditClick,
  onDeleteClick,
}: FAQsTabProps) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Manage FAQs</h2>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add FAQ
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
      ) : faqs.length === 0 ? (
        <div className="text-center py-12 text-gray-600">
          <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>No FAQs found</p>
          <p className="text-sm mt-2">
            Click &quot;Add FAQ&quot; to create your first FAQ
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                    <span>ID: {faq.id.substring(0, 8)}...</span>
                    <span>
                      Updated: {new Date(faq.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEditClick(faq)}
                    className="text-blue-600 hover:text-blue-800 p-2"
                    title="Edit FAQ"
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
                          "Are you sure you want to delete this FAQ?"
                        )
                      ) {
                        onDeleteClick(faq.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-800 p-2"
                    title="Delete FAQ"
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
