"use client";
import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="prose max-w-none text-gray-700">
        <p className="mb-6 text-sm sm:text-base leading-relaxed">
          We are committed to ensuring that your privacy is protected. Below,
          we&apos;ve outlined the procedures we have in place to safeguard your
          privacy, ways we use the information we collect as well as ways to
          limit the use of this information according to your preferences.
        </p>

        {/* Disclaimer Section */}
        <section className="mb-10 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            1. Disclaimer
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              <strong>1.1</strong> Whilst reasonable care is taken to ensure
              that the information contained on this Website is accurate, we
              cannot guarantee its accuracy.
            </p>

            <p>
              <strong>1.2</strong> 1st choice Properties provides this Website
              on an &quot;as is&quot; and &quot;as available&quot; basis and
              makes no representations or warranties of any kind (express or
              implied) with respect to this Website or the Website Content
              (including, but not limited to any pictures of properties, text,
              graphics, advertisements, files, links, financial calculators,
              general property information or other items) and disclaims all
              such representations and warranties.
            </p>

            <p>
              <strong>1.3</strong> In addition, we make no representation nor
              give any warranty, undertaking or term (either express or implied)
              as to the condition, quality, performance, accuracy, suitability,
              fitness for purpose, completeness, or freedom from viruses,
              Trojans, bombs, time-locks or any other data code or harmful
              mechanisms (which has the ability to corrupt or affect the
              operation of the Website or our systems) of the Website Content.
            </p>

            <p>
              <strong>1.4</strong> We make no representation nor give any
              warranty that the Website Content will be accurate, up to date,
              uninterrupted or error free.
            </p>

            <p>
              <strong>1.5</strong> 1st choice Properties cannot be held liable
              for any inaccurate information published on the Website save where
              such liability arises from the gross negligence or wilful
              misconduct of 1st choice Properties.
            </p>

            <p>
              <strong>1.6</strong> 1st choice Properties shall not be liable for
              any direct, indirect, incidental, special or consequential loss or
              damages which might arise from your use of, or reliance upon, the
              Website or the Website Content; or your inability to use the
              Website or the Website Content, and/or unlawful activity on the
              Website and/or linked third party websites.
            </p>

            <p>
              <strong>1.7</strong> YOU HEREBY INDEMNIFY 1ST CHOICE PROPERTIES
              AGAINST ANY LOSS, CLAIM OR DAMAGE WHICH MAY BE SUFFERED BY
              YOURSELF OR ANY THIRD PARTY ARISING IN ANY WAY FROM YOUR USE OF
              THIS WEBSITE, WEBSITE CONTENT AND/OR ANY LINKED THIRD PARTY
              WEBSITE.
            </p>

            <p>
              <strong>1.8</strong> Nothing on this Website shall be regarded or
              taken as financial or investment advice. The information contained
              on this Website may not be relied upon in connection with any
              investment decision you may make.
            </p>

            <p>
              <strong>1.9</strong> Please contact us to report any possible
              malfunctions or errors by way of email to
              <Link
                href="mailto:info@1stchoiceproperties.com"
                className="text-blue-600 hover:underline pl-2 break-words"
              >
                info@1stchoiceproperties.com
              </Link>
            </p>
          </div>
        </section>

        {/* Indemnity Section */}
        <section className="mb-10 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            2. Indemnity
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              <strong>2.1</strong> YOU ACKNOWLEDGE THAT YOU ARE SOLELY
              RESPONSIBLE FOR THE USE TO WHICH YOU PUT THIS WEBSITE AND ALL THE
              RESULTS AND INFORMATION YOU OBTAIN FROM IT AND THAT ALL
              WARRANTIES, CONDITIONS, UNDERTAKINGS, REPRESENTATIONS AND TERMS
              WHETHER EXPRESSED OR IMPLIED, STATUTORY OR OTHERWISE ARE HEREBY
              EXCLUDED BY 1ST CHOICE PROPERTIES TO THE FULLEST EXTENT PERMITTED
              BY LAW.
            </p>

            <p>
              <strong>2.2</strong> Save in respect of liability for death or
              personal injury arising out of negligence or for fraudulent
              misrepresentation, we and all contributors to this Website hereby
              disclaim to the fullest extent permitted by law all liability for
              any loss or damage including any consequential or indirect loss or
              damage incurred by you, whether arising in tort, contract or
              otherwise, and arising out of or in relation to or in connection
              with your access to or use of or inability to use this Website.
            </p>
          </div>
        </section>

        <p className="text-sm sm:text-base leading-relaxed">
          Whether you&apos;re looking for property to buy, rent or want to sell
          your current home, 1st choice properties ensures any information
          collected will be used according to our guidelines and your
          preferences.
        </p>
      </div>
    </div>
  );
}
