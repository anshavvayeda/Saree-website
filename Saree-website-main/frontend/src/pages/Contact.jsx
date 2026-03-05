import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Instagram, Phone, Mail, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in your saree collection. Can you help me find the perfect piece?"
    );
    window.open(`https://wa.me/917041297390?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-16 bg-[#FDFBF7]" data-testid="contact-page">
      {/* Header */}
      <section className="py-12 md:py-16 px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#B8860B] mb-4">
            Get in Touch
          </p>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#1A1A1A] mb-4">
            Contact Us
          </h1>
          <p className="text-[#666666] max-w-md mx-auto">
            Have a question or need help choosing the perfect saree? 
            We're here to assist you.
          </p>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-['Playfair_Display'] text-2xl text-[#1A1A1A] mb-6">
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full bg-transparent border-b border-[#E8E4DE] focus:border-[#B8860B] px-0 py-4 text-[#1A1A1A] placeholder:text-[#999999] outline-none transition-colors"
                  data-testid="contact-name"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full bg-transparent border-b border-[#E8E4DE] focus:border-[#B8860B] px-0 py-4 text-[#1A1A1A] placeholder:text-[#999999] outline-none transition-colors"
                  data-testid="contact-email"
                />
              </div>
              
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number (Optional)"
                  className="w-full bg-transparent border-b border-[#E8E4DE] focus:border-[#B8860B] px-0 py-4 text-[#1A1A1A] placeholder:text-[#999999] outline-none transition-colors"
                  data-testid="contact-phone"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-[#E8E4DE] focus:border-[#B8860B] px-0 py-4 text-[#1A1A1A] placeholder:text-[#999999] outline-none transition-colors resize-none"
                  data-testid="contact-message"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-[#B8860B] text-white text-xs uppercase tracking-wider hover:bg-[#996F0A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="contact-submit"
              >
                {isSubmitting ? (
                  <div className="spinner w-5 h-5" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-['Playfair_Display'] text-2xl text-[#1A1A1A] mb-6">
              Direct Contact
            </h2>
            
            {/* Quick Actions */}
            <div className="space-y-4 mb-10">
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center space-x-4 p-4 bg-[#25D366] text-white hover:bg-[#128C7E] transition-colors"
                data-testid="whatsapp-contact-btn"
              >
                <MessageCircle className="w-6 h-6" />
                <div className="text-left">
                  <p className="font-medium">Chat on WhatsApp</p>
                  <p className="text-sm opacity-80">Quick response guaranteed</p>
                </div>
              </button>
              
              <a
                href="https://www.instagram.com/tamara_handloomsilksarees/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center space-x-4 p-4 border border-[#E8E4DE] text-[#1A1A1A] hover:border-[#B8860B] transition-colors"
                data-testid="instagram-contact-btn"
              >
                <Instagram className="w-6 h-6 text-[#B8860B]" />
                <div className="text-left">
                  <p className="font-medium">DM on Instagram</p>
                  <p className="text-sm text-[#666666]">@tamara_handloomsilksarees</p>
                </div>
              </a>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Phone className="w-5 h-5 text-[#B8860B] mt-1" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#666666] mb-1">Phone</p>
                  <a href="tel:+917041297390" className="text-[#1A1A1A] hover:text-[#B8860B] transition-colors">
                    +91 7041297390
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-[#B8860B] mt-1" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#666666] mb-1">Email</p>
                  <a href="mailto:contact@tamarasilk.com" className="text-[#1A1A1A] hover:text-[#B8860B] transition-colors">
                    contact@tamarasilk.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-[#B8860B] mt-1" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#666666] mb-1">Shipping</p>
                  <p className="text-[#1A1A1A]">Pan-India & Worldwide</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-10 p-6 bg-white border border-[#E8E4DE]">
              <h3 className="text-xs uppercase tracking-wider text-[#B8860B] mb-4">
                Response Time
              </h3>
              <p className="text-[#666666] text-sm leading-relaxed">
                We typically respond within 2-4 hours during business hours 
                (10 AM - 7 PM IST). For urgent inquiries, WhatsApp is the 
                fastest way to reach us.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="luxury-divider max-w-md mx-auto my-16" />

      {/* FAQ Teaser */}
      <section className="px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="font-['Playfair_Display'] text-2xl text-[#1A1A1A] mb-4">
            Frequently Asked
          </h3>
          <div className="space-y-4 text-left">
            {[
              { q: 'Do you offer international shipping?', a: 'Yes, we ship worldwide. Contact us for shipping rates and delivery times.' },
              { q: 'Can I see more photos of a product?', a: 'Absolutely! Reach out via WhatsApp and we\'ll send you detailed photos and videos.' },
              { q: 'How can I care for my silk saree?', a: 'We recommend dry cleaning for the first few washes. Each saree comes with care instructions.' },
            ].map((faq, index) => (
              <div key={index} className="p-4 bg-white border border-[#E8E4DE]">
                <p className="text-[#1A1A1A] text-sm mb-2">{faq.q}</p>
                <p className="text-[#666666] text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
