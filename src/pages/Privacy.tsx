
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">
              This Privacy Policy describes how your personal information is collected, used, and shared when you visit or use PromptShare.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              When you use our service, we may collect certain information about you, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Personal Information:</strong> Email address, name, phone number, and other details you provide during registration</li>
              <li><strong>Usage Data:</strong> Information about how you use our service, including prompts created, saved, or liked</li>
              <li><strong>Technical Data:</strong> IP address, browser type and version, device information, and other technology identifiers</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Understand user preferences to enhance the user experience</li>
              <li>Develop new products and services</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Information Sharing and Disclosure</h2>
            <p className="mb-4">
              We may share your information in the following situations:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>With Service Providers:</strong> We may share your information with third-party vendors who provide services on our behalf</li>
              <li><strong>For Legal Reasons:</strong> We may disclose information if required by law or in response to valid requests by public authorities</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred as a business asset</li>
              <li><strong>With Your Consent:</strong> We may share your information for other purposes with your consent</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Your Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>The right to access the personal information we hold about you</li>
              <li>The right to request correction of inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Children's Privacy</h2>
            <p className="mb-4">
              Our service is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "last updated" date.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at privacy@promptshare.com.
            </p>

            <p className="mt-8 text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
