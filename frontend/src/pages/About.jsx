import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram } from 'lucide-react';
import { getProxiedImageUrl } from '@/utils/imageProxy';
import storeData from '@/data/data.json';

export const About = () => {
  const brand = storeData.brand || {};

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-16 bg-[#FDFBF7]" data-testid="about-page">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1599303000936-1cf21eac4456?w=1920&q=80"
            alt="Silk Weaving Heritage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/40 to-transparent" />
        </div>
        
        <div className="absolute inset-0 flex items-end justify-center pb-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#B8860B] mb-4">
              Our Story
            </p>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl text-[#1A1A1A]">
              About Us
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-12 items-start"
          >
            {/* Profile Image */}
            <div className="mx-auto md:mx-0">
              <div className="relative">
                <div className="absolute -top-2 -left-2 w-full h-full border border-[#B8860B]/30" />
                <img
                  src={getProxiedImageUrl(brand.profile_image) || "https://images.unsplash.com/photo-1688382654723-a7366006519b?w=400&q=80"}
                  alt={brand.name}
                  className="w-40 h-40 md:w-48 md:h-48 object-cover"
                />
              </div>
            </div>

            {/* Story Content */}
            <div>
              <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#B8860B] mb-6">
                {brand.name || "Tamara's Silk Handloom"}
              </h2>
              
              <p className="text-[#666666] leading-relaxed mb-6">
                {brand.bio || "Crafting a new aesthetic for the traditional. Hand-picked saree collections curated with love."}
              </p>
              
              <p className="text-[#666666] leading-relaxed mb-6">
                At Tamara's Silk Handloom, we believe that every saree tells a story. 
                Our journey began with a passion for preserving the rich heritage of 
                Indian handloom while making it accessible to the modern woman.
              </p>
              
              <p className="text-[#666666] leading-relaxed mb-8">
                Each piece in our collection is carefully curated from master weavers 
                across India - from the intricate Banarasi weaves to the delicate 
                Chikankari embroidery of Lucknow, from the bold Ajrakh prints of Gujarat 
                to the elegant Parsi Gara embroidery. We work directly with artisans to 
                bring you authentic, handcrafted pieces that celebrate centuries of textile tradition.
              </p>

              <a
                href={brand.instagram_url || "https://www.instagram.com/tamara_handloomsilksarees/"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-[#B8860B] hover:text-[#996F0A] transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm uppercase tracking-wider">Follow Our Journey</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#B8860B] mb-4">
              What We Stand For
            </p>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1A1A1A]">
              Our Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Heritage',
                description: 'Preserving centuries-old weaving traditions and supporting artisan communities across India.'
              },
              {
                title: 'Quality',
                description: 'Each piece is handpicked for its craftsmanship, ensuring only the finest reaches our customers.'
              },
              {
                title: 'Authenticity',
                description: 'Working directly with master weavers to bring you genuine, handcrafted textile art.'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-8 border border-[#E8E4DE] hover:border-[#B8860B]/30 transition-colors bg-[#FDFBF7]"
              >
                <h3 className="font-['Playfair_Display'] text-xl text-[#B8860B] mb-4">
                  {value.title}
                </h3>
                <p className="text-[#666666] text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[#B8860B] mb-4">
                The Process
              </p>
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1A1A1A] mb-6">
                Artisan Craftsmanship
              </h2>
              <p className="text-[#666666] leading-relaxed mb-6">
                Every saree in our collection undergoes a meticulous creation process. 
                From the spinning of silk threads to the final embroidery, each step 
                is performed by skilled artisans who have inherited their craft through 
                generations.
              </p>
              <p className="text-[#666666] leading-relaxed mb-8">
                We believe in slow fashion - pieces that take time to create but last 
                a lifetime. When you choose a Tamara's saree, you're not just buying 
                a garment; you're investing in a piece of art and supporting the 
                livelihoods of traditional craftspeople.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#B8860B] text-white text-xs uppercase tracking-wider hover:bg-[#996F0A] transition-colors"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://images.unsplash.com/photo-1524314010015-136ee8ae1ab3?w=400&q=80"
                alt="Weaving process"
                className="w-full aspect-[3/4] object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80"
                alt="Silk saree"
                className="w-full aspect-[3/4] object-cover mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1A1A1A] mb-6">
              Begin Your Journey
            </h2>
            <p className="text-[#666666] mb-8">
              Discover the perfect saree that speaks to your soul. 
              Our collection awaits you.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-[#B8860B] text-white text-xs uppercase tracking-[0.2em] hover:bg-[#996F0A] transition-colors duration-500"
            >
              <span>View Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
