"use client";

import { useRouter } from "next/navigation";
import { AlertCircle, Mail, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function DeleteAccountPage() {
  const router = useRouter();
  const email = "info@1stchoiceproperties.com.ng";

  const handleEmailClick = () => {
    const subject = encodeURIComponent("Account Deletion Request");
    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 pt-5">
      {/* Background Decorations */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div
        className="absolute bottom-20 right-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 py-12 px-4 mt-8"
      >
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </motion.button>

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-1 bg-gradient-to-r from-transparent to-red-500" />
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <div className="w-12 h-1 bg-gradient-to-l from-transparent to-red-500" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Delete Account
            </h1>
            <p className="text-gray-600 text-lg">Permanent account removal</p>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 mb-8"
          >
            {/* Warning Header */}
            <div className="bg-gradient-to-br from-red-600 to-orange-600 p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Important Notice
                  </h2>
                  <p className="text-red-100">
                    Account deletion is permanent and cannot be undone. All your
                    data will be removed within 90 days.
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="space-y-6">
                {/* Deletion Process */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-orange-50 rounded-2xl p-6 border border-orange-200"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    How to Delete Your Account
                  </h3>
                  <ol className="space-y-3 list-decimal list-inside">
                    <li className="text-gray-700">
                      Send an email to{" "}
                      <span className="font-semibold text-orange-600">
                        {email}
                      </span>
                    </li>
                    <li className="text-gray-700">
                      Include your account information (full name, email, and
                      username)
                    </li>
                    <li className="text-gray-700">
                      Your account will be permanently deleted within{" "}
                      <span className="font-semibold">90 days</span>
                    </li>
                  </ol>
                </motion.div>

                {/* What Gets Deleted */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-red-50 rounded-2xl p-6 border border-red-200"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    What Gets Deleted
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-red-600 font-bold mt-0.5">✓</span>
                      <span>Your profile and personal information</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-red-600 font-bold mt-0.5">✓</span>
                      <span>All bookings and transaction history</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-red-600 font-bold mt-0.5">✓</span>
                      <span>Saved favorites and preferences</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-red-600 font-bold mt-0.5">✓</span>
                      <span>All associated data in our system</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Email Section */}
                {/* <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    Send Deletion Request To:
                  </h3>
                  <div className="bg-white rounded-xl p-4 border border-gray-300 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <span className="font-mono font-semibold text-gray-800">
                        {email}
                      </span>
                    </div>
                  </div>
                </motion.div> */}
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEmailClick}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl hover:from-red-700 hover:to-orange-700 transition-all font-semibold shadow-lg hover:shadow-xl"
            >
              <Mail className="w-5 h-5" />
              <span>Send Deletion Request</span>
            </motion.button>
          </motion.div>

          {/* Info Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-200"
          >
            <p className="text-sm text-gray-600 text-center">
              <span className="font-semibold">Note:</span> After submitting your
              deletion request, please allow up to 90 days for complete data
              removal. You will receive a confirmation email once the process is
              initiated.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
