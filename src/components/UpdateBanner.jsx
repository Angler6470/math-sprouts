import React from 'react';

/**
 * UpdateBanner - Shows when a new version is available
 */
const UpdateBanner = ({ onRefresh, onDismiss }) => {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 shadow-2xl z-[100] animate-bubble-pop">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0 backdrop-blur-sm">
          <span className="text-2xl">🌱</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-black text-sm mb-1 leading-tight">
            New Update Available!
          </h3>
          <p className="text-green-100 text-xs font-bold leading-snug">
            Get the latest features and improvements
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={onRefresh}
          className="flex-1 bg-white text-green-600 font-black text-xs py-2.5 rounded-xl shadow-md border-b-2 border-green-100 active:scale-95 transition-all"
        >
          Refresh Now
        </button>
        <button
          onClick={onDismiss}
          className="px-4 bg-white/20 text-white font-black text-xs py-2.5 rounded-xl backdrop-blur-sm border border-white/30 active:scale-95 transition-all"
        >
          Later
        </button>
      </div>
    </div>
  );
};

export default UpdateBanner;
