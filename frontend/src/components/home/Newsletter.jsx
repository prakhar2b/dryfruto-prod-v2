import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=1920&h=600&fit=crop)` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#558B2F]/95 to-[#689F38]/90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-[#8BC34A] rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <p className="text-[#C1E899] font-medium mb-2">Want to offer regularly?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Subscribe Our Newsletter for Daily Updates
          </h2>
          <p className="text-[#e8f5e0] mb-8">
            Get the latest updates on new products, special offers, and health tips delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-[#C1E899] focus:outline-none focus:ring-2 focus:ring-[#8BC34A] backdrop-blur-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-[#8BC34A] hover:bg-[#7CB342] text-white font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
              <Send className="w-5 h-5" />
            </button>
          </form>

          {subscribed && (
            <p className="mt-4 text-[#C1E899] font-medium animate-pulse">
              Thank you for subscribing! 
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
