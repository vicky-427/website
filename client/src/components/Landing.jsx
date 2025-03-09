import { useNavigate } from 'react-router-dom'; 
import React, { useState, useEffect } from 'react';

// Import images correctly
import Logo from "../assets/logo.png";
import bgImage from "../assets/service.jpg";
import tin from "../assets/main.png";
import resi from "../assets/residential.jpg";
import commer from "../assets/Commercial.jpg";
import restore from "../assets/restore.jpg";

const Main = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debugging image paths
  console.log("Images Loaded:", { Logo, bgImage, tin, resi, commer, restore });

  return (
    <div className="min-h-screen rounded bg-white text-grey">
      {/* Header Section */}
      <header
        className={`fixed w-full top-0 z-50 px-8 py-4 transition-all duration-300 ${isScrolled ? 'bg-grey' : 'bg-transparent'}`}
      >
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="h-40 w-40 rounded">
            <img src={Logo} alt="logo" className="h-full w-full object-contain" />
          </div>
          <div className="flex gap-8">
            {["Home", "Services", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-black font-bold uppercase text-xl hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        style={{ backgroundImage: `url(${tin})` }}
        className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-grey/70"></div>
        <div className="relative z-20 max-w-4xl px-8">
          <h1 className="text-6xl md:text-7xl uppercase font-bold mb-4 text-black drop-shadow-lg">
            Building Your Dreams
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Your trusted partner for premium construction services
          </p>
          <a
            onClick={() => navigate("/main")}
            className="inline-block px-8 py-4 bg-black text-white font-bold rounded-full uppercase tracking-wide hover:bg-white transition hover:text-black"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-8 bg-cover bg-center bg-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-black">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Residential Construction", description: "Custom homes and renovations." },
              { title: "Commercial Construction", description: "Professional spaces designed for success." },
              { title: "Renovations", description: "Upgrade existing spaces with modern design." }
            ].map((service, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-lg bg-gray-600 border border-gold hover:bg-gold transition-all duration-300"
                onClick={() => navigate("/form")}
              >
                <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                <p className="text-white">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-8 bg-gray-200">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl font-bold text-center mb-12 text-black">Recent Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { title: "Commercial Projects", description: "Completed in 2024, a state-of-the-art workspace.", image: resi },
        { title: "Residential Project", description: "Exquisite design and premium finishes.", image: commer },
        { title: "Restored Project", description: "A vibrant retail destination for the community.", image: restore }
      ].map((project, index) => (
        <div 
          key={index} 
          className="bg-gray-600 border border-gold rounded-lg overflow-hidden hover:bg-gold transition-all duration-300 transform hover:scale-110"
        >
          <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
          <div className="p-6">
            <h3 className="text-xl text-white font-bold mb-2">{project.title}</h3>
            <p className="text-white">{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Footer Section */}
      <footer id="contact" className="bg-black text-white py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p>Email: info@sssbuilders.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Address: 123 Construction Ave, Metropolis</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Services", "Projects", "Contact"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((platform) => (
                <a key={platform} href="#" className="hover:text-white transition-colors">
                  <span className="sr-only">{platform}</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Main;
