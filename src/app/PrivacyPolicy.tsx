import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { setPageMeta } from "./seo";

export default function PrivacyPolicy() {
  useEffect(() => {
    setPageMeta({
      title: "Privacy Policy — EdBuddies",
      description: "How EdBuddies collects, uses and protects your data on edbuddies.ai.",
      url: "https://edbuddies.ai/privacy",
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content">
      <section className="pt-36 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#09244B] mb-3">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-10">Last updated: 31 August 2026</p>

          <div className="prose prose-sm max-w-none text-gray-600 space-y-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#09244B] [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:leading-relaxed [&_li]:leading-relaxed">
            <p>
              This Privacy Policy explains how EdBuddies ("EdBuddies", "we", "us") collects, uses and
              protects information when you visit edbuddies.ai (the "Site"). It covers the website only —
              use of the EdBuddies mobile app is governed by the in-app privacy terms shown during
              onboarding.
            </p>

            <div>
              <h2>Information we collect</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Information you give us:</strong> your name, email, phone number, centre name and message when you submit our contact form or enquiry form.</li>
                <li><strong>Usage information:</strong> pages visited, buttons clicked, device and browser type, and approximate location (country/city level), collected automatically via analytics cookies.</li>
                <li><strong>Advertising identifiers:</strong> if you consent to marketing cookies, information used to measure and personalise ads, such as a browser or device identifier.</li>
              </ul>
            </div>

            <div>
              <h2>How we use it</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>To respond to enquiries submitted through our contact or enquiry forms.</li>
                <li>To understand how visitors use the Site and improve it (analytics).</li>
                <li>To measure and, where you've consented, personalise the ads we run (marketing).</li>
                <li>To meet legal and security obligations.</li>
              </ul>
            </div>

            <div>
              <h2>Cookies and consent</h2>
              <p>
                We use three categories of cookies: <strong>essential</strong> (required for the Site to work,
                always on), <strong>analytics</strong> (Google Analytics, via Google Tag Manager) and{" "}
                <strong>marketing</strong> (advertising measurement, e.g. Meta Pixel). Analytics and marketing
                cookies only load with your consent, given through the cookie banner shown on your first
                visit. You can change your choice at any time by clearing your browser's local storage for
                this Site and reloading the page.
              </p>
            </div>

            <div>
              <h2>Third parties we share data with</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Google</strong> (Google Analytics, Google Tag Manager) — analytics, only with consent.</li>
                <li><strong>Meta</strong> (Meta Pixel) — advertising measurement, only with consent.</li>
                <li><strong>Web3Forms</strong> — processes contact form submissions and emails them to our team.</li>
                <li><strong>Tally</strong> — hosts our enquiry form when you click "Enquire Now"; Tally's own privacy policy applies to information you submit there.</li>
              </ul>
              <p>We do not sell your personal data.</p>
            </div>

            <div>
              <h2>Data retention</h2>
              <p>
                We keep contact-form and enquiry submissions for as long as needed to respond to you and
                maintain our business records, and delete them on request (see "Your rights" below).
              </p>
            </div>

            <div>
              <h2>Your rights</h2>
              <p>
                Depending on where you're located, you may have the right to access, correct or request
                deletion of your personal data. To make a request, email us at{" "}
                <a href="mailto:marketing@edbuddies.ai" className="text-[#09244B] underline">marketing@edbuddies.ai</a>.
              </p>
            </div>

            <div>
              <h2>Changes to this policy</h2>
              <p>We may update this policy from time to time. Material changes will be reflected by updating the "Last updated" date above.</p>
            </div>

            <div>
              <h2>Contact us</h2>
              <p>
                Questions about this policy? Email{" "}
                <a href="mailto:marketing@edbuddies.ai" className="text-[#09244B] underline">marketing@edbuddies.ai</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
