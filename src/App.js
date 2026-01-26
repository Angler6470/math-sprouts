import React, { useState, useEffect } from 'react';

/**
 * Math Sprouts - A math app for children ages 3-8
 * Theme: Growth/Garden aesthetic with multiple game modes and customization
 */
function App() {
  // Global Game State
  const [gameMode, setGameMode] = useState('balance'); 
  const [difficulty, setDifficulty] = useState('intermediate'); // 'beginner', 'intermediate', 'advanced'
  const [theme, setTheme] = useState('garden'); // 'garden', 'ocean', 'space'
  const [problem, setProblem] = useState({ num1: 0, num2: 0, answer: 0, options: [], type: '+' });
  const [seeds, setSeeds] = useState(0); 
  const [level, setLevel] = useState(1);
  const [garden, setGarden] = useState([]); 
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentTargetPlant, setCurrentTargetPlant] = useState('/assets/garden/plant-1.png');
  const [showResetModal, setShowResetModal] = useState(false);
  const [hintedOptionIndex, setHintedOptionIndex] = useState(null);

  // Customization Assets
  const plantAssets = {
    garden: [
      '/assets/garden/plant-1.png', '/assets/garden/plant-2.png', '/assets/garden/plant-3.png', '/assets/garden/plant-4.png',
      '/assets/garden/plant-5.png', '/assets/garden/plant-6.png', '/assets/garden/plant-7.png', '/assets/garden/plant-8.png'
    ],
    ocean: [
      '/assets/ocean/ocean-1.png', '/assets/ocean/ocean-2.png', '/assets/ocean/ocean-3.png', '/assets/ocean/ocean-4.png',
      '/assets/ocean/ocean-5.png', '/assets/ocean/ocean-6.png', '/assets/ocean/ocean-7.png', '/assets/ocean/ocean-8.png'
    ],
    space: [
      '/assets/space/astro-1.png', '/assets/space/astro-2.png', '/assets/space/astro-3.png', '/assets/space/astro-4.png',
      '/assets/space/astro-5.png', '/assets/space/astro-6.png', '/assets/space/astro-7.png', '/assets/space/astro-8.png'
    ]
  };

  const themeConfig = {
    garden: {
      bg: 'bg-green-50',
      accent: 'text-green-700',
      headerBg: 'bg-yellow-200',
      headerBorder: 'border-yellow-400',
      problemBorder: 'border-green-200',
      btnColors: ['bg-rose-400 border-rose-600', 'bg-sky-400 border-sky-600', 'bg-amber-400 border-amber-600'],
      progressGradient: 'from-green-400 to-yellow-400',
      mascot: '/assets/mascot-garden.png',
      helper: '/assets/helper-bee.png',
      themeColor: 'bg-green-400',
      seedName: 'Sprout',
      bud: '/assets/garden/plant-1.png'
    },
    ocean: {
      bg: 'bg-cyan-50',
      accent: 'text-cyan-700',
      headerBg: 'bg-blue-200',
      headerBorder: 'border-blue-400',
      problemBorder: 'border-cyan-200',
      btnColors: ['bg-teal-400 border-teal-600', 'bg-blue-400 border-blue-600', 'bg-indigo-400 border-indigo-600'],
      progressGradient: 'from-cyan-400 to-blue-400',
      mascot: '/assets/mascot-ocean.png',
      helper: '/assets/helper-fish.png',
      themeColor: 'bg-blue-400',
      seedName: 'Pearl',
      bud: '/assets/ocean/ocean-1.png'
    },
    space: {
      bg: 'bg-slate-900',
      accent: 'text-purple-400',
      headerBg: 'bg-purple-900',
      headerBorder: 'border-purple-500',
      problemBorder: 'border-purple-800',
      btnColors: ['bg-fuchsia-500 border-fuchsia-700', 'bg-violet-500 border-violet-700', 'bg-pink-500 border-pink-700'],
      progressGradient: 'from-purple-500 to-pink-500',
      textColor: 'text-slate-200',
      mascot: '/assets/mascot-space.png',
      helper: '/assets/helper-stars.png',
      themeColor: 'bg-purple-600',
      seedName: 'Star',
      bud: '/assets/space/astro-1.png'
    }
  };

  const currentTheme = themeConfig[theme];

  // Generate a new problem based on level and difficulty
  const generateProblem = (currentLevel = level, currentDiff = difficulty) => {
    let n1, n2, correctAnswer, type = '+';
    let max = 10;

    // Difficulty adjusters for base numbers
    if (currentDiff === 'beginner') max = 5;
    if (currentDiff === 'intermediate') max = 15;
    if (currentDiff === 'advanced') max = 30;

    if (currentLevel === 1) {
      // Level 1: Addition (1-max)
      correctAnswer = Math.floor(Math.random() * (max - 1)) + 2;
      n1 = Math.floor(Math.random() * (correctAnswer - 1)) + 1;
      n2 = correctAnswer - n1;
    } else if (currentLevel === 2) {
      // Level 2: Addition (larger range)
      const levelMax = Math.floor(max * 1.5);
      correctAnswer = Math.floor(Math.random() * (levelMax - 1)) + 2;
      n1 = Math.floor(Math.random() * (correctAnswer - 1)) + 1;
      n2 = correctAnswer - n1;
    } else if (currentLevel === 3) {
      // Level 3: Subtraction (positive results)
      type = '-';
      n1 = Math.floor(Math.random() * max) + 5;
      n2 = Math.floor(Math.random() * n1) + 1;
      correctAnswer = n1 - n2;
    } else if (currentLevel === 4) {
      // Level 4: Subtraction (includes negative numbers)
      type = '-';
      n1 = Math.floor(Math.random() * max);
      n2 = Math.floor(Math.random() * max);
      correctAnswer = n1 - n2;
    } else if (currentLevel === 5) {
      // Level 5: Single Digit Multiplication
      type = '×';
      const multMax = currentDiff === 'beginner' ? 5 : currentDiff === 'intermediate' ? 9 : 12;
      n1 = Math.floor(Math.random() * multMax) + 1;
      n2 = Math.floor(Math.random() * multMax) + 1;
      correctAnswer = n1 * n2;
    } else if (currentLevel === 6) {
      // Level 6: Multiplication & Division
      const isDiv = Math.random() > 0.5;
      if (isDiv) {
        type = '÷';
        const divMax = currentDiff === 'beginner' ? 5 : currentDiff === 'intermediate' ? 10 : 12;
        correctAnswer = Math.floor(Math.random() * divMax) + 1;
        n2 = Math.floor(Math.random() * divMax) + 1;
        n1 = correctAnswer * n2;
      } else {
        type = '×';
        const multMax = currentDiff === 'beginner' ? 6 : currentDiff === 'intermediate' ? 10 : 15;
        n1 = Math.floor(Math.random() * multMax) + 1;
        n2 = Math.floor(Math.random() * multMax) + 1;
        correctAnswer = n1 * n2;
      }
    } else if (currentLevel === 7) {
      // Level 7: Addition & Subtraction Mix (larger numbers)
      const isAdd = Math.random() > 0.5;
      type = isAdd ? '+' : '-';
      const mixMax = max * 2;
      if (isAdd) {
        n1 = Math.floor(Math.random() * mixMax) + 1;
        n2 = Math.floor(Math.random() * mixMax) + 1;
        correctAnswer = n1 + n2;
      } else {
        n1 = Math.floor(Math.random() * mixMax) + mixMax;
        n2 = Math.floor(Math.random() * mixMax) + 1;
        correctAnswer = n1 - n2;
      }
    } else if (currentLevel === 8) {
      // Level 8: Multiplication Table Challenge
      type = '×';
      n1 = currentDiff === 'beginner' ? Math.floor(Math.random() * 5) + 5 : Math.floor(Math.random() * 10) + 5;
      n2 = Math.floor(Math.random() * 10) + 1;
      correctAnswer = n1 * n2;
    } else {
      // Level 9: Ultimate Mix
      const rand = Math.random();
      if (rand < 0.25) {
        type = '+'; n1 = Math.floor(Math.random() * 50); n2 = Math.floor(Math.random() * 50); correctAnswer = n1 + n2;
      } else if (rand < 0.5) {
        type = '-'; n1 = Math.floor(Math.random() * 100); n2 = Math.floor(Math.random() * 50); correctAnswer = n1 - n2;
      } else if (rand < 0.75) {
        type = '×'; n1 = Math.floor(Math.random() * 12); n2 = Math.floor(Math.random() * 12); correctAnswer = n1 * n2;
      } else {
        type = '÷'; correctAnswer = Math.floor(Math.random() * 12) + 1; n2 = Math.floor(Math.random() * 12) + 1; n1 = correctAnswer * n2;
      }
    }

    const optionsSet = new Set([correctAnswer]);
    while (optionsSet.size < 3) {
      const offset = Math.floor(Math.random() * 11) - 5; // +/- 5
      const fake = correctAnswer + offset;
      if (fake !== correctAnswer) optionsSet.add(fake);
      if (optionsSet.size < 3) optionsSet.add(correctAnswer + (Math.random() > 0.5 ? 10 : -10));
    }
    
    const optionsArray = Array.from(optionsSet).sort(() => Math.random() - 0.5);

    setProblem({ num1: n1, num2: n2, answer: correctAnswer, options: optionsArray, type });
    setFeedback({ message: '', type: '' });
    setHintedOptionIndex(null);
  };

  // Initialize first problem
  useEffect(() => {
    generateProblem();
  }, []);

  // Update target plant ONLY when theme changes or level completes
  useEffect(() => {
    setCurrentTargetPlant(plantAssets[theme][Math.floor(Math.random() * plantAssets[theme].length)]);
  }, [theme]);

  // Difficulty change should only update problem range, not target plant
  useEffect(() => {
    generateProblem();
  }, [difficulty]);

  const handleAnswer = (selected) => {
    if (selected === problem.answer) {
      setFeedback({ message: 'Correct!', type: 'success' });
      setIsAnimating(true);
      const newSeeds = seeds + 1;
      
      if (newSeeds >= 10) {
        window.confetti({ 
          particleCount: 200, 
          spread: 90, 
          origin: { y: 0.6 },
          colors: level === 1 ? ['#FDE047'] : level === 2 ? ['#FB923C'] : level === 3 ? ['#4ADE80'] : level === 4 ? ['#F43F5E'] : level === 5 ? ['#3B82F6'] : ['#A855F7']
        });
        setSeeds(10);
        setTimeout(() => {
          setGarden(prev => [...prev, currentTargetPlant]);
          const nextLevel = level < 9 ? level + 1 : 1;
          setLevel(nextLevel);
          setSeeds(0);
          // Pick a new target plant for the NEXT level
          setCurrentTargetPlant(plantAssets[theme][Math.floor(Math.random() * plantAssets[theme].length)]);
          setIsAnimating(false);
          generateProblem(nextLevel);
        }, 2000);
      } else {
        setSeeds(newSeeds);
        setTimeout(() => { setIsAnimating(false); generateProblem(); }, 1000);
      }
    } else {
      setFeedback({ message: 'Try again!', type: 'error' });
      setTimeout(() => setFeedback({ message: '', type: '' }), 1000);
    }
  };

  const handleHint = () => {
    if (hintedOptionIndex !== null) return;
    const incorrectIndices = problem.options
      .map((option, index) => (option !== problem.answer ? index : null))
      .filter((index) => index !== null);
    const randomIndex = incorrectIndices[Math.floor(Math.random() * incorrectIndices.length)];
    setHintedOptionIndex(randomIndex);
  };

  const confirmReset = () => {
    setLevel(1);
    setSeeds(0);
    setGarden([]);
    setShowResetModal(false);
    generateProblem(1);
  };

  const tiltAngle = 15 - (seeds * 3);

  return (
    <div className={`h-[100dvh] ${currentTheme.bg} flex flex-col items-center p-3 font-sans ${currentTheme.textColor || 'text-stone-800'} overflow-hidden relative transition-colors duration-500`}>
      
      {/* Side Difficulty Toggle */}
      <div className="fixed left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-40">
        {['beginner', 'intermediate', 'advanced'].map((d) => (
          <button
            key={d}
            onClick={() => setDifficulty(d)}
            className={`w-8 h-8 rounded-xl flex items-center justify-center text-[9px] font-black uppercase transition-all shadow-md border-b-2 
            ${difficulty === d ? 'bg-green-500 text-white scale-105 border-green-700' : 'bg-white text-stone-400 border-stone-200'}`}
            title={d}
          >
            {d[0]}
          </button>
        ))}
      </div>

      {/* Style Panel */}
      <div className="fixed right-2 top-2 z-40">
        <div className="bg-stone-800 p-1.5 rounded-full shadow-xl flex flex-col gap-2 border-2 border-stone-700">
          {['garden', 'ocean', 'space'].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`w-5 h-5 rounded-full transition-all duration-300 relative
              ${theme === t 
                ? `${themeConfig[t].themeColor} shadow-[0_0_10px_rgba(255,255,255,0.4)] scale-110` 
                : 'bg-stone-600 opacity-40'}`}
            />
          ))}
        </div>
      </div>
      
      {/* Header */}
      <header className="w-full max-w-md flex flex-col items-center mt-1 shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-10 h-10 ${currentTheme.headerBg} rounded-full flex items-center justify-center shadow-inner border-2 ${currentTheme.headerBorder} overflow-hidden`}>
            <img src={currentTheme.mascot} alt="mascot" className="w-8 h-8 object-contain" />
          </div>
          <div>
            <h1 className={`text-lg font-black ${currentTheme.accent} tracking-tight leading-none`}>Math Sprouts</h1>
            <div className={`mt-0.5 px-2 py-0 rounded-full text-[7px] font-black text-white uppercase inline-block
              ${level <= 3 ? 'bg-yellow-500' : level <= 6 ? 'bg-orange-500' : 'bg-rose-600'}`}>
              Level {level}
            </div>
          </div>
        </div>

        {/* Game Mode Switcher */}
        <div className="flex bg-white/50 p-0.5 rounded-full border border-green-100 shadow-sm mb-1">
          {['balance', 'garden', 'pollinator'].map(m => (
            <button 
              key={m}
              onClick={() => setGameMode(m)}
              className={`px-2.5 py-0.5 rounded-full text-[8px] font-bold transition-all whitespace-nowrap 
              ${gameMode === m ? 'bg-green-500 text-white shadow-sm' : 'text-green-700 hover:bg-green-100'}`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-md gap-3 py-1 overflow-hidden">
        
        {/* Problem Display */}
        <div className={`bg-white rounded-2xl p-4 shadow-lg border-b-4 ${currentTheme.problemBorder} w-full text-center relative z-10 shrink-0`}>
          <h2 className="text-4xl font-black text-stone-700 mb-1">
            {problem.num1} {problem.type} {problem.num2} = ?
          </h2>
          <div className={`h-6 flex items-center justify-center transition-opacity duration-300 ${feedback.message ? 'opacity-100' : 'opacity-0'}`}>
            <img src={feedback.type === 'success' ? '/assets/feedback-success.png' : '/assets/feedback-error.png'} alt={feedback.type} className="w-4 h-4 mr-1.5" />
            <p className={`text-sm font-bold ${feedback.type === 'success' ? 'text-green-500' : 'text-orange-400'}`}>
              {feedback.message}
            </p>
          </div>
          
          <button 
            onClick={handleHint}
            disabled={hintedOptionIndex !== null || isAnimating}
            className={`mt-2 px-3 py-1 rounded-full text-[8px] font-black uppercase transition-all border-b-2 
            ${hintedOptionIndex !== null 
              ? 'bg-stone-100 text-stone-300 border-stone-200' 
              : 'bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200'}`}
          >
            {hintedOptionIndex !== null ? 'Used ✨' : 'Hint? 💡'}
          </button>
        </div>

        {/* Answer Buttons */}
        <div className="flex gap-2.5 relative z-10 shrink-0">
          {problem.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={hintedOptionIndex === index || isAnimating}
              className={`
                w-14 h-14 rounded-full text-xl font-bold text-white shadow-md
                transform transition-all duration-200 active:scale-95
                ${currentTheme.btnColors[index]}
                ${hintedOptionIndex === index ? 'opacity-20 grayscale pointer-events-none' : ''}
              `}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Game Views */}
        <div className="w-full flex-1 flex items-center justify-center min-h-0">
          {gameMode === 'balance' && (
            <div className="w-full relative h-40 flex flex-col items-center justify-center">
              <div className={`absolute bottom-0 w-12 h-12 bg-blue-100 border-2 border-blue-200 rounded-full shadow-inner overflow-hidden transition-all duration-500 ${isAnimating ? 'animate-water-wobble' : ''}`}>
                <div className="absolute bottom-0 w-full h-1/2 bg-blue-300/30 blur-[1px]"></div>
              </div>
              <div className="absolute bottom-[35px] w-full max-w-[280px] h-4 bg-yellow-100 border-2 border-yellow-200 rounded-full transition-transform duration-700 ease-in-out origin-center flex items-center justify-between px-2 shadow-sm" style={{ transform: `rotate(${tiltAngle}deg)` }}>
                <div className="relative w-20 h-20 -mt-20 -ml-4 flex flex-wrap-reverse gap-0 items-end justify-center p-1">
                  {[...Array(seeds)].map((_, i) => (
                    <img 
                      key={i} 
                      src="/assets/balance-seed.png" 
                      alt="seed" 
                      className={`w-5 h-5 ${i === seeds - 1 && isAnimating ? 'animate-fall-lightly' : 'animate-bounce-light'}`} 
                      style={{ 
                        animationDelay: i === seeds - 1 && isAnimating ? '0s' : `${i * 0.1}s`, 
                        transform: `rotate(${-tiltAngle}deg)` 
                      }} 
                    />
                  ))}
                </div>
                <div className="relative w-20 h-20 -mt-20 -mr-4 flex flex-col items-center justify-end pb-1">
                  <img src={currentTargetPlant} alt="target" className="w-16 h-16 object-contain drop-shadow-md transform transition-transform duration-500" style={{ transform: `rotate(${-tiltAngle}deg)` }} />
                </div>
              </div>
              <p className="absolute bottom-[-15px] text-[7px] font-black text-green-600 bg-white/80 px-2 py-0.5 rounded-full border border-green-100 uppercase tracking-widest">
                {seeds} {currentTheme.seedName}{seeds !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          {gameMode === 'garden' && (
            <div className="relative flex flex-col items-center">
              <div className="transition-all duration-1000 ease-out transform origin-bottom" style={{ transform: `scale(${0.8 + seeds * 0.12})`, filter: isAnimating ? 'brightness(1.1)' : 'none' }}>
                <img src={currentTargetPlant} alt="growing plant" className="w-24 h-24 object-contain drop-shadow-lg" />
              </div>
              <div className="w-32 h-4 bg-stone-200 rounded-full mt-2 shadow-inner border-2 border-stone-300"></div>
              <p className="text-stone-400 text-[8px] font-black mt-1 uppercase tracking-widest">Growing...</p>
            </div>
          )}

          {gameMode === 'pollinator' && (
            <div className="relative w-full h-48 flex flex-col items-center justify-center">
              <div className="relative z-0">
                <div className={`transition-all duration-1000 ${seeds >= 10 ? 'scale-110' : 'scale-100'}`}>
                  <div className="relative flex items-center justify-center">
                    {seeds < 10 && <div className="absolute inset-0 flex items-center justify-center animate-pulse opacity-30"><div className="w-24 h-24 bg-rose-100 rounded-full blur-lg"></div></div>}
                    <img 
                      src={currentTargetPlant} 
                      alt="pollinator plant" 
                      className={`w-24 h-24 object-contain drop-shadow-lg transition-all duration-1000 
                      ${seeds < 10 ? 'filter saturate-[0.2] brightness-125 scale-75' : 'filter saturate-100'}`}
                    />
                  </div>
                </div>
                {isAnimating && <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"><div className="w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div></div>}
              </div>
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(seeds)].map((_, i) => (
                  <div key={i} className="absolute w-full h-full animate-bee-circle" style={{ animationDuration: `${3 + (i % 2)}s`, animationDelay: `${-i * 0.5}s`, zIndex: 10 }}>
                    <div className="absolute left-1/2 top-0" style={{ transform: 'translateX(-50%)' }}>
                      <img src={currentTheme.helper} alt="helper" className="w-8 h-8 object-contain" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 bg-white/60 px-2 py-0.5 rounded-full border border-yellow-100 text-[7px] font-black text-yellow-700 uppercase tracking-widest">{seeds} Helping Hand{seeds !== 1 ? 's' : ''}</p>
            </div>
          )}
        </div>
      </main>

      {/* Shared Garden Visuals */}
      <div className="w-full max-w-md bg-stone-100/90 rounded-t-2xl p-2.5 border-t-2 border-green-200 min-h-[80px] shrink-0 shadow-lg relative">
        <p className="text-center text-stone-500 text-[8px] font-black uppercase tracking-widest mb-1.5">My Collection</p>
        <div className="flex flex-wrap justify-center gap-2">
          {garden.length === 0 && <p className="text-stone-400 text-[9px] italic font-medium text-center">Collection is empty!</p>}
          {garden.map((plantImg, i) => (
            <div key={i} className="w-9 h-9 flex items-center justify-center animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
              <img src={plantImg} alt="collection item" className="w-full h-full object-contain drop-shadow-sm" />
            </div>
          ))}
        </div>
        <button onClick={() => setShowResetModal(true)} className="absolute top-1 right-2 text-[7px] font-bold text-stone-300 hover:text-stone-500 uppercase tracking-tighter">Reset</button>
      </div>

      {/* Shared Footer */}
      <footer className="w-full max-w-md pb-2 pt-1.5 bg-white px-3 rounded-b-2xl shadow-xl border-x-2 border-b-2 border-stone-200 shrink-0">
        <div className="flex justify-between items-end mb-0.5 px-1">
          <span className="text-[8px] font-black text-stone-500 uppercase tracking-wider">Progress</span>
          <span className="text-[8px] font-black text-stone-600">{seeds * 10}%</span>
        </div>
        <div className="w-full h-3.5 bg-stone-100 rounded-full p-0.5 border-2 border-stone-200 shadow-inner overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-700 ease-out shadow-sm bg-gradient-to-r ${currentTheme.progressGradient}`} style={{ width: `${seeds * 10}%` }}></div>
        </div>
      </footer>

      {/* Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-stone-800/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[30px] p-6 max-w-[240px] w-full shadow-2xl border-b-4 border-rose-100 animate-bubble-pop text-center">
            <p className="text-xl font-black text-stone-700 mb-4 leading-tight">Go back to level 1?</p>
            <div className="flex gap-3">
              <button onClick={confirmReset} className="flex-1 bg-rose-400 text-white font-black py-2 rounded-xl shadow-md border-b-4 border-rose-600 active:scale-95">Yes!</button>
              <button onClick={() => setShowResetModal(false)} className="flex-1 bg-stone-100 text-stone-500 font-black py-2 rounded-xl shadow-md border-b-4 border-stone-300 active:scale-95">No</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes water-wobble { 0%, 100% { transform: scale(1, 1) translateY(0); } 25% { transform: scale(1.1, 0.9) translateY(1px); } 50% { transform: scale(0.9, 1.1) translateY(-1px); } 75% { transform: scale(1.05, 0.95) translateY(0.5px); } }
        .animate-water-wobble { animation: water-wobble 0.8s ease-in-out; }
        @keyframes bee-circle { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-bee-circle { animation: bee-circle linear infinite; }
        @keyframes bubble-pop { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
        .animate-bubble-pop { animation: bubble-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes fall-lightly { 0% { transform: translateY(-80px); opacity: 0; } 60% { transform: translateY(3px); opacity: 1; } 100% { transform: translateY(0); } }
        .animate-fall-lightly { animation: fall-lightly 0.8s ease-out forwards; }
        @keyframes bounce-light { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
        .animate-bounce-light { animation: bounce-light 2s infinite ease-in-out; }
      `}</style>
    </div>
  );
}

export default App;
