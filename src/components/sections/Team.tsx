"use client";

import { motion } from "framer-motion";
import { Star, Scissors } from "lucide-react";

const Team = () => {
  const teamMembers = [
    {
      name: "Wael",
      role: "Barbier",
      experience: "",
      specialty: "Coupes & dégradés précis",
      image: "/team1.jpg",
      rating: 5,
      description: ""
    },
    {
      name: "Souhaib",
      role: "Barbier",
      experience: "",
      specialty: "Rasage traditionnel & styling",
      image: "/team2.jpg",
      rating: 5,
      description: ""
    },
    {
      name: "Hamza",
      role: "Barbier",
      experience: "",
      specialty: "Coupes modernes & finitions",
      image: "/team3.jpg", 
      rating: 5,
      description: ""
    },
    {
      name: "Med Amine",
      role: "Barbier",
      experience: "",
      specialty: "Conseil & transformations",
      image: "/team4.jpg", 
      rating: 5,
      description: ""
    }
  ];

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="background-decoration">
        <div className="background-decoration-shape top-1/3 left-1/4 w-40 h-40 bg-amber-400"></div>
        <div className="background-decoration-shape bottom-1/3 right-1/4 w-32 h-32 bg-amber-600"></div>
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
            <span className="section-badge-text">Équipe</span>
          </div>
          <h2 className="section-title">
            Nos <span className="relative text-amber-600">
              Experts
              <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-600"></div>
            </span>
          </h2>
          <p className="section-subtitle">
            Rencontrez nos barbiers experts, passionnés par leur métier et dédiés 
            à vous offrir la meilleure expérience de coiffure masculine.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative card-base overflow-hidden cursor-pointer card-hover"
            >
              {/* Photo du coiffeur */}
              <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-amber-600 rounded-full flex items-center justify-center">
                    <Scissors className="w-16 h-16 text-white" />
                  </div>
                </div>
                
                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-amber-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-amber-100 font-medium mb-4">{member.role}</p>
                  
                  {/* Note */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(member.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm ml-2">{member.rating}/5</span>
                  </div>
                  
                  {/* Spécialité */}
                  <p className="text-center text-sm px-4">
                    {member.specialty}
                  </p>
                  
                  {/* Bouton Facebook */}
                  <button className="absolute bottom-4 right-4 w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Team;
