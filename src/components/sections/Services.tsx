"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Scissors, Zap, Crown, Sparkles, Palette, SprayCan, Clock } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Services = () => {
  const serviceCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pricingCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Service cards hover animations
    serviceCardRefs.current.forEach((card, index) => {
      if (card) {
        const icon = card.querySelector('.service-icon');
        const title = card.querySelector('.service-title');
        const description = card.querySelector('.service-description');

        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.05,
            rotationY: 5,
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(icon, {
            scale: 1.2,
            rotation: 10,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
          gsap.to(title, {
            y: -5,
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(description, {
            y: -3,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            scale: 1,
            rotationY: 0,
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to([title, description], {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    });

    // Pricing cards hover animations
    pricingCardRefs.current.forEach((card) => {
      if (card) {
        const button = card.querySelector('.pricing-button');
        const icon = card.querySelector('.pricing-icon');

        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(icon, {
            scale: 1.1,
            rotation: 5,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    });
  }, []);

  const serviceCategories = [
    {
      icon: <Scissors className="w-12 h-12 text-white service-icon" />,
      title: "Coupes & Coiffages",
      description: "Des coupes modernes et soignées pour un style toujours impeccable"
    },
    {
      icon: <Zap className="w-12 h-12 text-white service-icon" />,
      title: "Barbe & Rasage",
      description: "Des prestations précises pour une barbe et un rasage parfaitement maîtrisés"
    },
    {
      icon: <SprayCan className="w-12 h-12 text-white service-icon" />,
      title: "Soins Capillaires & Visage",
      description: "Des soins complets pour purifier, revitaliser et révéler votre éclat"
    },
    {
      icon: <Palette className="w-12 h-12 text-white service-icon" />,
      title: "Techniques & Transformations",
      description: "Des transformations durables pour sublimer votre look et affirmer votre style"
    }
  ];

  const pricingCategories = [
    {
      icon: <Scissors className="w-10 h-10 text-amber-600 pricing-icon" />,
      title: "Coupe",
      services: [
        { name: "Shampoing + Coupe + Coiffage", duration: "30 min", price: "15 €" },
        { name: "Rasage du Crâne Traditionnel", duration: "30 min", price: "13 €" },
        { name: "Coupe + Taille de la Barbe", duration: "45 min", price: "22 €" }
      ]
    },
    {
      icon: <Zap className="w-10 h-10 text-amber-600 pricing-icon" />,
      title: "Barbe",
      services: [
        { name: "Taille de la Barbe + Rasage", duration: "20 min", price: "10 €" },
        { name: "Rasage traditionnel", duration: "20 min", price: "10 €" }
      ]
    },
    {
      icon: <SprayCan className="w-10 h-10 text-amber-600 pricing-icon" />,
      title: "Soins",
      services: [
        { name: "Gommage Capillaire + Black Mask", duration: "45min", price: "22 €" },
        { name: "Gommage Capillaire + Masque à l'Argile", duration: "30min", price: "22 €" }
      ]
    },
    {
      icon: <Palette className="w-10 h-10 text-amber-600 pricing-icon" />,
      title: "Techniques",
      services: [
        { name: "Lissage Brésilien + Shampoing + Coupe + Coiffage", duration: "1h 30min", price: "22 €" },
        { name: "Coloration + Shampoing + Coupe + Coiffage", duration: "1h 30min", price: "22 €" }
      ]
    }
  ];

  return (
    <section id="services" className="relative overflow-hidden">
      {/* Section Services - Fond sombre */}
      <div className="section-padding relative" style={{ backgroundColor: '#151515' }}>
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <div className="section-badge">
              <span className="section-badge-text">Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Nos <span className="text-amber-600">Services</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {serviceCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group"
              >
                <div 
                  ref={el => serviceCardRefs.current[index] = el}
                  className="bg-white rounded-lg p-8 text-center hover:bg-gray-50 transition-all duration-300 cursor-pointer h-64 flex flex-col justify-center shadow-lg hover:shadow-xl"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 service-title">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed service-description">
                    {category.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Prix - Fond clair */}
      <div className="section-padding bg-white relative">
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <div className="section-badge">
              <span className="section-badge-text">Tarifs</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Nos <span className="text-amber-600">Prix</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {pricingCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card 
                  ref={el => pricingCardRefs.current[index] = el}
                  className="h-full card-base border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      {category.icon}
                    </div>
                    <CardTitle className="text-xl text-gray-900">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 flex-1 flex flex-col">
                    <div className="space-y-4 flex-1">
                      {category.services.map((service, serviceIndex) => (
                        <motion.div
                          key={serviceIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: serviceIndex * 0.1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium text-gray-900 text-sm flex-1 mr-4">
                              {service.name}
                            </h4>
                            <span className="font-bold text-amber-600 text-lg flex-shrink-0">
                              {service.price}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-500 text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{service.duration}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <a
                        href="https://www.planity.com/the-expert-93500-pantin-3v3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full button-primary pricing-button border-2 border-black inline-flex items-center justify-center"
                      >
                        Réserver
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
