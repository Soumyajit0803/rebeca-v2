import {React, useState, useEffect} from 'react'
import "./Progressbar.css"


const Progressbar = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
  
    useEffect(() => {
      const handleScroll = () => {
        setScrollPosition(window.scrollY);
      };
  
      window.addEventListener('scroll', handleScroll);
    }, []);
  
    // Calculate loader size based on scroll position
    const loaderSize = (scrollPosition / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  
    return (
        <div className = "page-scrolled" style = {{width: `${loaderSize}%`}} />
    );
  };

export default Progressbar;