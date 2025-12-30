import React from 'react';
import { Target, Eye, Heart, Award, Users, Leaf, Shield, Truck, CheckCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const AboutUs = () => {
  const { siteSettings } = useData();

  const LOGO_URL = siteSettings.logo || "https://customer-assets.emergentagent.com/job_70b8c44d-b0eb-46ab-b798-c90870274405/artifacts/5olvlaa7_WhatsApp%20Image%202025-12-26%20at%2013.46.33.jpeg";

  // Icon mapping for values
  const iconMap = {
    'Quality First': Heart,
    'Natural & Pure': Leaf,
    'Trust & Transparency': Shield,
    'Fresh Delivery': Truck,
  };

  // Default values with fallbacks from settings
  const values = (siteSettings.aboutValues || [
    { title: 'Quality First', desc: 'We source only the finest dry fruits from trusted farms across the globe.' },
    { title: 'Natural & Pure', desc: 'No artificial additives, preservatives, or chemicals in our products.' },
    { title: 'Trust & Transparency', desc: 'Honest pricing and complete transparency in our business practices.' },
    { title: 'Fresh Delivery', desc: 'Carefully packed and delivered fresh to your doorstep.' }
  ]).map((value, index) => ({
    ...value,
    icon: iconMap[value.title] || [Heart, Leaf, Shield, Truck][index % 4]
  }));

  const stats = siteSettings.aboutStats || [
    { number: '10+', label: 'Years of Experience' },
    { number: '50K+', label: 'Happy Customers' },
    { number: '100+', label: 'Premium Products' },
    { number: '500+', label: 'Cities Served' }
  ];

  const team = siteSettings.aboutWhyChooseUs || [
    { name: 'Quality Assurance', desc: 'Every product goes through strict quality checks before reaching you.' },
    { name: 'Customer Support', desc: 'Dedicated team to assist you with any queries or concerns.' },
    { name: 'Logistics', desc: 'Efficient delivery network ensuring timely and safe delivery.' }
  ];

  const storyParagraphs = siteSettings.aboutStoryParagraphs || [
    `${siteSettings.businessName || 'DryFruto'} was born from a simple belief – everyone deserves access to pure, high-quality dry fruits at fair prices. What started as a small family business has grown into a trusted name in the dry fruits industry.`,
    'We work directly with farmers and suppliers to bring you the freshest products without any middlemen. Our commitment to quality and customer satisfaction has helped us build lasting relationships with thousands of families across India.',
    'Today, we continue our journey with the same passion and dedication, bringing health and happiness to every household through our carefully curated selection of dry fruits, nuts, seeds, and berries.'
  ];

  const visionText = siteSettings.aboutVision || "To be India's most trusted and preferred destination for premium dry fruits, making healthy eating accessible and affordable for every household.";
  
  const visionPoints = siteSettings.aboutVisionPoints || [
    'Be the #1 dry fruits brand in India',
    'Reach every corner of the country',
    'Promote healthy living through quality products'
  ];

  const missionText = siteSettings.aboutMission || "To deliver the finest quality dry fruits sourced directly from farms, ensuring freshness, purity, and value for our customers.";
  
  const missionPoints = siteSettings.aboutMissionPoints || [
    'Source directly from trusted farmers',
    'Maintain highest quality standards',
    'Provide excellent customer experience'
  ];

  const heroSubtitle = siteSettings.aboutHeroSubtitle || 'Your trusted partner for premium quality dry fruits, nuts, and seeds since 2014.';

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section - Elegant with Logo */}
        <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C1E899]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8BC34A]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="max-w-6xl mx-auto px-4 relative">
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Logo */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-white shadow-2xl p-4 border-4 border-[#C1E899]">
                  <img 
                    src={LOGO_URL} 
                    alt={siteSettings.businessName || 'DryFruto'} 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              
              {/* Text Content */}
              <div className="text-center md:text-left">
                <p className="text-[#7CB342] font-medium mb-2 tracking-wide uppercase text-sm">Welcome to</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                  {siteSettings.businessName || 'DryFruto'}
                </h1>
                <p className="text-xl text-[#7CB342] italic mb-4">{siteSettings.slogan || 'Live With Health'}</p>
                <p className="text-gray-600 max-w-lg text-lg leading-relaxed">
                  {heroSubtitle}
                </p>
                
                {/* Stats Row */}
                <div className="flex flex-wrap justify-center md:justify-start gap-8 mt-8">
                  {stats.slice(0, 4).map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-[#7CB342]">{stat.number}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story - Elegant Card Layout */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-[#7CB342] font-medium mb-2 tracking-wide uppercase text-sm">Our Journey</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">The Story Behind Our Passion</h2>
            </div>
            
            <div className="bg-gradient-to-br from-[#f5f9f0] to-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#C1E899]/30">
              <div className="grid md:grid-cols-5 gap-8 items-center">
                {/* Story Text - Takes 3 columns */}
                <div className="md:col-span-3 space-y-5">
                  {storyParagraphs.map((paragraph, index) => (
                    <p key={index} className="text-gray-600 leading-relaxed text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {/* Logo with Decorative Frame - Takes 2 columns */}
                <div className="md:col-span-2 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#7CB342] rounded-3xl rotate-6 opacity-20"></div>
                    <div className="relative bg-white rounded-3xl p-6 shadow-lg">
                      <img 
                        src={LOGO_URL} 
                        alt={siteSettings.businessName || 'DryFruto'} 
                        className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-2xl"
                      />
                      <div className="mt-4 text-center">
                        <p className="font-bold text-gray-800 text-lg">{siteSettings.businessName || 'DryFruto'}</p>
                        <p className="text-[#7CB342] text-sm italic">{siteSettings.slogan || 'Live With Health'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission - Side by Side Cards */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-[#7CB342] font-medium mb-2 tracking-wide uppercase text-sm">What Drives Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Vision & Mission</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision Card */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#7CB342] to-[#8BC34A] rounded-2xl flex items-center justify-center shadow-lg">
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">{visionText}</p>
                <ul className="space-y-3">
                  {visionPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#7CB342] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mission Card */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#689F38] to-[#7CB342] rounded-2xl flex items-center justify-center shadow-lg">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">{missionText}</p>
                <ul className="space-y-3">
                  {missionPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#7CB342] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values - Elegant Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-[#7CB342] font-medium mb-2 tracking-wide uppercase text-sm">What We Believe In</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Core Values</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className="group bg-gradient-to-br from-white to-[#f5f9f0] rounded-2xl p-6 text-center border border-[#C1E899]/30 hover:shadow-lg hover:border-[#7CB342]/50 transition-all"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                    <value.icon className="w-8 h-8 text-[#7CB342]" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us - Modern Cards */}
        <section className="py-20 bg-gradient-to-br from-[#7CB342] to-[#689F38]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-[#C1E899] font-medium mb-2 tracking-wide uppercase text-sm">The DryFruto Difference</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose {siteSettings.businessName || 'Us'}?</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {team.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-5 shadow-lg">
                    <Award className="w-6 h-6 text-[#7CB342]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.name}</h3>
                  <p className="text-[#e8f5e0] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA - Clean Design */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#C1E899]">
                <img 
                  src={LOGO_URL} 
                  alt={siteSettings.businessName || 'DryFruto'} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Let's Connect</h2>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                Have questions or want to know more about our products? We'd love to hear from you!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a 
                  href={`tel:+91${siteSettings.phone}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#7CB342] hover:bg-[#689F38] text-white px-8 py-3.5 rounded-xl font-semibold transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call: {siteSettings.phone}
                </a>
                <a 
                  href={`mailto:${siteSettings.email}`}
                  className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Email Us
                </a>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <MapPin className="w-4 h-4" />
                <p>{siteSettings.address}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
