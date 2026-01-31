'use client';

import Link from 'next/link';
import { Mail, Phone, Building } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-950 border-t border-blue-800 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-6">
          {/* Company Info */}
          <div>
            <h4 className="font-semibold text-white mb-3">About</h4>
            <ul className="text-xs text-blue-300 space-y-1.5">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-white transition">
                  Impact Report
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-3">Support</h4>
            <ul className="text-xs text-blue-300 space-y-1.5">
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-white transition">
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-3">Legal</h4>
            <ul className="text-xs text-blue-300 space-y-1.5">
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition">
                  Risk Disclosure
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-3">Contact</h4>
            <ul className="text-xs text-blue-300 space-y-1.5">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@bondmarket.gov</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1-800-BONDS-01</li>
              <li className="flex items-center gap-2"><Building className="w-4 h-4" /> Federal Building, Suite 100</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-800 pt-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-xs text-blue-300 mb-3 md:mb-0">
              © {currentYear} Global Infrastructure Bonds Authority. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs">
              <span className="text-blue-300">✓ ISO 27001 Certified</span>
              <span className="text-blue-300">✓ GDPR Compliant</span>
              <span className="text-blue-300">✓ 24/7 Monitored</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
