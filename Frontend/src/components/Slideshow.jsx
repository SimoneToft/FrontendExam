import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import image1 from '../assets/images/fish1.jpg';
import image2 from '../assets/images/fish2.jpg';
import image3 from '../assets/images/fish3.jpg';
import image4 from '../assets/images/fish4.jpg';

const Slideshow = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Determine the next tab and direction
      const nextTab = (activeTab + direction) % 4;
      const nextDirection = nextTab === 0 && direction === -1 ? 1 : direction;

      // Change the active tab and direction
      setActiveTab(nextTab);
      setDirection(nextDirection);
    }, 6000); // Adjust the interval time (in milliseconds) as needed

    return () => {
      // Cleanup the interval on component unmount
      clearInterval(intervalId);
    };
  }, [activeTab, direction]);

  const carouselData = [
    {image: image1,
      text: "Bring the serene beauty of a tropical oasis into your own living room with Aquaroma! Immerse yourself in the vibrant colors and graceful movements of our exotic tropical fish.",},
    {image: image2,
      text: "Embark on a YoloFish adventure with Aquaroma! Our aquariums are more than just tanks; they're portals to a world of wonder where each swim tells a unique story.",},
    { image: image3,
      text:"Dive into laughter and joy with Aquaroma's LMAO Coral Reef collection! Transform your space into a whimsical underwater paradise filled with happy and colorful marine life.",},
    {image: image4,
      text:"Experience pure ROFL delight with Aquaroma's Reef Collection! Our aquariums are not just habitats; they're laughter-filled realms where marine wonders and joy collide.",},
  ];
  
  return (
    <div className="slideshow-container">
      {/* Blurry background */}
      <div className='background_container'>
        <div className="slideshow-background">
          {[image1, image2, image3, image4].map((img, index) => (
            <img
              key={index}
              src={index === activeTab ? img : ''}
              className={index === activeTab ? 'active' : ''}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>
      </div>
      <div className="slideshow-images">
        {carouselData.map((data, index) => (
          <img
            key={index}
            src={index === activeTab ? data.image : ''}
            alt=""
            className={index === activeTab ? 'active' : ''}
          />
        ))}
        <div className='carousel-title'>
          <h1 className="image-title">AQUAROMA</h1>
        </div>
        <div className='slider-text'>
          {carouselData.map((data, index) => (
            <div
              key={index}
              src={index === activeTab ? data.image : ''}
              className="image-text">{index === activeTab ? data.text : ''}</div>
          ))}
        </div>
      </div>
      <div className="circle-navigation">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`circle ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;