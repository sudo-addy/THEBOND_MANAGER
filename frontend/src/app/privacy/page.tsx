'use client';

import { Shield, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Introduction',
      content: `Global Infrastructure Bonds Authority ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Platform.

We comply with applicable data protection laws, including the Information Technology Act, 2000, GDPR where applicable, and industry best practices for financial services.`
    },
    {
      title: '2. Information We Collect',
      content: `We collect the following types of information:

Personal Information:
• Full name, date of birth, and gender
• Contact information (email, phone, address)
• Government-issued identification documents
• PAN card, Aadhaar (as required for KYC)
• Photographs and biometric data for verification

Financial Information:
• Bank account details and payment information
• Investment history and portfolio data
• Income and net worth declarations
• Source of funds documentation

Technical Information:
• IP address and device identifiers
• Browser type and operating system
• Usage data and interaction patterns
• Cookies and tracking technologies`
    },
    {
      title: '3. How We Use Your Information',
      content: `We use your information for the following purposes:

• Account creation and identity verification (KYC/AML)
• Processing transactions and managing investments
• Providing customer support and responding to inquiries
• Sending important account and regulatory notifications
• Improving Platform functionality and user experience
• Detecting and preventing fraud and security threats
• Complying with legal and regulatory requirements
• Marketing communications (with your consent)
• AI-powered investment recommendations and insights`
    },
    {
      title: '4. Information Sharing',
      content: `We may share your information with:

Service Providers:
• Payment processors and banking partners
• KYC/AML verification services
• Cloud hosting and infrastructure providers
• Analytics and monitoring services

Regulatory Authorities:
• SEBI, RBI, and other financial regulators
• Tax authorities as required by law
• Law enforcement agencies with valid legal process

Business Transfers:
• In connection with mergers, acquisitions, or asset sales

We never sell your personal information to third parties for marketing purposes.`
    },
    {
      title: '5. Data Security',
      content: `We implement robust security measures to protect your information:

• End-to-end encryption for data in transit and at rest
• Multi-factor authentication for account access
• Regular security audits and penetration testing
• ISO 27001 certified data centers
• Role-based access controls for employees
• Real-time fraud detection and monitoring
• Secure backup and disaster recovery systems

While we strive to protect your information, no method of transmission over the Internet is 100% secure.`
    },
    {
      title: '6. Data Retention',
      content: `We retain your information for as long as necessary to:

• Maintain your account and provide services
• Comply with legal and regulatory requirements
• Resolve disputes and enforce agreements
• Support business operations and analytics

Financial records are retained for a minimum of 8 years as required by Indian regulations. After the retention period, data is securely deleted or anonymized.`
    },
    {
      title: '7. Your Rights',
      content: `You have the following rights regarding your personal data:

• Access: Request a copy of your personal information
• Correction: Update or correct inaccurate data
• Deletion: Request deletion of your data (subject to legal requirements)
• Portability: Receive your data in a machine-readable format
• Objection: Object to certain processing activities
• Withdrawal: Withdraw consent for optional processing

To exercise these rights, contact our Data Protection Officer at privacy@bondplatform.gov.`
    },
    {
      title: '8. Cookies and Tracking',
      content: `We use cookies and similar technologies for:

Essential Cookies:
• Authentication and session management
• Security and fraud prevention

Functional Cookies:
• Remembering preferences and settings
• Personalized user experience

Analytics Cookies:
• Understanding usage patterns
• Improving Platform performance

You can manage cookie preferences through your browser settings. Disabling certain cookies may affect Platform functionality.`
    },
    {
      title: '9. Third-Party Links',
      content: `Our Platform may contain links to third-party websites and services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.`
    },
    {
      title: '10. Children\'s Privacy',
      content: `Our Platform is not intended for individuals under 18 years of age. We do not knowingly collect personal information from minors. If we become aware that a minor has provided personal information, we will take steps to delete such information.`
    },
    {
      title: '11. International Data Transfers',
      content: `Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for international transfers, including standard contractual clauses and adequacy decisions.`
    },
    {
      title: '12. Changes to This Policy',
      content: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Material changes will be communicated via email or Platform notification. Continued use of the Platform after changes constitutes acceptance of the updated policy.`
    },
    {
      title: '13. Contact Us',
      content: `For privacy-related inquiries or to exercise your rights:

Data Protection Officer
Email: privacy@bondplatform.gov
Phone: +1-800-BONDS-01
Address: Federal Building, Suite 100, Mumbai, Maharashtra 400001

For complaints, you may also contact the relevant data protection authority in your jurisdiction.`
    }
  ];

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-200">
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-300">Privacy Policy</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
              <p className="text-slate-500">Last updated: January 2026</p>
            </div>
          </div>
          <p className="text-slate-400">
            Your privacy is important to us. This policy explains how we handle your personal information.
          </p>
        </div>

        {/* Quick Summary */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-purple-400 mb-2">Quick Summary</h3>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• We collect information necessary to provide our services and comply with regulations</li>
            <li>• Your data is protected with enterprise-grade security measures</li>
            <li>• We never sell your personal information to third parties</li>
            <li>• You have rights to access, correct, and delete your data</li>
          </ul>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i} className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
              <div className="text-slate-400 whitespace-pre-line leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <div className="flex gap-4 justify-center">
            <Link href="/terms" className="text-blue-400 hover:text-white transition">Terms of Service</Link>
            <span className="text-slate-700">|</span>
            <Link href="/disclaimer" className="text-blue-400 hover:text-white transition">Risk Disclosure</Link>
            <span className="text-slate-700">|</span>
            <Link href="/contact" className="text-blue-400 hover:text-white transition">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
