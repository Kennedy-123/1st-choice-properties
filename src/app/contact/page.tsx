"use client"
import React, { FormEvent, useRef } from "react";
import { useContactForm } from "@/hooks/useContact";
import { motion } from "framer-motion";
import { Mail, Phone, Send, Building } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const formVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
};

const inputVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  }
};

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
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-10">
      {/* Background Decorations */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      
      <motion.div 
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16 sm:py-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent to-green-500" />
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <div className="w-12 h-1 bg-gradient-to-l from-transparent to-green-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto px-4">
            Have questions about our properties? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div 
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Contact Information */}
              <div className="w-full lg:w-1/3 bg-gradient-to-br from-green-600 to-emerald-600 text-white p-8 sm:p-10 lg:p-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl sm:text-3xl font-bold mb-8">Contact Information</h2>
                  <div className="space-y-8">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                          <Building className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Our Office</h3>
                          <p className="text-green-50 leading-relaxed">
                            Novel House, Plot 3, Block J,<br />
                            Otunba Jobifele Way,<br />
                            Alausa CDA, Ikeja,<br />
                            Lagos, Nigeria
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                          <Mail className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Email</h3>
                          <a
                            href="mailto:info@1stchoiceproperties.com.ng"
                            className="text-green-50 hover:text-white transition-colors inline-block"
                          >
                            info@1stchoiceproperties.com.ng
                          </a>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                          <Phone className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Phone</h3>
                          <div className="space-y-2">
                            <a
                              href="tel:08080361789"
                              className="block text-green-50 hover:text-white transition-colors"
                            >
                              08080361789
                            </a>
                            <a
                              href="tel:08130992077"
                              className="block text-green-50 hover:text-white transition-colors"
                            >
                              08130992077
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Contact Form */}
              <div className="w-full lg:w-2/3 p-8 sm:p-10 lg:p-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Fill out the form below and our team will get back to you as soon as possible.
                  </p>

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    {errorMessage && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2"
                      >
                        <span>⚠</span>
                        <p className="text-sm">{errorMessage}</p>
                      </motion.div>
                    )}
                    {success && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2"
                      >
                        <span>✓</span>
                        <p className="text-sm">Message sent successfully! We&apos;ll get back to you soon.</p>
                      </motion.div>
                    )}
                    
                    <motion.div 
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.7 }}
                      className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                    >
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full px-4 py-3 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-300"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-300"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.8 }}>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-3 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-300"
                        placeholder="How can we help you?"
                      />
                    </motion.div>

                    <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.9 }}>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="w-full px-4 py-3 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-300 resize-none"
                        placeholder="Please provide details about your inquiry..."
                      ></textarea>
                    </motion.div>

                    <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 1.0 }}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </form>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
