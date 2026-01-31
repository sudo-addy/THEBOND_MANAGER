'use client';

import { AlertTriangle, ChevronRight, ShieldAlert, TrendingDown, Clock, Scale } from 'lucide-react';
import Link from 'next/link';

export default function DisclaimerPage() {
  const riskCategories = [
    {
      icon: TrendingDown,
      title: 'Market Risk',
      risks: [
        'Bond prices may fluctuate based on interest rate changes',
        'Market conditions can affect bond valuations',
        'Economic factors may impact infrastructure project performance',
        'Currency fluctuations may affect returns for international investors',
        'Liquidity risk may affect ability to sell tokens quickly'
      ]
    },
    {
      icon: ShieldAlert,
      title: 'Investment Risk',
      risks: [
        'Past performance does not guarantee future results',
        'You may lose some or all of your invested capital',
        'Returns are not guaranteed and may vary',
        'Dividend/coupon payments depend on project performance',
        'Infrastructure projects may face delays or cost overruns'
      ]
    },
    {
      icon: Clock,
      title: 'Operational Risk',
      risks: [
        'Technology failures may temporarily affect Platform access',
        'Smart contract vulnerabilities could impact token security',
        'Blockchain network congestion may delay transactions',
        'Third-party service disruptions may affect operations',
        'Cybersecurity threats pose risks to digital assets'
      ]
    },
    {
      icon: Scale,
      title: 'Regulatory Risk',
      risks: [
        'Regulatory changes may affect token trading or ownership',
        'Tax treatment of tokenized securities may change',
        'Cross-border regulations may restrict certain investors',
        'Compliance requirements may evolve over time',
        'Government policies may impact infrastructure projects'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-200">
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[50%] w-[800px] h-[800px] bg-amber-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-300">Risk Disclosure</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <AlertTriangle className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Risk Disclosure Statement</h1>
              <p className="text-slate-500">Last updated: January 2026</p>
            </div>
          </div>
        </div>

        {/* Important Warning */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 mb-8">
          <div className="flex gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-400 mb-2">Important Notice</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Investing in tokenized infrastructure bonds involves significant risks, including the
                potential loss of your entire investment. You should carefully consider your investment
                objectives, experience level, and risk appetite before investing. If you have any doubts,
                you should seek advice from an independent financial advisor.
              </p>
            </div>
          </div>
        </div>

        {/* Risk Categories */}
        <div className="space-y-6 mb-12">
          {riskCategories.map((category, i) => (
            <div key={i} className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <category.icon className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl font-bold text-white">{category.title}</h2>
              </div>
              <ul className="space-y-2">
                {category.risks.map((risk, j) => (
                  <li key={j} className="flex items-start gap-2 text-slate-400">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Disclosures */}
        <div className="space-y-8">
          <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">No Investment Advice</h2>
            <p className="text-slate-400 leading-relaxed">
              The information provided on this Platform is for general informational purposes only and
              does not constitute investment advice, financial advice, trading advice, or any other sort
              of advice. You should not treat any of the Platform&apos;s content as such. We do not recommend
              that any bond or token should be bought, sold, or held by you. Nothing on this Platform should
              be taken as an offer to buy, sell, or hold any bond or token.
            </p>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">AI-Generated Insights</h2>
            <p className="text-slate-400 leading-relaxed">
              Our Platform uses artificial intelligence to provide investment insights, risk assessments,
              and recommendations. While our AI systems are designed to be helpful, they may produce
              inaccurate or incomplete information. AI-generated content should not be relied upon as the
              sole basis for investment decisions. Always conduct your own research and consult with
              qualified professionals before making investment decisions.
            </p>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Tokenization Risks</h2>
            <p className="text-slate-400 leading-relaxed">
              Tokenized securities represent a new form of financial instrument that combines traditional
              securities with blockchain technology. Additional risks include:
            </p>
            <ul className="mt-4 space-y-2 text-slate-400">
              <li>• Token prices may not accurately reflect underlying bond values</li>
              <li>• Smart contract bugs could result in loss of tokens</li>
              <li>• Regulatory uncertainty around tokenized securities</li>
              <li>• Limited trading history and price discovery mechanisms</li>
              <li>• Potential for market manipulation in less liquid tokens</li>
            </ul>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Suitability</h2>
            <p className="text-slate-400 leading-relaxed">
              Before investing, you should consider whether trading or holding tokenized bonds is suitable
              for you based on your:
            </p>
            <ul className="mt-4 space-y-2 text-slate-400">
              <li>• Financial circumstances and ability to bear losses</li>
              <li>• Investment experience and knowledge</li>
              <li>• Investment objectives and time horizon</li>
              <li>• Risk tolerance and appetite</li>
              <li>• Tax situation and regulatory requirements</li>
            </ul>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Regulatory Compliance</h2>
            <p className="text-slate-400 leading-relaxed">
              Our Platform operates under the regulatory framework established by SEBI and RBI. We are
              committed to maintaining full compliance with all applicable laws and regulations. However,
              the regulatory landscape for tokenized securities is evolving, and future regulatory changes
              may affect the availability, trading, or value of tokens on our Platform.
            </p>
          </div>
        </div>

        {/* Acknowledgment */}
        <div className="mt-12 bg-slate-900/50 border border-amber-500/20 rounded-2xl p-6">
          <h3 className="font-bold text-white mb-3">By Using This Platform, You Acknowledge That:</h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>✓ You have read and understood this Risk Disclosure Statement</li>
            <li>✓ You understand that investing involves risk of loss</li>
            <li>✓ You are making investment decisions based on your own judgment</li>
            <li>✓ You will not hold the Platform liable for investment losses</li>
            <li>✓ You have the financial capability to bear potential losses</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <div className="flex gap-4 justify-center">
            <Link href="/terms" className="text-blue-400 hover:text-white transition">Terms of Service</Link>
            <span className="text-slate-700">|</span>
            <Link href="/privacy" className="text-blue-400 hover:text-white transition">Privacy Policy</Link>
            <span className="text-slate-700">|</span>
            <Link href="/contact" className="text-blue-400 hover:text-white transition">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
