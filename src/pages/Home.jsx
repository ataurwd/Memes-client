import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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

  // Extract unique categories
  const categories = [...new Set(allMemes.map((meme) => meme.category))];

  // Filter memes based on search and category
  const filteredMemes = allMemes.filter((meme) => {
    return (
      (searchTerm === "" ||
        meme.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "" || meme.category === selectedCategory)
    );
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
      <h2 className="text-4xl font-bold text-center mb-8 text-blue-600">
        🔥 Trending Memes
      </h2>

      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search memes by title..."
          className="w-full md:w-[] px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Category Dropdown */}
        <select
          className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Memes Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {filteredMemes.length > 0 ? (
          filteredMemes.map((meme) => (
            <motion.div
              key={meme._id}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-transform duration-200"
            >
              <figure className="overflow-hidden">
                <motion.img
                  src={meme?.img}
                  alt={meme?.title}
                  className="w-full h-64 object-cover transition-transform duration-300"
                  whileHover={{ scale: 1.1 }}
                />
              </figure>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {meme?.title}
                </h3>
                <p className="text-gray-600 mt-2">{meme?.details}...</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-500 font-medium">
                    Category:{" "}
                    <span className="text-blue-600">{meme?.category}</span>
                  </span>
                  <Link
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                    to={`/details/${meme._id}`}
                  >
                    Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No memes found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
