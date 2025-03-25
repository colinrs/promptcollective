
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing or using PromptShare, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Description of Service</h2>
            <p className="mb-4">
              PromptShare provides a platform for users to create, share, and discover prompts for AI assistants. We reserve the right to modify or discontinue the service at any time without notice.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
            <p className="mb-4">
              To use certain features of the service, you must register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. User Content</h2>
            <p className="mb-4">
              Users may post content such as prompts, comments, and other materials. You retain ownership of your content, but grant PromptShare a worldwide, non-exclusive license to use, reproduce, and display your content in connection with the service.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Prohibited Conduct</h2>
            <p className="mb-4">
              You agree not to engage in any of the following:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Posting harmful, offensive, or illegal content</li>
              <li>Impersonating others or misrepresenting your affiliation</li>
              <li>Using the service for any illegal purpose</li>
              <li>Attempting to interfere with the proper functioning of the service</li>
              <li>Collecting user information without consent</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>
            <p className="mb-4">
              The service and its original content, features, and functionality are owned by PromptShare and are protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Termination</h2>
            <p className="mb-4">
              We may terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users of the service or third parties.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Disclaimer of Warranties</h2>
            <p className="mb-4">
              The service is provided "as is" without warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall PromptShare be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">10. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. We will provide notice of significant changes by posting the new terms on the service and updating the "last updated" date.
            </p>

            <p className="mt-8 text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
