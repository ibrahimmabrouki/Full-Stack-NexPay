"use client";

import { useGuestGuard } from "@/hooks/useGuestGuard";

export default function Home() {
  const { user, loading } = useGuestGuard();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-8 py-6 bg-white/80 backdrop-blur-md shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                NexPay
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#security"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Security
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                About
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/login"
                className="px-5 py-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
              >
                Login
              </a>
              <a
                href="/register"
                className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Get Started
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 top-15">
          <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2 animate-pulse"></span>
                Secure Peer-to-Peer Platform
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Send Money Across
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Currencies
                </span>
                , Instantly
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl lg:mx-0">
                NexPay is a secure peer-to-peer digital wallet and currency
                exchange platform. Manage and transfer money across USD, EUR,
                and LBP with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/register"
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-center"
                >
                  Create Free Account
                </a>
                <a
                  href="#features"
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200 text-center"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-2xl opacity-20"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 font-medium">
                          USD Wallet
                        </span>
                      </div>
                      <span className="text-2xl text-gray-500 font-bold">
                        $12,450.00
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 font-medium">
                          EUR Wallet
                        </span>
                      </div>
                      <span className="text-2xl text-gray-500 font-bold">
                        €8,230.50
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 font-medium">
                          LBP Wallet
                        </span>
                      </div>
                      <span className="text-2xl text-gray-500 font-bold">
                        ل.ل 45,000,000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-15 bg-indigo-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-4">
              Everything you need in a modern wallet
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features to help you manage, send, and convert money
              across multiple currencies
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section
        id="security"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="lg:flex lg:items-center lg:justify-between gap-12">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
                🔒 Bank-Grade Security
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Your money is safe with us
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Built on a ledger-based architecture ensuring every transaction
                is recorded, auditable, and consistent. Your financial data is
                protected with enterprise-grade encryption.
              </p>
              <ul className="space-y-4">
                {securityFeatures.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-2xl opacity-20"></div>
                <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-gray-500">
                          Ledger Transaction
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        Atomic & Consistent
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-medium text-gray-500">
                          Real-time Audit
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        Fully Trackable
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="font-medium text-gray-500">
                          Encrypted Storage
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">Bank-grade</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20 bg-indigo-50"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-6">
            Why choose NexPay?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            We're building the future of peer-to-peer finance with transparency,
            security, and real-time processing at its core.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of users who trust NexPay for their financial
              transactions
            </p>
            <a
              href="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Create Free Account
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>&copy; 2026 NexPay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Features data
const features = [
  {
    icon: (
      <svg
        className="w-7 h-7 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Multi-Currency Support",
    description:
      "Manage USD, EUR, and LBP in one wallet. Convert between currencies with real-time exchange rates.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Instant Transfers",
    description:
      "Send money to other users instantly with zero third-party intermediaries. Peer-to-peer at its best.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Bank-Grade Security",
    description:
      "Ledger-based architecture ensures every transaction is recorded, auditable, and consistent.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
    title: "Stripe Integration",
    description:
      "Easily fund your wallet via Stripe. External payments processed securely with leading payment provider.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "Real-time Analytics",
    description:
      "Track all your transactions with detailed analytics and insights into your spending patterns.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    ),
    title: "Smart Notifications",
    description:
      "Stay updated with real-time notifications for deposits, transfers, and account activity.",
  },
];

const securityFeatures = [
  "Atomic transactions ensuring data integrity",
  "Complete audit trail for every operation",
  "End-to-end encryption for all sensitive data",
  "Real-time currency conversion with external rates",
  "PCI-compliant payment processing",
];

const stats = [
  { value: "$1M+", label: "Transactions Processed" },
  { value: "500+", label: "Active Users" },
  { value: "3", label: "Currencies Supported" },
  { value: "99.99%", label: "Uptime Guarantee" },
];
