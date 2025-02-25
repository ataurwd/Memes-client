import { useState } from "react";
import axios from "axios";
import React from 'react';
import Swal from 'sweetalert2'

const MemeForm = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("Trending");
  const [img, setImg] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_BB_API_KEY}`,
        formData
      );
      setImg(response.data.data.url);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
    setUploading(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const memeData = { title, details, category, img };

    console.log("Meme Data:", memeData);
      // send memeData to the backend
      axios.post('http://localhost:5000/meme', memeData)
       .then((response) => {
           if (response.data.insertedId) {
            Swal.fire({
                title: "Good job!",
                text: "Meme added successfully",
                icon: "success"
            });
                setTitle("");
                setDetails("");
                setCategory("Trending");
                setImg(null);
          }
        })
       .catch((error) => {
          console.error("Error uploading meme:", error);
        });
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-xl rounded-xl my-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Upload Meme</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Title */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 outline-none"
            placeholder="Enter meme title"
            required
          />
        </div>

        {/* Details */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Details</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 outline-none resize-none h-24"
            placeholder="Enter a short description"
            required
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Upload Image</label>
          <label className="cursor-pointer w-full flex items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-lg text-gray-500 bg-gray-50 hover:bg-gray-100 transition">
            <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" required />
            {uploading ? (
              <span className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full"></span>
            ) : (
              <span className="text-lg font-medium">Click to upload an image</span>
            )}
          </label>
          {img && <img src={img} alt="Uploaded Preview" className="w-full mt-3 rounded-lg shadow-md" />}
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 outline-none bg-white"
          >
            <option value="Trending">Trending</option>
            <option value="New">New</option>
            <option value="Classic">Classic</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MemeForm;
