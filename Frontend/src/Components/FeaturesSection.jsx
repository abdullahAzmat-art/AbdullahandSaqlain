import React from 'react';
import { Briefcase, Sparkles, MessageCircle, BarChart3, CheckCircle, UserCheck } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Briefcase,
      title: "Post and Find Jobs Easily",
      description: "Connect opportunities with talent in just a few clicks. Seamless posting and browsing experience.",
      gradient: "from-indigo-950 to-indigo-800"
    },
    {
      icon: Sparkles,
      title: "Personalized Job Recommendations",
      description: "AI-powered matching that understands your skills, interests, and career goals.",
      gradient: "from-purple-900 to-indigo-900"
    },
    {
      icon: MessageCircle,
      title: "Real-time Chat with Applicants",
      description: "Instant communication between employers and candidates. No delays, just connections.",
      gradient: "from-indigo-900 to-blue-900"
    },
    {
      icon: BarChart3,
      title: "Track Applications & Analytics",
      description: "Comprehensive dashboard to monitor your job posts, applications, and hiring metrics.",
      gradient: "from-blue-900 to-indigo-950"
    },
    {
      icon: CheckCircle,
      title: "Apply for Jobs Easily",
      description: "Job seekers can apply to opportunities with a custom message or resume directly from the platform.",
      gradient: "from-green-700 to-green-500"
    },
    {
      icon: UserCheck,
      title: "Manage Applicants & Shortlist",
      description: "Talent Finders can view applicants, update their status, and track top candidates with ease.",
      gradient: "from-yellow-600 to-yellow-400"
    }
  ];

  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mt-20 mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">
            Why Choose CampusConnect?
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Everything you need to connect campus talent with opportunities, all in one powerful platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-200"
              >
                {/* Decorative background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-8 h-8 " />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-black mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative element */}
                  <div className="mt-6 flex items-center text-black font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm">Learn more</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
