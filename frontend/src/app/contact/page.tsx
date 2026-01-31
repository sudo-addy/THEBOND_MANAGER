'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Headphones, FileQuestion, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      value: 'support@bondplatform.gov',
      description: 'For general inquiries and support',
      action: 'mailto:support@bondplatform.gov'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      value: '+1-800-BONDS-01',
      description: 'Mon-Fri, 9:00 AM - 6:00 PM IST',
      action: 'tel:+18002663701'
    },
    {
      icon: Headphones,
      title: 'Live Chat',
      value: 'Available 24/7',
      description: 'Instant support via chat',
      action: '#'
    },
    {
      icon: MapPin,
      title: 'Head Office',
      value: 'Federal Building, Suite 100',
      description: 'Mumbai, Maharashtra 400001',
      action: 'https://maps.google.com'
    }
  ];

  const faqs = [
    {
      question: 'How do I start investing?',
      answer: 'Create an account, complete KYC verification, add funds to your wallet, and browse available bonds in the marketplace.'
    },
    {
      question: 'What is the minimum investment?',
      answer: 'You can start investing with as little as ₹500 through our tokenized bonds, making infrastructure investment accessible to everyone.'
    },
    {
      question: 'How are returns calculated?',
      answer: 'Returns are based on the coupon rate of the underlying bond, plus any capital appreciation from token price movements.'
    },
    {
      question: 'Is my investment secure?',
      answer: 'Yes, all bonds are backed by real infrastructure projects and secured through blockchain-based smart contracts with regulatory oversight.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-200">
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-300">Contact</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-slate-400 text-lg">
            Have questions? We&apos;re here to help. Choose your preferred contact method below.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {contactMethods.map((method, i) => (
            <a
              key={i}
              href={method.action}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition group"
            >
              <method.icon className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition" />
              <h3 className="font-bold text-white mb-1">{method.title}</h3>
              <p className="text-blue-400 text-sm font-medium mb-1">{method.value}</p>
              <p className="text-xs text-slate-500">{method.description}</p>
            </a>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Send a Message</h2>
            </div>

            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-green-400 mb-2">Message Sent!</h3>
                <p className="text-slate-400 text-sm">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="investment">Investment Questions</option>
                    <option value="technical">Technical Support</option>
                    <option value="kyc">KYC/Verification</option>
                    <option value="compliance">Compliance</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition resize-none"
                    placeholder="Describe your inquiry in detail..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* FAQs */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <FileQuestion className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-slate-900/30 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-bold text-white mb-2">{faq.question}</h3>
                  <p className="text-sm text-slate-400">{faq.answer}</p>
                </div>
              ))}
            </div>

            {/* Office Hours */}
            <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white">Support Hours</h3>
              </div>
              <div className="text-sm text-slate-400 space-y-1">
                <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                <p>Saturday: 10:00 AM - 2:00 PM IST</p>
                <p>Sunday: Closed (Emergency support available)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <Link href="/" className="text-blue-400 hover:text-white transition">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
