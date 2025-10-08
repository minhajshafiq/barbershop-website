"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Bus, Train } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-amber-600" />,
      title: "Adresse",
      content: "101 Av. Jean Lolive\n93500 Pantin, France"
    },
    {
      icon: <Phone className="w-6 h-6 text-amber-600" />,
      title: "Téléphone",
      content: "01 87 00 01 81"
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-600" />,
      title: "Horaires",
      content: "Ouvert tous les jours\n09:30 - 20:00"
    }
  ];

  const transportInfo = [
    {
      icon: <Bus className="w-6 h-6 text-amber-600" />,
      title: "Bus",
      content: "Ligne 249\nArrêt Jean Lolive"
    },
    {
      icon: <Train className="w-6 h-6 text-amber-600" />,
      title: "Métro",
      content: "Ligne 5\nStation Hoche"
    }
  ];

  return (
    <section id="contact" className="section-padding text-white relative overflow-hidden" style={{ backgroundColor: '#151515' }} role="main" aria-labelledby="contact-heading">
      {/* Background decoration */}
      <div className="background-decoration opacity-10">
        <div className="background-decoration-shape top-20 right-20 w-32 h-32 bg-amber-400"></div>
        <div className="background-decoration-shape bottom-20 left-20 w-40 h-40 bg-amber-600"></div>
      </div>
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="section-badge">
            <span className="section-badge-text">Contact</span>
          </div>
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold text-white mb-2">
            Contactez <span className="text-amber-600">nous</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Prêt pour une nouvelle coupe ? Prenez rendez-vous dès maintenant 
            ou contactez-nous pour toute question.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex justify-center"
          >
            <div className="w-full max-w-md">
              <div className="bg-white rounded-lg p-8 shadow-2xl border border-gray-200 card-base">
                <h3 className="text-2xl font-bold mb-8 text-gray-800">Informations de contact</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {info.icon}
                      </div>
                      <div>
                      <h4 className="font-semibold text-lg mb-1 text-gray-700">
                        {info.title}
                      </h4>
                      <p className="text-gray-600 whitespace-pre-line font-medium">
                        {info.content}
                      </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Section Transport */}
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-semibold text-lg mb-4 text-gray-700">Transport en commun</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {transportInfo.map((transport, index) => (
                        <motion.div
                          key={transport.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: (contactInfo.length + index) * 0.1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          className="flex items-start space-x-3"
                        >
                          <div className="flex-shrink-0 mt-1">
                            {transport.icon}
                          </div>
                          <div>
                            <h5 className="font-semibold text-base mb-1 text-gray-700">
                              {transport.title}
                            </h5>
                            <p className="text-gray-600 whitespace-pre-line text-sm font-medium">
                              {transport.content}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="rounded-lg overflow-hidden shadow-lg border-0"
            style={{ backgroundColor: '#151515' }}
          >
            <div className="h-96 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.1234567890!2d2.1234567890!3d48.1234567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s101%20Av.%20Jean%20Lolive%2C%2093500%20Pantin!5e0!3m2!1sfr!2sfr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Experts Barber Shop - 101 Av. Jean Lolive, 93500 Pantin"
              />
            </div>
            <div className="p-6" style={{ backgroundColor: '#151515' }}>
              <h3 className="text-xl font-bold text-white mb-2">
                Nous trouver
              </h3>
              <p className="text-gray-300 mb-4">
                Situé au 101 Av. Jean Lolive à Pantin, nous sommes facilement accessibles 
                en transport en commun (Bus 249, Métro ligne 5) et en voiture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.planity.com/the-expert-93500-pantin-3v3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary inline-flex items-center justify-center text-center"
                >
                  Réserver maintenant
                </a>
                <a
                  href="tel:0187000181"
                  className="button-secondary inline-flex items-center justify-center text-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Appeler</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
