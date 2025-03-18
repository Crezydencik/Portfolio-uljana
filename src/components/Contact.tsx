
import React from 'react';
import { Mail, Phone, MapPin, Send, LinkedinIcon, TwitterIcon, InstagramIcon } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section-container bg-white">
      <div className="text-center mb-16">
        <h2 className="section-title mx-auto">Get In Touch</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Interested in collaborating or have a project in mind? I'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="animate-on-scroll">
          <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <Mail className="text-portfolio-yellow mt-1 mr-4" size={20} />
              <div>
                <h4 className="font-medium">Email</h4>
                <p className="text-gray-600">anna@journalistportfolio.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="text-portfolio-yellow mt-1 mr-4" size={20} />
              <div>
                <h4 className="font-medium">Phone</h4>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="text-portfolio-yellow mt-1 mr-4" size={20} />
              <div>
                <h4 className="font-medium">Location</h4>
                <p className="text-gray-600">New York City, USA</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Follow Me</h3>
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="bg-portfolio-gray hover:bg-portfolio-yellow transition-colors duration-300 p-3 rounded-full"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={20} />
            </a>
            <a 
              href="#" 
              className="bg-portfolio-gray hover:bg-portfolio-yellow transition-colors duration-300 p-3 rounded-full"
              aria-label="Twitter"
            >
              <TwitterIcon size={20} />
            </a>
            <a 
              href="#" 
              className="bg-portfolio-gray hover:bg-portfolio-yellow transition-colors duration-300 p-3 rounded-full"
              aria-label="Instagram"
            >
              <InstagramIcon size={20} />
            </a>
          </div>
        </div>

        <div className="animate-on-scroll delay-150">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-portfolio-yellow"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-portfolio-yellow"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-portfolio-yellow"
                placeholder="How can I help you?"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-portfolio-yellow"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full portfolio-button flex justify-center items-center"
              >
                Send Message <Send size={16} className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
