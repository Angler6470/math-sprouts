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
  const [currentTargetPlant, setCurrentTargetPlant] = useState('🌱');
  const [showResetModal, setShowResetModal] = useState(false);

  // Customization Assets
  const plantEmojis = {
    garden: ['🌱', '🌿', '🌻', '🌷', '🌼', '🌵', '🌴', '🍀'],
    ocean: ['🐚', '🐙', '🐠', '🦀', '🐳', '🐡', '🐬', '🦞'],
    space: ['🚀', '🛰️', '🛸', '☄️', '🪐', '🌟', '👾', '👨‍🚀']
  };

  const themeConfig = {
    garden: {
      bg: 'bg-green-50',
      accent: 'text-green-700',
      headerBg: 'bg-yellow-200',
      headerBorder: 'border-yellow-400',
      problemBorder: 'border-green-200',
      btnColors: ['bg-rose-400 border-rose-600', 'bg-sky-400 border-sky-600', 'bg-amber-400 border-amber-600'],
      progressGradient: 'from-green-400 to-yellow-400'
    },
    ocean: {
      bg: 'bg-cyan-50',
      accent: 'text-cyan-700',
      headerBg: 'bg-blue-200',
      headerBorder: 'border-blue-400',
      problemBorder: 'border-cyan-200',
      btnColors: ['bg-teal-400 border-teal-600', 'bg-blue-400 border-blue-600', 'bg-indigo-400 border-indigo-600'],
      progressGradient: 'from-cyan-400 to-blue-400'
    },
    space: {
      bg: 'bg-slate-900',
      accent: 'text-purple-400',
      headerBg: 'bg-purple-900',
      headerBorder: 'border-purple-500',
      problemBorder: 'border-purple-800',
      btnColors: ['bg-fuchsia-500 border-fuchsia-700', 'bg-violet-500 border-violet-700', 'bg-pink-500 border-pink-700'],
      progressGradient: 'from-purple-500 to-pink-500',
      textColor: 'text-slate-200'
    }
  };

  const currentTheme = themeConfig[theme];

  // Generate a new problem based on level and difficulty
  const generateProblem = (currentLevel = level, currentDiff = difficulty) => {
    let n1, n2, correctAnswer, type = '+';
    let max = 10;

    // Difficulty adjusters
    if (currentDiff === 'beginner') max = 5;
    if (currentDiff === 'intermediate') max = 15;
    if (currentDiff === 'advanced') max = 30;

    if (currentLevel === 1) {
      // Level 1: Addition (1-max)
      correctAnswer = Math.floor(Math.random() * (max - 1)) + 2;
      n1 = Math.floor(Math.random() * (correctAnswer - 1)) + 1;
      n2 = correctAnswer - n1;
    } else if (currentLevel === 2) {
      // Level 2: Addition (1-max*1.5)
      max = Math.floor(max * 1.5);
      correctAnswer = Math.floor(Math.random() * (max - 1)) + 2;
      n1 = Math.floor(Math.random() * (correctAnswer - 1)) + 1;
      n2 = correctAnswer - n1;
    } else {
      // Level 3: Subtraction
      type = '-';
      n1 = Math.floor(Math.random() * max) + 5;
      n2 = Math.floor(Math.random() * n1) + 1;
      correctAnswer = n1 - n2;
    }

    const optionsSet = new Set([correctAnswer]);
    while (optionsSet.size < 3) {
      const offset = Math.floor(Math.random() * 5) - 2;
      const fake = Math.max(0, correctAnswer + offset);
      if (fake !== correctAnswer) optionsSet.add(fake);
      if (optionsSet.size < 3) optionsSet.add(Math.floor(Math.random() * (max + 5)));
    }
    
    const optionsArray = Array.from(optionsSet).sort(() => Math.random() - 0.5);

    setProblem({ num1: n1, num2: n2, answer: correctAnswer, options: optionsArray, type });
    setFeedback({ message: '', type: '' });
  };

  useEffect(() => {
    generateProblem();
    setCurrentTargetPlant(plantEmojis[theme][Math.floor(Math.random() * plantEmojis[theme].length)]);
  }, [difficulty, theme]);

  const handleAnswer = (selected) => {
    if (selected === problem.answer) {
      setFeedback({ message: 'Correct! 🌟', type: 'success' });
      setIsAnimating(true);
      const newSeeds = seeds + 1;
      
      if (newSeeds >= 10) {
        window.confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
        setSeeds(10);
        setTimeout(() => {
          setGarden(prev => [...prev, currentTargetPlant]);
          const nextLevel = level < 3 ? level + 1 : 1;
          setLevel(nextLevel);
          setSeeds(0);
          setCurrentTargetPlant(plantEmojis[theme][Math.floor(Math.random() * plantEmojis[theme].length)]);
          setIsAnimating(false);
          generateProblem(nextLevel);
        }, 2000);
      } else {
        setSeeds(newSeeds);
        setTimeout(() => { setIsAnimating(false); generateProblem(); }, 1000);
      }
    } else {
      setFeedback({ message: 'Try again! 🌱', type: 'error' });
      setTimeout(() => setFeedback({ message: '', type: '' }), 1000);
    }
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
    <div className={`min-h-screen ${currentTheme.bg} flex flex-col items-center p-4 font-sans ${currentTheme.textColor || 'text-stone-800'} overflow-hidden relative transition-colors duration-500`}>
      
      {/* Side Difficulty Toggle */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40">
        {['beginner', 'intermediate', 'advanced'].map((d) => (
          <button
            key={d}
            onClick={() => setDifficulty(d)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase transition-all shadow-lg border-b-4 
            ${difficulty === d ? 'bg-green-500 text-white scale-110 border-green-700' : 'bg-white text-stone-400 border-stone-200 hover:bg-stone-50'}`}
            title={d}
          >
            {d[0]}
          </button>
        ))}
        <p className="text-[8px] font-black text-stone-400 uppercase text-center mt-1">Difficulty</p>
      </div>

      {/* Style Panel */}
      <div className="fixed right-4 top-4 flex flex-col gap-2 z-40">
        <div className="bg-white/80 backdrop-blur-sm p-2 rounded-3xl border border-white/50 shadow-xl flex flex-col gap-2">
          {['garden', 'ocean', 'space'].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all
              ${theme === t ? 'scale-125 shadow-md ring-2 ring-white ring-offset-2 ring-offset-green-200' : 'opacity-50 hover:opacity-100'}`}
            >
              {t === 'garden' ? '🌳' : t === 'ocean' ? '🌊' : '🚀'}
            </button>
          ))}
        </div>
      </div>
      
      {/* Header */}
      <header className="w-full max-w-md flex flex-col items-center mt-2">
        <div className="flex items-center gap-4 mb-2">
          <div className={`w-12 h-12 ${currentTheme.headerBg} rounded-full flex items-center justify-center shadow-inner border-2 ${currentTheme.headerBorder}`}>
            <span className="text-2xl" role="img" aria-label="mascot">
              {theme === 'garden' ? '🐥' : theme === 'ocean' ? '🐠' : '👾'}
            </span>
          </div>
          <div>
            <h1 className={`text-xl font-black ${currentTheme.accent} tracking-tight leading-none`}>Math Sprouts</h1>
            <div className={`mt-1 px-3 py-0.5 rounded-full text-[8px] font-black text-white uppercase inline-block
              ${level === 1 ? 'bg-yellow-500' : level === 2 ? 'bg-orange-500' : 'bg-green-600'}`}>
              Level {level}
            </div>
          </div>
        </div>

        {/* Game Mode Switcher */}
        <div className="flex bg-white/50 p-1 rounded-full border border-green-100 shadow-sm mb-2">
          {['balance', 'garden', 'pollinator'].map(m => (
            <button 
              key={m}
              onClick={() => setGameMode(m)}
              className={`px-3 py-1 rounded-full text-[9px] font-bold transition-all whitespace-nowrap 
              ${gameMode === m ? 'bg-green-500 text-white shadow-md' : 'text-green-700 hover:bg-green-100'}`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex flex-col items-center justify-start w-full max-w-md pt-4">
        
        {/* Problem Display */}
        <div className={`bg-white rounded-3xl p-6 shadow-xl border-b-8 ${currentTheme.problemBorder} mb-6 w-full text-center relative z-10`}>
          <h2 className="text-5xl font-black text-stone-700 mb-2">
            {problem.num1} {problem.type} {problem.num2} = ?
          </h2>
          <div className={`h-6 transition-opacity duration-300 ${feedback.message ? 'opacity-100' : 'opacity-0'}`}>
            <p className={`text-lg font-bold ${feedback.type === 'success' ? 'text-green-500' : 'text-orange-400'}`}>
              {feedback.message}
            </p>
          </div>
        </div>

        {/* Answer Buttons */}
        <div className="flex gap-3 mb-8 relative z-10">
          {problem.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`
                w-16 h-16 rounded-full text-2xl font-bold text-white shadow-lg
                transform transition-all duration-200 active:scale-95 hover:scale-110
                ${currentTheme.btnColors[index]}
              `}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Game Views */}
        <div className="w-full flex justify-center items-center min-h-[250px]">
          {gameMode === 'balance' && (
            <div className="w-full relative h-48 flex flex-col items-center justify-center mt-4">
              <div className={`absolute bottom-0 w-16 h-16 bg-blue-100 border-4 border-blue-200 rounded-full shadow-inner overflow-hidden transition-all duration-500 ${isAnimating ? 'animate-water-wobble' : ''}`}>
                <div className="absolute bottom-0 w-full h-1/2 bg-blue-300/30 blur-[2px]"></div>
              </div>
              <div className="absolute bottom-[45px] w-full max-w-[340px] h-5 bg-yellow-100 border-2 border-yellow-200 rounded-full transition-transform duration-700 ease-in-out origin-center flex items-center justify-between px-2 shadow-sm" style={{ transform: `rotate(${tiltAngle}deg)` }}>
                <div className="relative w-28 h-28 -mt-28 -ml-6 flex flex-wrap-reverse gap-0 items-end justify-center p-2">
                  {[...Array(seeds)].map((_, i) => (
                    <span key={i} className="text-2xl animate-bounce" style={{ animationDelay: `${i * 0.1}s`, transform: `rotate(${-tiltAngle}deg)` }}>🌱</span>
                  ))}
                  <div className="absolute -bottom-2 w-full h-3 bg-green-200/50 rounded-full blur-sm"></div>
                </div>
                <div className="relative w-28 h-28 -mt-28 -mr-6 flex flex-col items-center justify-end pb-2">
                  <span className="text-6xl drop-shadow-md transform transition-transform duration-500" style={{ transform: `rotate(${-tiltAngle}deg)` }}>{currentTargetPlant}</span>
                  <div className="absolute -bottom-2 w-full h-3 bg-stone-200/50 rounded-full blur-sm"></div>
                </div>
              </div>
              <div className="absolute bottom-[-20px] w-full flex justify-start pl-8">
                <p className="text-[10px] font-black text-green-600 bg-white/80 px-3 py-1 rounded-full shadow-sm uppercase tracking-widest border border-green-100">{seeds} {theme === 'ocean' ? 'Pearls' : theme === 'space' ? 'Stars' : 'Sprouts'}</p>
              </div>
            </div>
          )}

          {gameMode === 'garden' && (
            <div className="relative flex flex-col items-center">
              <div className="transition-all duration-1000 ease-out transform origin-bottom" style={{ transform: `scale(${1 + seeds * 0.15})`, filter: isAnimating ? 'brightness(1.1)' : 'none' }}>
                <span className="text-8xl drop-shadow-xl" role="img">{currentTargetPlant}</span>
              </div>
              <div className="w-40 h-6 bg-stone-200 rounded-full mt-4 shadow-inner border-2 border-stone-300"></div>
              <p className="text-stone-400 text-xs font-black mt-3 uppercase tracking-widest">Growing...</p>
            </div>
          )}

          {gameMode === 'pollinator' && (
            <div className="relative w-full h-64 flex flex-col items-center justify-center">
              <div className="relative z-0">
                <div className={`transition-all duration-1000 ${seeds >= 10 ? 'scale-125 rotate-12' : 'scale-100'}`}>
                  <div className="relative flex items-center justify-center">
                    {seeds < 10 && <div className="absolute inset-0 flex items-center justify-center animate-pulse opacity-30"><div className="w-32 h-32 bg-rose-100 rounded-full blur-xl"></div></div>}
                    <span className={`text-9xl drop-shadow-lg transition-all duration-1000 ${seeds < 10 ? 'filter saturate-[0.2] brightness-125 scale-75' : 'filter saturate-100'}`}>{currentTargetPlant}</span>
                  </div>
                </div>
                {isAnimating && <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"><div className="w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div></div>}
              </div>
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(seeds)].map((_, i) => (
                  <div key={i} className="absolute w-full h-full animate-bee-circle" style={{ animationDuration: `${3 + (i % 2)}s`, animationDelay: `${-i * 0.5}s`, zIndex: 10 }}>
                    <span className="absolute left-1/2 top-0 text-2xl" style={{ transform: 'translateX(-50%)' }}>
                      {theme === 'garden' ? '🐝' : theme === 'ocean' ? '🐠' : '✨'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 bg-white/60 px-4 py-1 rounded-full border border-yellow-100">
                <p className="text-[10px] font-black text-yellow-700 uppercase tracking-widest">{seeds} Helping Hands</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Shared Garden Visuals */}
      <div className="w-full max-w-md bg-stone-100/90 rounded-t-3xl p-4 border-t-4 border-green-200 min-h-[110px] mt-auto shadow-2xl relative">
        <p className="text-center text-stone-500 text-[10px] font-black uppercase tracking-widest mb-3">My Collection</p>
        <div className="flex flex-wrap justify-center gap-3">
          {garden.length === 0 && <p className="text-stone-400 text-sm italic font-medium text-center">Your collection is empty!</p>}
          {garden.map((plant, i) => (
            <span key={i} className="text-4xl animate-bounce drop-shadow-sm" style={{ animationDelay: `${i * 0.2}s` }}>{plant}</span>
          ))}
        </div>
        <button onClick={() => setShowResetModal(true)} className="absolute top-2 right-4 text-[8px] font-bold text-stone-300 hover:text-stone-500 uppercase tracking-tighter">Reset</button>
      </div>

      {/* Shared Footer */}
      <footer className="w-full max-w-md pb-4 pt-2 bg-white px-4 rounded-b-3xl shadow-lg border-x-2 border-b-4 border-stone-200">
        <div className="flex justify-between items-end mb-1 px-2">
          <span className="text-[10px] font-black text-stone-500 uppercase tracking-wider">Progress</span>
          <span className="text-[10px] font-black text-stone-600">{seeds * 10}%</span>
        </div>
        <div className="w-full h-5 bg-stone-100 rounded-full p-1 border-2 border-stone-200 shadow-inner overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-700 ease-out shadow-sm bg-gradient-to-r ${currentTheme.progressGradient}`} style={{ width: `${seeds * 10}%` }}></div>
        </div>
      </footer>

      {/* Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-stone-800/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] p-8 max-w-xs w-full shadow-2xl border-b-8 border-rose-100 animate-bubble-pop">
            <p className="text-2xl font-black text-stone-700 text-center mb-6 leading-tight">Go back to level 1?</p>
            <div className="flex gap-4">
              <button onClick={confirmReset} className="flex-1 bg-rose-400 hover:bg-rose-500 text-white font-black py-3 rounded-2xl shadow-lg border-b-4 border-rose-600 transition-all active:scale-95">Yes!</button>
              <button onClick={() => setShowResetModal(false)} className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-500 font-black py-3 rounded-2xl shadow-lg border-b-4 border-stone-300 transition-all active:scale-95">No</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes water-wobble { 0%, 100% { transform: scale(1, 1) translateY(0); } 25% { transform: scale(1.1, 0.9) translateY(2px); } 50% { transform: scale(0.9, 1.1) translateY(-2px); } 75% { transform: scale(1.05, 0.95) translateY(1px); } }
        .animate-water-wobble { animation: water-wobble 0.8s ease-in-out; }
        @keyframes bee-circle { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-bee-circle { animation: bee-circle linear infinite; }
        @keyframes bubble-pop { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
        .animate-bubble-pop { animation: bubble-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default App;
