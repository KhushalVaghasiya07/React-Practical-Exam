import React from "react";
import "./Journal.css";

import journal1 from "../../assets/Images/imgi_123_post-1-650x650.jpg";
import journal2 from "../../assets/Images/imgi_128_post-5-150x150.jpg";
import journal3 from "../../assets/Images/imgi_127_post-2-650x650.jpg";

const journalData = [
  {
    id: 1,
    category: "HEALTH",
    title: "Power Up Your Mornings: 5 Quick and Healthy Breakfast Ideas",
    author: "Olivia Thompson",
    date: "7 months ago",
    comments: 4,
    readTime: "5 Min Read",
    img: journal1,
  },
  {
    id: 2,
    category: "SPOTLIGHTS",
    title: "Master Knife Skills for Effortless Cooking Prep",
    author: "Olivia Thompson",
    date: "7 months ago",
    comments: 4,
    readTime: "5 Min Read",
    img: journal2,
  },
  {
    id: 3,
    category: "COLLECTIONS",
    title: "Savor Every Bite: A Celebration of Pizza Moments",
    author: "Olivia Thompson",
    date: "7 months ago",
    comments: 4,
    readTime: "5 Min Read",
    img: journal3,
  },
];

const Journal = () => {
  return (
    <section className="journal-section">
      <div className="journal-container">
        <h2 className="journal-title">Our Journal</h2>
        <p className="journal-subtitle">
          Discover stories, tips, and trends to inspire your culinary journey and creativity!
        </p>

        <div className="journal-grid">
          {journalData.map((item) => (
            <div className="journal-card" key={item.id}>
              <div className="journal-img-box">
                <img src={item.img} alt={item.title} />
                <span className="journal-badge">{item.category}</span>
              </div>
              <div className="journal-content">
                <h3 className="journal-post-title">{item.title}</h3>
                <p className="journal-meta">
                  by <strong>{item.author}</strong> • {item.date} • 💬 {item.comments}
                </p>
                <p className="journal-read">{item.readTime}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journal;
