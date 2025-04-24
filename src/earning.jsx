import { useState, useRef } from 'react';

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const QrCodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const PowerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
    <line x1="12" y1="2" x2="12" y2="12"></line>
  </svg>
);

export default function HodlDashboard() {
  const [balance] = useState({
    ours: '215,053 OURS',
    solEarned: '2.589 SOL'
  });
  
  const [user] = useState({
    name: 'Nishanth David',
    email: 'nishanth.david@gmail.com',
    walletAddress: 'DAY7G.d95d'
  });
  
  const [copySuccess, setCopySuccess] = useState(false);
  const walletAddressRef = useRef(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.walletAddress)
    alert('Wallet address copied to clipboard!')
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="flex flex-col max-w-md mx-auto bg-black">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b-1-solid">
            <div className="flex items-center bg-black rounded-[25px] border border-2">
            <span className="text-sm font-medium">Reflections Dashboard</span>
            <span className="text-sm font-bold font-12 p-1 ">scroll</span>
            <span className="text-gray-400"><ChevronDownIcon /></span>

            </div>
      </header>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col p-5">
        {/* Title Section */}
        <div className="mb-4">
          <h1 className="text-3xl font-medium mb-5">Earning is $OURS</h1>
          <p className="text-sm text-gray-400 mt-2">
            Track your earned $SOL rewards and see<br />
            how much you could earn by HODLing
          </p>
        </div>

        {/* Coin Image Section */}
        <div className="flex justify-center my-3 relative">
            <div className="absolute w-52 h-52 bg-yellow-250  blur-xl rounded-filled z-0"></div>
            <img 
                src="earning.png" 
                alt="OURS Coin" 
                className="w-68 h-68 z-10 relative"
            />
        </div>
        {/* Info text */}
        <div className="text-center mb-6">
          <p className="text-xs text-gray-500">
            Reflections are auto-distributed to holders, no claim needed
          </p>
        </div>

        {/* User Info and Balance Container */}
        <div className="space-y-4 mt-auto">
          {/* User Profile Card */}
          <div className="bg-gray-800 rounded-lg p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
              <span className="text-xs font-medium">NK</span>
            </div>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>

          {/* Wallet Address */}
          <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm text-gray-300 mr-2">Wallet address:</span>
              <span className="text-sm text-gray-500" ref={walletAddressRef}>{user.walletAddress}</span>
            </div>
            <div className="flex">
              <button 
                className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2"
                onClick={copyToClipboard}
                title={copySuccess ? "Copied!" : "Copy wallet address"}
              >
                <span className={`${copySuccess ? 'text-green-400' : 'text-gray-400'}`}>
                  <CopyIcon />
                </span>
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">
                  <QrCodeIcon />
                </span>
              </button>
            </div>
          </div>

          {/* Balance */}
          <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
            <span className="text-sm">$OURS Balance:</span>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full  mr-2"><img src="rotatingcoin.png" alt="" /></div>
              <span className="font-bold">{balance.ours}</span>
            </div>
          </div>

          {/* SOL Earned */}
          <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
            <span className="text-sm">$SOL Earned:</span>
            <span className="font-bold text-blue-400">{balance.solEarned}</span>
          </div>

          {/* Disconnect Button with Power Icon */}
          <button className="w-full bg-red-400 text-red font-medium py-1.5  rounded-[5px] flex items-center justify-center">
            <span className="mr-2"><PowerIcon /></span>
            Disconnect
          </button>
        </div>
      </div>

      {/* Navigation
      <nav className="flex justify-around py-4 bg-gray-900 border-t border-gray-800">
        <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"></button>
        <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"></button>
        <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"></button>
      </nav> */}
    </div>
  );
}