import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
    const [data, setData] = useState([])
  axios.get("/data.json").then((res) => {
      console.log(res.data);
      setData(res.data);
  });
  return <div className="container mx-auto px-4 py-10">
  <h2 className="text-3xl font-bold text-center mb-6">🔥 Trending Memes</h2>
  <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
    {data.map((meme) => (
      <div key={meme.id} className="card bg-base-100 shadow-xl border border-gray-200">
        <figure>
          <img src={meme.img} alt={meme.title} className="w-full h-48 object-cover" />
        </figure>
        <div className="card-body">
          <h3 className="text-xl font-semibold">{meme.title}</h3>
          <p className="text-gray-600">{meme.details.substring(0, 100)}...</p>
          <div className="flex flex-wrap gap-2 my-">
            {meme.hashtags.map((tag, index) => (
              <span key={index} className="badge badge-primary">{tag}</span>
            ))}
          </div>
          <div className="card-actions">
                    <span className="badge badge-outline">Category: {meme.category}</span>
                    
                </div>
                <Link className="px-3 py-1 bg-primary text-white mt-2 w-1/4 rounded-md" to={`/details/${meme.id}`}>Details</Link>
            </div>
            
      </div>
    ))}
  </div>
</div>
};

export default Home;
