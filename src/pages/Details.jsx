import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { motion } from "framer-motion";

const Details = () => {
    const meme = useLoaderData()
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left Side - Image */}
        <motion.div
          className="md:w-1/2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={meme.img} alt={meme.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Right Side - Content */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-3 text-gray-800"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {meme.title}
          </motion.h2>

          <motion.p
            className="text-gray-600 mb-4"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {meme.details}
          </motion.p>

          {/* Hashtags */}
          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {meme.hashtags ? <>{meme?.hashtags.map((tag, index) => (
              <span key={index} className="badge badge-primary">{tag}</span>
            ))}</> :""}
          </motion.div>

          {/* Category */}
          <motion.span
            className="badge badge-outline badge-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {meme.category}
          </motion.span>
        </div>
      </motion.div>
    </div>
    );
};

export default Details;