import Link from 'next/link';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold font-headline text-primary mb-4 border-b border-border pb-2">{title}</h2>
    <div className="space-y-4 text-foreground/80">{children}</div>
  </section>
);

const SubSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-4">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="space-y-2 text-foreground/70">{children}</div>
  </div>
);

export default function PrivacyAndTermsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">Privacy Policy & Terms of Use</h1>
          <p className="text-foreground/60 mt-2">Rich Pimp Poor Pimp</p>
          <p className="text-sm text-foreground/50 mt-1">Last Updated: January 1, 2026</p>
          <Link href="/" className="text-primary hover:underline mt-6 inline-block">
            &larr; Back to App
          </Link>
        </header>

        <main>
          <Section title="PRIVACY POLICY">
            <SubSection title="1. Information We Collect">
              <p><strong>Information You Provide:</strong></p>
              <ul className="list-disc list-inside ml-4">
                <li>Questions you submit to our AI advisors</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>Email address (if provided for receipts)</li>
              </ul>
              <p><strong>Automatically Collected Information:</strong></p>
              <ul className="list-disc list-inside ml-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Usage data and timestamps</li>
              </ul>
            </SubSection>
            <SubSection title="2. How We Use Your Information">
              <p>We use your information to:</p>
              <ul className="list-disc list-inside ml-4">
                <li>Process your paid questions and deliver AI-generated responses</li>
                <li>Process payments through our payment processor (Stripe)</li>
                <li>Improve our service quality and AI responses</li>
                <li>Prevent fraud and abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </SubSection>
            <SubSection title="3. Data Sharing">
              <p><strong>We do NOT sell your personal information.</strong></p>
              <p>We share data only with:</p>
              <ul className="list-disc list-inside ml-4">
                <li><strong>Stripe:</strong> For payment processing (subject to Stripe's Privacy Policy)</li>
                <li><strong>Anthropic:</strong> Your questions are sent to Anthropic's AI API for response generation (subject to Anthropic's Privacy Policy)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>
            </SubSection>
            <SubSection title="4. AI Processing">
              <p>Your questions are processed by third-party AI services (Anthropic Claude). While we don't store conversation history, your questions are transmitted to these services for processing. Please refer to Anthropic's privacy policy for their data handling practices.</p>
            </SubSection>
            <SubSection title="5. Data Retention">
              <ul className="list-disc list-inside ml-4">
                <li>Questions and responses are not stored after delivery</li>
                <li>Payment records are retained as required by law (typically 7 years)</li>
                <li>We may retain anonymized analytics data indefinitely</li>
              </ul>
            </SubSection>
            <SubSection title="6. Your Rights">
              <p>Depending on your location, you may have rights to:</p>
              <ul className="list-disc list-inside ml-4">
                <li>Access your personal data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of certain data processing</li>
                <li>File a complaint with a data protection authority</li>
              </ul>
            </SubSection>
            <SubSection title="7. Security">
              <p>We implement industry-standard security measures to protect your data. However, no internet transmission is 100% secure. You use our service at your own risk.</p>
            </SubSection>
            <SubSection title="8. Cookies">
              <p>We use essential cookies for site functionality. We do not use tracking or advertising cookies.</p>
            </SubSection>
            <SubSection title="9. Children's Privacy">
              <p>Our service is not intended for users under 18. We do not knowingly collect information from minors.</p>
            </SubSection>
            <SubSection title="10. Changes to Privacy Policy">
              <p>We may update this policy. Continued use after changes constitutes acceptance of the updated policy.</p>
            </SubSection>
            <SubSection title="11. Contact">
              <p>For privacy concerns, contact us at: <a href="mailto:answers@richpimppoorpimp.com" className="text-primary hover:underline">answers@richpimppoorpimp.com</a></p>
            </SubSection>
          </Section>

          <Section title="TERMS OF USE">
            <SubSection title="1. Acceptance of Terms">
              <p>By using Rich Pimp Poor Pimp ("the Service"), you agree to these Terms of Use. If you don't agree, don't use the Service.</p>
            </SubSection>
            <SubSection title="2. Description of Service">
              <p>Rich Pimp Poor Pimp is an <strong>entertainment and informational service</strong> that provides AI-generated lifestyle advice from two distinct perspectives:</p>
              <ul className="list-disc list-inside ml-4">
                <li>"Rich Pimp" - luxury and premium-focused advice</li>
                <li>"Poor Pimp" - budget-conscious and value-focused advice</li>
              </ul>
            </SubSection>
            <SubSection title="3. Age Requirement">
                <p>You must be at least 18 years old to use this Service.</p>
            </SubSection>
            <SubSection title="4. Pricing and Payment">
                <ul className="list-disc list-inside ml-4">
                    <li>Each question costs $1.00 USD</li>
                    <li>Payment is processed immediately through Stripe</li>
                    <li>All sales are final - <strong>NO REFUNDS</strong></li>
                    <li>You receive one AI-generated response per payment</li>
                    <li>Pricing may change with notice</li>
                </ul>
            </SubSection>
            <SubSection title="5. No Professional Advice">
                <p className="font-bold text-destructive">IMPORTANT DISCLAIMER:</p>
                <p>The Service provides <strong>ENTERTAINMENT AND INFORMATIONAL CONTENT ONLY</strong>. Our AI-generated responses are NOT:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Professional financial advice</li>
                    <li>Legal advice</li>
                    <li>Medical advice</li>
                    <li>Professional counseling</li>
                    <li>Investment recommendations</li>
                    <li>Tax advice</li>
                </ul>
                <p><strong>Do not rely on our responses for important life decisions.</strong> Always consult qualified professionals for financial, legal, medical, or other professional matters.</p>
            </SubSection>
            <SubSection title="6. AI-Generated Content">
                <p>All responses are generated by artificial intelligence (Anthropic Claude). The AI:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>May provide inaccurate information</li>
                    <li>May generate biased or inappropriate content</li>
                    <li>Does not have real-time knowledge</li>
                    <li>Cannot verify facts or sources</li>
                    <li>Should not be considered authoritative</li>
                </ul>
                <p><strong>You use AI responses at your own risk.</strong></p>
            </SubSection>
            <SubSection title="7. Acceptable Use">
                <p>You agree NOT to:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Use the Service for illegal purposes</li>
                    <li>Submit questions designed to generate harmful, illegal, or dangerous content</li>
                    <li>Attempt to manipulate or jailbreak the AI</li>
                    <li>Use the Service to harass, threaten, or harm others</li>
                    <li>Violate any applicable laws</li>
                    <li>Attempt to reverse-engineer or scrape the Service</li>
                    <li>Use automated tools to submit questions</li>
                    <li>Resell or redistribute AI responses commercially</li>
                </ul>
            </SubSection>
            <SubSection title="8. Content Ownership">
                <ul className="list-disc list-inside ml-4">
                    <li>You own the questions you submit</li>
                    <li>We own the Service, website, and branding</li>
                    <li>AI responses are provided "as-is" for your personal use</li>
                    <li>You may not claim ownership of AI-generated responses</li>
                    <li>You may not commercially exploit responses without permission</li>
                </ul>
            </SubSection>
            <SubSection title="9. Intellectual Property">
                <p>"Rich Pimp Poor Pimp" branding, logos, and website design are our intellectual property. Unauthorized use is prohibited.</p>
            </SubSection>
            <SubSection title="10. No Warranties">
                <p>The Service is provided <strong>"AS IS"</strong> without warranties of any kind, including:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Accuracy of information</li>
                    <li>Fitness for a particular purpose</li>
                    <li>Uninterrupted service</li>
                    <li>Error-free operation</li>
                </ul>
            </SubSection>
            <SubSection title="11. Limitation of Liability">
                <p><strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong></p>
                <p>We are NOT liable for:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Any damages arising from use of the Service</li>
                    <li>Lost profits or data</li>
                    <li>Decisions made based on AI responses</li>
                    <li>Service interruptions or errors</li>
                    <li>Third-party actions (including Stripe or Anthropic)</li>
                </ul>
                <p><strong>Your maximum recovery is limited to the amount you paid ($1.00 per question).</strong></p>
            </SubSection>
            <SubSection title="12. Indemnification">
                <p>You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Your use of the Service</li>
                    <li>Your violation of these Terms</li>
                    <li>Your violation of any law or third-party rights</li>
                </ul>
            </SubSection>
            <SubSection title="13. No Refund Policy">
                <p><strong>ALL SALES ARE FINAL.</strong> Because you receive instant digital delivery of AI-generated content, we do not offer refunds for any reason, including:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Dissatisfaction with responses</li>
                    <li>Technical issues on your end</li>
                    <li>Change of mind</li>
                    <li>Duplicate purchases</li>
                </ul>
            </SubSection>
            <SubSection title="14. Service Modifications">
                <p>We reserve the right to:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Modify or discontinue the Service at any time</li>
                    <li>Change pricing with reasonable notice</li>
                    <li>Update these Terms (continued use = acceptance)</li>
                    <li>Refuse service to anyone for any reason</li>
                </ul>
            </SubSection>
            <SubSection title="15. Termination">
                <p>We may terminate your access immediately if you:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Violate these Terms</li>
                    <li>Engage in fraudulent activity</li>
                    <li>Abuse the Service</li>
                </ul>
            </SubSection>
            <SubSection title="16. Third-Party Services">
                <p>Our Service uses:</p>
                <ul className="list-disc list-inside ml-4">
                    <li><strong>Stripe</strong> for payment processing (subject to Stripe's Terms)</li>
                    <li><strong>Anthropic</strong> for AI processing (subject to Anthropic's Terms)</li>
                    <li><strong>Vercel</strong> for hosting (subject to Vercel's Terms)</li>
                </ul>
                <p>We're not responsible for third-party service issues.</p>
            </SubSection>
            <SubSection title="17. Governing Law">
                <p>These Terms are governed by the laws of [Your State/Country], without regard to conflict of law principles.</p>
            </SubSection>
            <SubSection title="18. Dispute Resolution">
                <p><strong>Arbitration Agreement:</strong> Any disputes will be resolved through binding arbitration rather than court, except:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Small claims court matters</li>
                    <li>Intellectual property disputes</li>
                </ul>
                <p>You waive the right to a jury trial or class action.</p>
            </SubSection>
            <SubSection title="19. Severability">
                <p>If any provision is found unenforceable, the remaining provisions remain in effect.</p>
            </SubSection>
            <SubSection title="20. Entire Agreement">
                <p>These Terms constitute the entire agreement between you and Rich Pimp Poor Pimp regarding the Service.</p>
            </SubSection>
            <SubSection title="21. Contact Information">
                <p>For questions about these Terms:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Email: <a href="mailto:answers@richpimppoorpimp.com" className="text-primary hover:underline">answers@richpimppoorpimp.com</a></li>
                    <li>Website: <a href="https://richpimppoorpimp.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">richpimppoorpimp.com</a></li>
                </ul>
            </SubSection>
            <SubSection title="22. Acknowledgment">
                <p>By clicking "Pay & Ask" or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our Privacy Policy.</p>
            </SubSection>
          </Section>
        </main>
        <footer className="text-center mt-12 py-6 border-t border-border">
            <p>Rich Pimp Poor Pimp is a service of IncDrops</p>
            <p>© 2026 Rich Pimp Poor Pimp. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

    