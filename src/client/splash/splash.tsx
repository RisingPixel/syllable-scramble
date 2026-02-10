import '../index.css';

import { context, requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export const Splash = () => {
  return (
    <div className="flex relative flex-col justify-center items-center min-h-screen gap-4 bg-[url(/Syllable_splash_bg.png)]">
      <img className="object-contain w-1/2 max-w-[500px] mx-auto" src="logo.png" alt="Syllable logo" />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold text-center text-white ">
          Hey {context.username ?? 'user'} 👋
        </h1>
        <p className="text-base text-center text-shadow-white ">
          How many words can you find with the syllable <span className="text-[#16a249] font-bold">{context.postData?.syllable?.toString()}</span>?
        </p>
      </div>
      <div className="flex items-center justify-center mt-5">
        <button
          className="flex items-center justify-center bg-[#16a249] text-white rounded-sm border-2 border-[#bdffcb] w-auto h-10 cursor-pointer px-4 animate-pulse-glow"
          onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
        >
          TAP TO START
        </button>
      </div>
      {/* We could add here links to our social networks or credit us "Brought to you by Rising Pixel :)" */}
      {/* 
      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 text-[0.8em] text-gray-600">
        <button
          className="cursor-pointer"
          onClick={() => navigateTo('https://developers.reddit.com/docs')}
        >
          Docs
        </button>
        <span className="text-gray-300">|</span>
        <button
          className="cursor-pointer"
          onClick={() => navigateTo('https://www.reddit.com/r/Devvit')}
        >
          r/Devvit
        </button>
        <span className="text-gray-300">|</span>
        <button
          className="cursor-pointer"
          onClick={() => navigateTo('https://discord.com/invite/R7yu2wh9Qz')}
        >
          Discord
        </button>
      </footer> 
      */}
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
