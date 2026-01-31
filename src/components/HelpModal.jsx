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
    <div className="fixed inset-0 z-[110] flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-stone-900/40" onClick={() => onClose && onClose()} />
      <div className="relative z-10 w-[92%] max-w-2xl bg-white rounded-2xl shadow-2xl p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-2xl font-black">Help</h3>
          <button onClick={() => onClose && onClose()} className="w-9 h-9 bg-stone-100 rounded-full flex items-center justify-center font-black text-stone-500">✕</button>
        </div>

        <div className="flex gap-2 mb-4">
          <button onClick={() => setTab('parents')} className={`px-3 py-1 rounded-full font-black ${tab === 'parents' ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'}`}>For Parents</button>
          <button onClick={() => setTab('kids')} className={`px-3 py-1 rounded-full font-black ${tab === 'kids' ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'}`}>For Kids</button>
        </div>

        <div className="text-stone-700 leading-relaxed text-[15px]">
          {tab === 'parents' ? (
            <div className="space-y-3">
              <h4 className="font-bold text-lg">What Math Sprouts is</h4>
              <p>Short daily practice builds confidence.</p>

              <h4 className="font-bold">How to run a session</h4>
              <ul className="list-disc ml-5">
                <li>Choose a skill/difficulty (if available), set the practice timer, then Start.</li>
              </ul>

              <h4 className="font-bold">Timer guidance</h4>
              <ul className="list-disc ml-5">
                <li>Recommended: 5–10 minutes for younger kids, 10–15 for older kids.</li>
                <li>Stop while they are still doing well.</li>
              </ul>

              <h4 className="font-bold">Support tips</h4>
              <ul className="list-disc ml-5">
                <li>Encourage effort, allow mistakes, and read questions aloud if needed.</li>
                <li>If frustration rises: shorten the session and celebrate completion.</li>
              </ul>

              <h4 className="font-bold">Troubleshooting</h4>
              <ul className="list-disc ml-5">
                <li>If something looks stuck: refresh the page.</li>
                <li>If sound isn’t working: check device volume and browser autoplay settings.</li>
              </ul>

              <h4 className="font-bold">Motivation</h4>
              <ul className="list-disc ml-5">
                <li>Praise consistency over score.</li>
                <li>Keep sessions consistent — same time each day helps.</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-3 text-[16px]">
              <h4 className="font-bold">What to do</h4>
              <ul className="list-disc ml-5">
                <li>Pick a game/lesson, try your best, and tap an answer.</li>
              </ul>

              <h4 className="font-bold">It’s okay to be wrong</h4>
              <ul className="list-disc ml-5">
                <li>Mistakes help your brain grow.</li>
              </ul>

              <h4 className="font-bold">Quick tips</h4>
              <ul className="list-disc ml-5">
                <li>Take your time — use your fingers to count if you want.</li>
                <li>If it feels hard, ask a grown-up for help.</li>
              </ul>

              <h4 className="font-bold">Encouragement</h4>
              <p>Every day you practice, you get stronger at math.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
