
import HodlDashboard from './earning.jsx';
import { useState, useEffect } from 'react';
import Tokenomics from './tokenomics.jsx';

export default function OursTokenApp() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');
  
  // State for partners that will scroll horizontally
  const [partners, setPartners] = useState([
    { id: 1, name: 'Binmart', color: '#3498db' },
    { id: 2, name: 'Coinpecko', color: '#2ecc71' },
    { id: 3, name: 'Exchange', color: '#e74c3c' },
    { id: 4, name: 'Partner4', color: '#9b59b6' },
    { id: 5, name: 'Partner5', color: '#f1c40f' },
  ]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Tokenomics', href: '#tokenomics' },
    { name: 'Reflections', href: '#reflections' },
    { name: 'Community', href: '#community' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Whitepaper', href: '#whitepaper' },
  ];

  // Function to handle smooth scrolling when clicking navigation links
  const handleNavClick = (e, item) => {
    e.preventDefault();
    setActiveNav(item.name);
    setIsNavOpen(false);
    
    const targetId = item.href.substring(1); // Remove the # from the href
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Smooth scroll to the target element
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Effect to handle continuous scrolling for partners
  useEffect(() => {
    const interval = setInterval(() => {
      setPartners(prevPartners => {
        const firstPartner = prevPartners[0];
        return [...prevPartners.slice(1), firstPartner];
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Effect to update active nav based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Find which section is currently visible
      for (let i = navItems.length - 1; i >= 0; i--) {
        const targetId = navItems[i].href.substring(1);
        const element = document.getElementById(targetId);
        
        if (element) {
          const offsetTop = element.offsetTop - 100; // Adjust offset as needed
          
          if (scrollPosition >= offsetTop) {
            setActiveNav(navItems[i].name);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <div className="flex flex-col w-full h-screen bg-black text-white overflow-y-auto relative">
      
      {/* Header */}
      <header className="flex justify-between items-center p-6 z-20 mt-[1rem]">
        <div className="flex items-center">
          <div className="h-6 w-6 rounded-full mr-2"> <img src="rotatingcoin.png" alt="" /></div>
          <span className="font-bold">$OURS</span>
        </div>
        <button className="text-white" onClick={() => setIsNavOpen(!isNavOpen)}>
          <div className="flex flex-col space-y-1">
            <div className="w-5 h-0.5 bg-white"></div>
            <div className="w-5 h-0.5 bg-white"></div>
            <div className="w-5 h-0.5 bg-white"></div>
          </div>
        </button>
      </header>

      {/* Navigation Sidebar */}
      {isNavOpen && (
        <div className="fixed inset-0 bg-black z-30 flex flex-col">
          <div className="flex justify-between p-4">
            <div className="h-8 w-8 rounded-full"><img src="navbarlogo.png" alt="OURS Logo" /></div>
            <button onClick={() => setIsNavOpen(false)} className="text-white text-2xl">
              ×
            </button>
          </div>
          
          {/* Scrollable Navigation */}
          <nav className="flex-1 flex flex-col px-4 py-8 space-y-6 overflow-y-auto">
            <div className="flex justify-center mb-8">
              {/* <img src="rotatingcoin.png" alt="OURS Logo" className="h-20 w-20" /> */}
            </div>
            
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className={`text-center py-2 ${activeNav === item.name ? 'text-yellow-500' : 'text-white'}`}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.name}
              </a>
            ))}
            
            <div className="mt-8 space-y-4 px-4">
              <button className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg w-full flex items-center justify-center">
                <div className="h-10 w-10 rounded-full mr-2"><img src="buycoins.png" alt="Buy OURS" /></div>
                Buy $OURS
              </button>
              
              <button className="bg-transparent border border-gray-700 text-white py-3 px-6 rounded-lg w-full flex items-center justify-center">
                <svg className="h-10 w-10 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M8 18L5 18L5 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 15L10 10L14 14L19 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                View Chart
              </button>
            </div>
          </nav>
          
          <div className="p-4">
            <div className="flex justify-center space-x-6 mb-4">
              <a href="#" className="text-yellow-500">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
                </svg>
              </a>
              <a href="#" className="text-white">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m3 8h-1.35c-.538 0-.65.221-.65.778V10h2l-.209 2H13v7h-3v-7H8v-2h2V7.692C10 5.923 10.931 5 13.029 5H15v3z"/>
                </svg>
              </a>
              <a href="#" className="text-white">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
            <p className="text-gray-500 text-xs text-center">Copyright © 2025 $OURS. All Rights Reserved.</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 pb-16 pt-[4rem]" >
        {/* Status Bar */}
        <div className="w-full text-xs text-gray-400 mb-6 text-center" id="home">
          Find $OURS on DEX | <span className="text-yellow-500">Read more →</span>
        </div>

        {/* Token Name and Tagline */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-1">$OURS</h1>
          <p className="text-gray-300">Not yours. Not mine. OURS</p>
        </div>

        {/* Buy Button */}
        <button className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg mb-4 w-full max-w-xs flex items-center justify-center">
          <div className="h-10 w-10 rounded-full  mr-2"><img src="buycoins.png" alt="" /></div>
          Buy $OURS
        </button>

        {/* Chart Button */}
        <button className="bg-transparent border border-gray-700 text-white py-3 px-6 rounded-lg mb-8 w-full max-w-xs flex items-center justify-center">
          <svg className="h-10 w-10 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M8 18L5 18L5 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 15L10 10L14 14L19 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          View Chart
        </button>
      
        {/* Rotating Coin */}
        <div className="animate-spin-slow w-72 h-72 rounded-full mb-8 flex items-center justify-center">
          <img src="rotatingcoin.png" alt="" />
          <div className="absolute inset-0 z-0 rounded-full blur-2xl bg-yellow-300 opacity-40 scale-105"></div>
        </div>

        {/* Exchange Selection Header */}
        <div className="flex items-center p-2 space-x-2 overflow-x-auto">
          <div className="flex items-center rounded-full px-3 py-1">
            <div className="h-6 w-6 rounded-full mr-2"><img src="pinksale.png" alt="" /></div>
            <span className="text-sm">Pinksale</span>
          </div>
          <div className="flex items-center rounded-full px-3 py-1">
            <div className="h-6 w-6 rounded-full mr-2"><img src="bit.png" alt="" /></div>
            <span className="text-sm">Binmart</span>
          </div>
          <div className="flex items-center rounded-full px-3 py-1">
            <div className="h-6 w-6 rounded-full mr-2"><img src="coingecko.png" alt="" /></div>
            <span className="text-sm">Coinpecko</span>
          </div>
        </div>
     
        {/* Market Stats Cards */}
        <div className="w-full max-w-md mb-6" id="reflections">
          {/* First Card - Market Cap */}
          <div className="bg-black rounded-xl p-4 mb-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full "><img src="marketcap.jpg" alt="" /></div>
            
            {/* Chart Icon and Graph Line */}
            <div className="flex justify-between items-start mb-12">
              <div className="flex items-center rounded-full p-2">
                <img src="marketcap.png" alt="" />
              </div>
            </div>
          </div>
          
          {/* Second Card */}
          <div className="bg-black rounded-xl p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full "></div>
            <div className="flex justify-between mb-4">
              <img src="holders.png" alt="" />
            </div>
          </div>
          
          {/* third Card */}
          <div className="bg-black rounded-xl p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full "></div>
            <div className="flex justify-between mb-4">
              <img src="liquidity.png" alt="" />
            </div>
          </div>
          
          {/* Fourth Card */}
          <div className="bg-black rounded-xl p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full "></div>
            <div className="flex justify-between mb-4">
              <img src="perfeection.png" alt="" />
            </div>
          </div>
        </div>

        {/* What is $OURS? Section */}
        <div className="w-full max-w-md mb-8 pt-[8rem]" id="community">
          <div className="text-xs text-gray-400 mb-2">You seen this now: $OURS</div>
          
          <h2 className="text-2xl font-bold mb-3">What is $OURS?</h2>
          
          <p className="mb-4 text-gray-300 text-sm leading-relaxed">
            It's OURS isn't just another meme coin — it's a decentralized, community-driven force. $OURS is designed to reward believers and burn doubters. With SOL reflections, zero dev control, and DAO governance, this is crypto — truly owned by the community. It's not yours. It's not mine. It's OURS!
          </p>
          
          <button className="flex items-center text-yellow-500 font-bold mb-8">
            Read our Vision
            <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="relative h-48 w-full">
            {/* Main coin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-yellow-600 flex items-center justify-center">
                  <div className="flex">
                    {/* Hands */}
                    <div className="w-3 h-4 bg-amber-800 rotate-45"></div>
                    <div className="w-3 h-4 bg-amber-700 -rotate-12"></div>
                    <div className="w-3 h-4 bg-amber-900 rotate-25"></div>
                    <div className="w-3 h-4 bg-amber-600 -rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Small coin 1 - top left */}
            <div className="absolute top-0 left-4 w-12 h-12 bg-yellow-500 rounded-full"></div>
            
            {/* Small coin 2 - bottom right */}
            <div className="absolute bottom-0 right-4 w-16 h-16 bg-yellow-500 rounded-full"></div>
            
            {/* Purple orb - bottom right */}
            <div className="absolute bottom-10 right-10 w-6 h-6 bg-purple-600 rounded-full opacity-70"></div>
          </div>
          
          {/* Tokenomics Section */}
          <div id="tokenomics"><Tokenomics /></div>
          
          {/* Roadmap Section */}
          <div id="roadmap" className=" max-w-md my-16 rounded-xl ">
            <HodlDashboard />
          </div>
       
          {/* Add this before the closing </main> tag */}
          <div className="w-full max-w-md mb-8">
            {/* Yellow gradient highlight/border element */}
            <div className="w-full h-1 bg-gradient-to-r from-yellow-500/20 via-yellow-500/80 to-yellow-500/20 mb-8"></div>
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-6">The Future is $OURS</h2>
              
              <button className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg mb-16 w-full max-w-xs flex items-center justify-center">
                <div className="h-5 w-5 rounded-full mr-2"><img src="buycoins.png" alt="" /></div>
                Buy $OURS
              </button>
              
              <h3 className="text-xl mb-8">Become one of $OURS</h3>
            </div>
            
            {/* Social media icons in a box with grid layout */}
            <div className="bg-black bg-opacity-80 border border-yellow-500/20 rounded-lg p-6 relative overflow-hidden">
              {/* Yellow glow effect */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-yellow-500/30 rounded-full blur-xl"></div>
              
              {/* Social media grid */}
              <div className="grid grid-cols-2 gap-8 relative z-10">
                {/* X (Twitter) icon */}
                <a href="#" className="flex justify-center">
                  <svg className="h-10 w-10 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.99 0H20.298L13.071 8.26L22.573 19.5H15.583L10.369 12.683L4.242 19.5H0.927L8.681 10.665L0 0H7.173L11.886 6.231L16.99 0ZM16.573 17.5H18.406L6.112 1.978H4.124L16.573 17.5Z"/>
                  </svg>
                </a>
                
                {/* Telegram icon */}
                <a href="#" className="flex justify-center">
                  <svg className="h-10 w-10 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.96 6.502-1.358 8.627-.168.9-.5 1.201-.82 1.23-.697.065-1.226-.46-1.9-.902-1.057-.693-1.654-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.015-.15-.056-.212s-.174-.041-.248-.024c-.106.024-1.793 1.14-5.062 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.242-1.865-.44-.752-.245-1.35-.374-1.297-.79.027-.216.325-.437.893-.662 3.498-1.524 5.83-2.53 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.1-.002.32.023.463.14a.51.51 0 0 1 .171.325c.016.093.036.306.02.472z"/>
                  </svg>
                </a>
                
                {/* Discord icon */}
                <a href="#" className="flex justify-center">
                  <svg className="h-10 w-10 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.979-.608 1.414a15.52 15.52 0 0 0-4.573 0c-.165-.435-.398-1.025-.609-1.415a.077.077 0 0 0-.079-.036c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 16.46 16.46 0 0 0 4.953 2.469.077.077 0 0 0 .084-.028c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a10.884 10.884 0 0 1-1.539-.73.075.075 0 0 1-.008-.125c.104-.077.207-.158.305-.24a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.063 0a.075.075 0 0 1 .079.009c.099.081.202.163.306.24a.075.075 0 0 1-.006.126c-.49.28-1 .517-1.54.729a.075.075 0 0 0-.041.105c.357.687.769 1.341 1.225 1.962a.076.076 0 0 0 .084.028 16.43 16.43 0 0 0 4.953-2.468.077.077 0 0 0 .032-.055c.5-5.094-.838-9.52-3.551-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-.974 0-1.774-.889-1.774-1.982s.788-1.982 1.774-1.982c.994 0 1.794.896 1.774 1.982 0 1.093-.78 1.982-1.774 1.982zm6.541 0c-.975 0-1.774-.889-1.774-1.982s.788-1.982 1.774-1.982c.995 0 1.795.896 1.775 1.982 0 1.093-.78 1.982-1.775 1.982z"/>
                  </svg>
                </a>
                
                {/* Instagram icon */}
                <a href="#" className="flex justify-center">
                  <svg className="h-10 w-10 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.440 0-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Whitepaper Section */}
          <div id="whitepaper" className="w-full max-w-md mb-16">
            <h2 className="text-2xl font-bold mb-6">Whitepaper</h2>
            <div className="bg-gray-900 rounded-lg p-6">
              <p className="text-gray-300 mb-4">
                Access our detailed whitepaper for in-depth information about the $OURS token ecosystem, technology, and vision.
              </p>
              <button className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded flex items-center">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download Whitepaper
              </button>
            </div>
          </div>
        </div>
       
        <footer className="w-full max-w-md mt-16 flex flex-col items-center">
          {/* X logo  */}
          <div className="mb-8 flex justify-center">
            <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center">
             <img src="navbarlogo.png" alt="" />
            </div>
          </div>
          
          {/* Navigation Links  */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-center mb-8">
            <a 
              href="#home" 
              className={`text-gray-400 hover:text-yellow-500 ${activeNav === 'Home' ? 'text-yellow-500' : ''}`}
              onClick={(e) => handleNavClick(e, { name: 'Home', href: '#home' })}
            >
              Home
            </a>
            <a 
              href="#tokenomics" 
              className={`text-gray-400 hover:text-yellow-500 ${activeNav === 'Tokenomics' ? 'text-yellow-500' : ''}`}
              onClick={(e) => handleNavClick(e, { name: 'Tokenomics', href: '#tokenomics' })}
            >
              Tokenomics
            </a>
            <a 
              href="#reflections" 
              className={`text-gray-400 hover:text-yellow-500 ${activeNav === 'Reflections' ? 'text-yellow-500' : ''}`}
              onClick={(e) => handleNavClick(e, { name: 'Reflections', href: '#reflections' })}
            >
              Reflections
            </a>
            <a 
              href="#community" 
              className={`text-gray-400 hover:text-yellow-500 ${activeNav === 'Community' ? 'text-yellow-500' : ''}`}
              onClick={(e) => handleNavClick(e, { name: 'Community', href: '#community' })}
            >
              Community
            </a>
            <a 
              href="#roadmap" 
              className={`text-gray-400 hover:text-yellow-500 ${activeNav === 'Roadmap' ? 'text-yellow-500' : ''}`}
              onClick={(e) => handleNavClick(e, { name: 'Roadmap', href: '#roadmap' })}
            >
              Roadmap
            </a>
          </div>
          
          {/* Whitepaper button
          <a 
            href="#whitepaper" 
            className={`text-yellow-500 font-semibold mb-12 ${activeNav === 'Whitepaper' ? 'underline' : ''}`}
            onClick={(e) => handleNavClick(e, { name: 'Whitepaper', href: '#whitepaper' })}
          >
            Whitepaper
          </a>
           */}
           
          {/* Copyright */}
          <div className="text-xs text-gray-600 mb-4">
            <p>Copyright © 2025 $OURS. All Rights Reserved.</p>
          </div>
          
          {/* Privacy Policy and Terms */}
          <div className="flex text-xs text-gray-600 space-x-6 mb-6">
            <a href="#privacy" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#terms" className="hover:text-gray-400">Terms of Service</a>
          </div>
        </footer>
      </main>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
      `}</style>
    </div>
  );
}


