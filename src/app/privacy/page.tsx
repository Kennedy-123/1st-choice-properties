import React from "react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          This Privacy Policy describes how 1st Choice Properties collects,
          uses, and discloses your personal information when you use our
          website.
        </p>

        <section className="mb-6 text-left">
          <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We may collect personal information you provide directly (such as
            name, email, and phone) and information collected automatically
            (such as cookies and usage data).
          </p>
        </section>

        <section className="mb-6 text-left">
          <h2 className="text-xl font-semibold mb-2">How We Use Information</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We use the information to provide and improve our service, respond
            to inquiries, and send important communications.
          </p>
        </section>

        <section className="mb-0 text-left">
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-300">
            If you have questions about this policy, please contact us at
            info@1stchoiceproperties.com.ng.
          </p>
        </section>
      </div>
    </main>
  );
}
