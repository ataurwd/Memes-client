import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
const Home = () => {


  const { data: allMemes = [], isLoading } = useQuery({
    queryKey: ["memes"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:5000/memes");
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  if (isLoading) {
    return (
      <div className="grid place-items-center h-screen text-2xl">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">🔥 Trending Memes</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {allMemes.map((meme) => (
         <motion.div
         key={meme._id}
         whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
         whileTap={{ scale: 0.98 }}
         className="card bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md transition-all"
       >
         <figure className="overflow-hidden">
           <motion.img
             src={meme.img}
             alt={meme.title}
             className="w-full h-72 object-cover transition-transform duration-300 cursor-pointer"
             whileHover={{ scale: 1.1 }}
           />
         </figure>
         <div className="card-body p-4">
           <h3 className="text-xl font-semibold text-gray-800">{meme.title}</h3>
           <p className="text-gray-600 mt-2">{meme.details.substring(0, 100)}...</p>
           <div className="flex flex-wrap gap-2 mt-3">
             {meme.hashtags.map((tag, index) => (
               <span key={index} className="badge bg-blue-500 text-white text-sm px-2 py-1 rounded-md">
                 {tag}
               </span>
             ))}
           </div>
           <div className="card-actions mt-3 flex justify-between items-center">
             <span className="text-sm text-gray-500 font-medium">
               Category: <span className="text-blue-600">{meme.category}</span>
             </span>
             <Link
               className="px-4 py-2 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700 transition"
               to={`/details/${meme._id}`}
             >
               Details
             </Link>
           </div>
         </div>
       </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
