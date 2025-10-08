"use client";

import { motion } from "framer-motion";
import { Award, Users, Clock, Star } from "lucide-react";
import ImageSlider from "@/components/ui/ImageSlider";

const About = () => {
  const stats = [
    { icon: <Award className="w-6 h-6" />, value: "14+", label: "Années d'expérience" },
    { icon: <Users className="w-6 h-6" />, value: "5000+", label: "Clients satisfaits" },
    { icon: <Clock className="w-6 h-6" />, value: "30min", label: "Temps moyen" },
    { icon: <Star className="w-6 h-6" />, value: "4.9/5", label: "Note moyenne" }
  ];

  const salonImages = [
    "/salon1.webp",
    "/salon2.webp", 
    "/salon3.webp",
    "/salon4.webp"
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden" style={{ backgroundColor: '#151515' }}>
      {/* Background decoration */}
      <div className="background-decoration">
        <div className="background-decoration-shape top-1/4 right-20 w-48 h-48 bg-amber-400"></div>
        <div className="background-decoration-shape bottom-1/4 left-20 w-32 h-32 bg-amber-600"></div>
      </div>
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="section-badge">
              <span className="section-badge-text">À propos</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              À propos de <span className="text-amber-600">nous</span>
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Depuis 2010, The Experts Barber Shop perpétue l'art traditionnel 
              de la coiffure masculine tout en s'adaptant aux tendances modernes. 
              Notre équipe de barbiers expérimentés vous garantit une expérience 
              unique dans un cadre chaleureux et professionnel.
            </p>
            
            <div className="bg-white/5 border-l-4 border-amber-400 p-6 mb-8 rounded-r-lg shadow-sm">
              <p className="text-lg text-gray-200 font-medium italic leading-relaxed">
                The Expert vous invite dans un espace unique de 6 places confortables, 
                avec une déco urbaine chic inspirée des motos vintage 🏍️ et une ambiance 
                musicale qui donne le ton à chaque coupe 🎶
              </p>
            </div>
            
            <p className="text-lg text-gray-300 mb-8">
              Nous croyons que chaque homme mérite de se sentir confiant et élégant. 
              C'est pourquoi nous nous engageons à fournir des services de qualité 
              supérieure avec une attention particulière aux détails.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-center p-6 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="flex justify-center mb-2 text-amber-600">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <ImageSlider 
              images={salonImages}
              alt="The Experts Barber Shop - Intérieur du salon"
              className="w-full"
            />
            
            {/* Decorative floating circles removed for a cleaner look */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
