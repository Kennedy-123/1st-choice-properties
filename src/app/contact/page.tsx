"use client"
import React, { FormEvent, useRef } from "react";
import { useContactForm } from "@/hooks/useContact";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const { submitContactForm, loading, success, errorMessage } = useContactForm();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    
    const result = await submitContactForm({
      name: formValues.name as string,
      email: formValues.email as string,
      subject: formValues.subject as string,
      message: formValues.message as string,
    });
    
    if (result?.success && formRef.current) {
      formRef.current.reset();
    }
  };
  return (
    <main className="min-h-screen bg-gray-50 mt-4">
      {/* Main Content */}
      <div className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Contact Information */}
              <div className="w-full md:w-1/3 bg-gray-900 text-white p-6 sm:p-8 md:p-10 lg:p-12">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Get in Touch</h2>
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-green-400">
                      Our Office
                    </h3>
                    <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-300 leading-relaxed">
                      Novel House, Plot 3, Block J,
                      <br />
                      Otunba Jobifele Way,
                      <br />
                      Alausa CDA, Ikeja,
                      <br />
                      Lagos, Nigeria
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-green-400">
                      Email
                    </h3>
                    <a
                      href="mailto:info@1stchoiceproperties.com.ng"
                      className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors inline-block mt-1 sm:mt-2 break-all"
                    >
                      info@1stchoiceproperties.com.ng
                    </a>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-green-400">
                      Phone
                    </h3>
                    <div className="space-y-1 mt-1 sm:mt-2">
                      <a
                        href="tel:08080361789"
                        className="block text-sm sm:text-base text-gray-300 hover:text-white transition-colors"
                      >
                        08080361789
                      </a>
                      <a
                        href="tel:08130992077"
                        className="block text-sm sm:text-base text-gray-300 hover:text-white transition-colors"
                      >
                        08130992077
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="w-full md:w-2/3 p-5 sm:p-6 md:p-8 lg:p-12">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                  Send us a Message
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                  Have questions about our properties or services? Fill out the
                  form below and our team will get back to you as soon as
                  possible.
                </p>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {errorMessage && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                      <p className="text-sm text-red-700">{errorMessage}</p>
                    </div>
                  )}
                  {success && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                      <p className="text-sm text-green-700">Message sent successfully! We&apos;ll get back to you soon.</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full text-sm sm:text-base px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full text-sm sm:text-base px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full text-sm sm:text-base px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full text-sm sm:text-base px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Please provide details about your inquiry..."
                    ></textarea>
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full sm:w-auto bg-green-700 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-md hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium text-sm sm:text-base ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
