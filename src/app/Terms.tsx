import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { setPageMeta } from "./seo";

export default function Terms() {
  useEffect(() => {
    setPageMeta({
      title: "Terms of Service — EdBuddies",
      description: "Terms governing your use of the EdBuddies website, edbuddies.ai.",
      url: "https://edbuddies.ai/terms",
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content">
      <section className="pt-36 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#09244B] mb-3">Terms of Service</h1>
          <p className="text-sm text-gray-400 mb-10">Last updated: 31 August 2026</p>

          <div className="prose prose-sm max-w-none text-gray-600 space-y-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#09244B] [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:leading-relaxed [&_li]:leading-relaxed">
            <p>
              These Terms of Service ("Terms") govern your use of edbuddies.ai (the "Site"). By using the
              Site, you agree to these Terms. This page covers the marketing website only — use of the
              EdBuddies mobile app is governed by separate terms shown during onboarding.
            </p>

            <div>
              <h2>Use of the Site</h2>
              <p>
                You may browse the Site and submit enquiries for lawful purposes only. You agree not to
                misuse the Site — for example, by attempting to disrupt it, scrape it at scale, or submit
                fraudulent or abusive form entries.
              </p>
            </div>

            <div>
              <h2>Intellectual property</h2>
              <p>
                All content on the Site — including the EdBuddies name, logo, text, graphics and screenshots
                — belongs to EdBuddies or its licensors and may not be copied or reused without permission.
              </p>
            </div>

            <div>
              <h2>Product information</h2>
              <p>
                We aim to keep information about EdBuddies accurate and up to date, but features, pricing
                and availability may change. Pricing is confirmed directly with our team and is not
                published on this Site.
              </p>
            </div>

            <div>
              <h2>No warranty</h2>
              <p>
                The Site is provided "as is" without warranties of any kind, to the fullest extent permitted
                by law. We do not guarantee the Site will be uninterrupted or error-free.
              </p>
            </div>

            <div>
              <h2>Limitation of liability</h2>
              <p>
                To the fullest extent permitted by law, EdBuddies is not liable for any indirect, incidental
                or consequential loss arising from your use of the Site.
              </p>
            </div>

            <div>
              <h2>Governing law</h2>
              <p>These Terms are governed by the laws of Malaysia, without regard to conflict-of-law principles.</p>
            </div>

            <div>
              <h2>Changes to these Terms</h2>
              <p>We may update these Terms from time to time. Continued use of the Site after changes means you accept the updated Terms.</p>
            </div>

            <div>
              <h2>Contact us</h2>
              <p>
                Questions about these Terms? Email{" "}
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
