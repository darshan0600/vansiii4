import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#F8F5F1] pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-center mb-12"
        >
          Let's Connect
        </motion.h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <motion.a
            href="https://instagram.com/vansiii"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition border border-gray-100"
          >
            <Instagram className="w-12 h-12 text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Instagram</h2>
            <p className="text-gray-600">@vansiii</p>
            <p className="text-gray-600">@vansiii.studio</p>
          </motion.a>

          <motion.a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition border border-gray-100"
          >
            <Phone className="w-12 h-12 text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">WhatsApp</h2>
            <p className="text-gray-600">+1 (234) 567-890</p>
          </motion.a>

          <motion.a
            href="mailto:hello@vansiii.com"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition border border-gray-100"
          >
            <Mail className="w-12 h-12 text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Email</h2>
            <p className="text-gray-600">hello@vansiii.com</p>
            <p className="text-gray-600">business@vansiii.com</p>
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-gray-600">
            Available for projects worldwide.<br />
            Let's create something amazing together.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;