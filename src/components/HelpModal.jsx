import React, { useEffect, useState } from 'react';

export default function HelpModal({ onClose }) {
  const [tab, setTab] = useState('parents');

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose && onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-stone-900/40" onClick={() => onClose && onClose()} />
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-4 sm:p-6 max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <h3 className="text-xl sm:text-2xl font-black">Help</h3>
          <button onClick={() => onClose && onClose()} className="w-8 h-8 sm:w-9 sm:h-9 bg-stone-100 rounded-full flex items-center justify-center font-black text-stone-500 shrink-0">✕</button>
        </div>

        <div className="flex gap-2 mb-3 sm:mb-4 flex-wrap">
          <button onClick={() => setTab('parents')} className={`px-3 py-1 rounded-full font-black text-xs sm:text-sm ${tab === 'parents' ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'}`}>For Parents</button>
          <button onClick={() => setTab('kids')} className={`px-3 py-1 rounded-full font-black text-xs sm:text-sm ${tab === 'kids' ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'}`}>For Kids</button>
        </div>

        <div className="text-stone-700 leading-relaxed text-sm sm:text-[15px]">
          {tab === 'parents' ? (
            <div className="space-y-2 sm:space-y-3">
              <h4 className="font-bold text-base sm:text-lg">What Math Sprouts is</h4>
              <p>Short daily practice builds confidence.</p>

              <h4 className="font-bold text-sm sm:text-base">How to run a session</h4>
              <ul className="list-disc ml-4 sm:ml-5 space-y-1">
                <li>Choose a skill/difficulty (if available), set the practice timer, then Start.</li>
              </ul>

              <h4 className="font-bold text-sm sm:text-base">Timer guidance</h4>
              <ul className="list-disc ml-4 sm:ml-5 space-y-1">
                <li>Recommended: 5–10 minutes for younger kids, 10–15 for older kids.</li>
                <li>Stop while they are still doing well.</li>
              </ul>

              <h4 className="font-bold text-sm sm:text-base">Support tips</h4>
              <ul className="list-disc ml-4 sm:ml-5 space-y-1">
                <li>Encourage effort, allow mistakes, and read questions aloud if needed.</li>
                <li>If frustration rises: shorten the session and celebrate completion.</li>
              </ul>

              <h4 className="font-bold text-sm sm:text-base">Troubleshooting</h4>
              <ul className="list-disc ml-4 sm:ml-5 space-y-1">
                <li>If something looks stuck: refresh the page.</li>
                <li>If sound isn't working: check device volume and browser autoplay settings.</li>
              </ul>

              <h4 className="font-bold text-sm sm:text-base">Motivation</h4>
              <ul className="list-disc ml-4 sm:ml-5 space-y-1">
                <li>Praise consistency over score.</li>
                <li>Keep sessions consistent — same time each day helps.</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              <h4 className="font-bold text-sm sm:text-base">What to do</h4>
              <ul className="list-disc ml-4 sm:ml-5 space-y-1">
                <li>Pick a game/lesson, try your best, and tap an answer.</li>
              </ul>

              <h4 className="font-bold text-sm sm:text-base">It's okay to be wrong</h4>
              <ul className="list-disc ml-4 sm:ml-5 space-y-1">
                <li>Mistakes help your brain grow.</li>
              </ul>

              <h4 className="font-bold text-sm sm:text-base">Quick tips</h4>
              <ul className="list-disc ml-4 sm:ml-5 space-y-1">
                <li>Take your time — use your fingers to count if you want.</li>
                <li>If it feels hard, ask a grown-up for help.</li>
              </ul>

              <h4 className="font-bold text-sm sm:text-base">Encouragement</h4>
              <p>Every day you practice, you get stronger at math.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
