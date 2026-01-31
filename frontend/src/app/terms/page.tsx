'use client';

import { FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing and using the Global Infrastructure Bonds Platform ("Platform"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not use the Platform.

These Terms constitute a legally binding agreement between you and Global Infrastructure Bonds Authority ("we," "us," or "our") governing your use of the Platform, including all features, services, and content offered.`
    },
    {
      title: '2. Eligibility',
      content: `To use the Platform, you must:
• Be at least 18 years of age or the legal age of majority in your jurisdiction
• Have the legal capacity to enter into binding contracts
• Complete the Know Your Customer (KYC) verification process
• Not be prohibited from using the Platform under applicable laws
• Not be located in a jurisdiction where use of the Platform is prohibited

Institutional investors must provide additional documentation as required by regulatory bodies.`
    },
    {
      title: '3. Account Registration and Security',
      content: `You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to:
• Provide accurate and complete registration information
• Update your information promptly if it changes
• Immediately notify us of any unauthorized access to your account
• Use strong passwords and enable two-factor authentication
• Not share your account with any third party

We reserve the right to suspend or terminate accounts that violate these Terms.`
    },
    {
      title: '4. Investment Risks',
      content: `All investments carry inherent risks. By using the Platform, you acknowledge that:
• Past performance does not guarantee future results
• Bond prices may fluctuate based on market conditions
• You may lose some or all of your invested capital
• Infrastructure projects may face delays or failures
• Liquidity may be limited for certain bond tokens

We strongly recommend consulting with a qualified financial advisor before making investment decisions.`
    },
    {
      title: '5. Tokenized Securities',
      content: `Bond tokens on our Platform represent fractional ownership in underlying bond securities. You understand that:
• Tokens are subject to regulatory requirements in your jurisdiction
• Blockchain transactions are irreversible once confirmed
• Smart contract risks may affect token functionality
• Token prices may differ from underlying bond values
• Transfer restrictions may apply based on regulatory requirements`
    },
    {
      title: '6. Fees and Payments',
      content: `The Platform charges fees for various services, including:
• Transaction fees for buying and selling bond tokens
• Custody fees for holding assets on the Platform
• Withdrawal fees for transferring funds
• Premium subscription fees for advanced features

All fees are disclosed before transactions are executed. We reserve the right to modify fee structures with prior notice.`
    },
    {
      title: '7. Compliance and Regulatory',
      content: `We operate in compliance with applicable securities laws and regulations, including:
• Securities and Exchange Board of India (SEBI) regulations
• Reserve Bank of India (RBI) guidelines
• Anti-Money Laundering (AML) requirements
• Prevention of Money Laundering Act (PMLA)
• International sanctions compliance

You agree to comply with all applicable laws in your use of the Platform.`
    },
    {
      title: '8. Intellectual Property',
      content: `All content, features, and functionality of the Platform are owned by us and protected by intellectual property laws. You may not:
• Copy, modify, or distribute Platform content without permission
• Use our trademarks or branding without authorization
• Reverse engineer or decompile Platform software
• Create derivative works based on Platform features`
    },
    {
      title: '9. Limitation of Liability',
      content: `To the maximum extent permitted by law, we shall not be liable for:
• Any indirect, incidental, or consequential damages
• Loss of profits, data, or business opportunities
• Market losses or investment performance
• Third-party actions or service disruptions
• Force majeure events beyond our control

Our total liability shall not exceed the fees paid by you in the preceding 12 months.`
    },
    {
      title: '10. Modifications to Terms',
      content: `We reserve the right to modify these Terms at any time. Changes will be effective upon posting to the Platform. Continued use after changes constitutes acceptance of modified Terms. Material changes will be communicated via email or Platform notification.`
    },
    {
      title: '11. Governing Law',
      content: `These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra.`
    },
    {
      title: '12. Contact Information',
      content: `For questions about these Terms, please contact:
• Email: legal@bondplatform.gov
• Phone: +1-800-BONDS-01
• Address: Federal Building, Suite 100, Mumbai, Maharashtra 400001`
    }
  ];

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-200">
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-300">Terms of Service</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
              <p className="text-slate-500">Last updated: January 2026</p>
            </div>
          </div>
          <p className="text-slate-400">
            Please read these terms carefully before using the Global Infrastructure Bonds Platform.
          </p>
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
          <p className="text-slate-500 mb-4">
            By using our Platform, you agree to these Terms of Service.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/privacy" className="text-blue-400 hover:text-white transition">Privacy Policy</Link>
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
