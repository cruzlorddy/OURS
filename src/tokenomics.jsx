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

  
  return (
    <div className="flex flex-col items-center bg-black text-white min-h-screen p-4">
      <div className="text-center mb-4 mt-16">
        <h1 className="text-3xl font-bold mb-2">Tokenomics</h1>
        <p className="text-sm text-gray-300">
          A 100% fair launch. No team tokens. No shady presale. Just OURS.
        </p>
      </div>
      
      <div className="relative w-full max-w-md h-64 my-8">
        <img src="tokenomics.png" alt="" />
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