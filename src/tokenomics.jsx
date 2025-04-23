import React from 'react';
import { useState } from 'react';

export default function Tokenomics() {
  const [totalSupply] = useState('1,000,000,000');
  
  // Define the segments for the pie chart
  const segments = [
    { name: "SWAP 34%", percentage: 34, color: "#765B31" },
    { name: "SWAP 22.5%", percentage: 22.5, color: "#9F7D42" },
    { name: "BURN 25%", percentage: 25, color: "#272727" },
    { name: "Liquidity Pool", percentage: 18.5, color: "#B29B69" }
  ];

  // Calculate the SVG pie segments
  const createPieSegments = () => {
    let startAngle = 0;
    return segments.map((segment, index) => {
      // Convert percentage to angle (360 degrees = full circle)
      const angle = (segment.percentage / 100) * 360;
      const endAngle = startAngle + angle;
      
      // Calculate the SVG arc path
      const x1 = 100 + 70 * Math.cos((startAngle - 90) * Math.PI / 180);
      const y1 = 100 + 70 * Math.sin((startAngle - 90) * Math.PI / 180);
      const x2 = 100 + 70 * Math.cos((endAngle - 90) * Math.PI / 180);
      const y2 = 100 + 70 * Math.sin((endAngle - 90) * Math.PI / 180);
      
      // Flag for large arc (> 180 degrees)
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      // Create path
      const path = `M 100 100 L ${x1} ${y1} A 70 70 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      
      // Update the start angle for the next segment
      startAngle = endAngle;
      
      return (
        <path
          key={index}
          d={path}
          fill={segment.color}
          stroke="#000"
          strokeWidth="1"
        />
      );
    });
  };

  // Create segment labels with indicator lines
  const createLabels = () => {
    let startAngle = 0;
    return segments.map((segment, index) => {
      const angle = (segment.percentage / 100) * 360;
      const midAngle = startAngle + angle / 2;
      startAngle += angle;
      
      // Calculate position for the label line start (on the pie)
      const innerX = 100 + 55 * Math.cos((midAngle - 90) * Math.PI / 180);
      const innerY = 100 + 55 * Math.sin((midAngle - 90) * Math.PI / 180);
      
      // Calculate position for the label line end (outside the pie)
      const outerX = 100 + 85 * Math.cos((midAngle - 90) * Math.PI / 180);
      const outerY = 100 + 85 * Math.sin((midAngle - 90) * Math.PI / 180);
      
      // Position for the label box
      const boxX = outerX + (outerX > 100 ? 10 : -60);
      const boxY = outerY - 10;
      
      return (
        <g key={index}>
          <line 
            x1={innerX} 
            y1={innerY} 
            x2={outerX} 
            y2={outerY} 
            stroke="#666" 
            strokeWidth="1" 
          />
          <rect 
            x={boxX} 
            y={boxY} 
            width="50" 
            height="20" 
            fill={segment.color} 
            rx="3" 
            ry="3" 
          />
          <text 
            x={boxX + 25} 
            y={boxY + 14} 
            textAnchor="middle" 
            fill="white" 
            fontSize="10"
            fontWeight="bold"
          >
            {segment.name}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="flex flex-col items-center bg-black text-white min-h-screen p-4">
      <div className="text-center mb-4 mt-16">
        <h1 className="text-3xl font-bold mb-2">Tokenomics</h1>
        <p className="text-sm text-gray-300">
          A 100% fair launch. No team tokens. No shady presale. Just OURS.
        </p>
      </div>
      
      <div className="relative w-full max-w-md h-64 my-8">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {createPieSegments()}
          <circle cx="100" cy="100" r="30" fill="#E8C170" />
          <text x="100" y="105" textAnchor="middle" fill="#000" fontWeight="bold" fontSize="12">$OURS</text>
          {createLabels()}
        </svg>
      </div>
      
      <div className="text-center mt-4 mb-12">
        <p className="text-sm text-gray-400">Total Supply:</p>
        <p className="text-2xl font-bold">{totalSupply} $OURS Tokens</p>
      </div>
      
      {/* <div className="mt-auto mb-8">
        <h2 className="text-2xl font-bold">The Future is $OURS</h2>
      </div> */}
    </div>
  );
}