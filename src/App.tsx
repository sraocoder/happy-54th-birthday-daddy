import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Timing configuration based on the user's Tum Hi Ho layout
// Each scene's delay is roughly mapped to when it should enter, relative to presentation start
const TIMELINE = [
  { scene: 1, enterAt: 0, duration: 4000 },       // Soft Intro starts
  { scene: 2, enterAt: 6000, duration: 4000 },    // ~0:06
  { scene: 3, enterAt: 12000, duration: 4000 },   // ~0:12

  { scene: 4, enterAt: 20000, duration: 3000 },   // ~0:20 - Music slightly builds
  { scene: 5, enterAt: 25000, duration: 3000 },   // ~0:25
  { scene: 6, enterAt: 30000, duration: 4000 },   // ~0:30

  { scene: 7, enterAt: 40000, duration: 5000 },   // ~0:40 - Emotional Rise Begins
  { scene: 8, enterAt: 48000, duration: 10000 },  // ~0:48

  { scene: 9, enterAt: 65000, duration: 6000 },   // ~1:05 - Music Swells

  { scene: 10, enterAt: 80000, duration: 10000 }, // ~1:20 - Strong Finish
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [scene, setScene] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const voiceoverRef = useRef<HTMLAudioElement>(null);

  const startPresentation = () => {
    setStarted(true);

    // Play audio
    if (audioRef.current) {
      audioRef.current.volume = 0.80;
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
    if (voiceoverRef.current) {
      voiceoverRef.current.volume = 1.0;
      voiceoverRef.current.play().catch(e => console.error("Voiceover play failed:", e));
    }

    // Schedule entire timeline
    TIMELINE.forEach((event) => {
      setTimeout(() => {
        setScene(event.scene);
      }, event.enterAt);

      // Hide the scene after its duration, unless it's the last one
      if (event.scene < 10) {
        setTimeout(() => {
          setScene(0); // Fade to black briefly
        }, event.enterAt + event.duration);
      }
    });
  };

  // Define photo mapping for each scene (1-10)
  // To add a photo for a scene, put the image file in the public/ folder (e.g., public/scene2.jpg)
  // and update the filename here. If null, no photo is shown.
  const scenePhotos: Record<number, string | null> = {
    1: null,
    2: 'scene2.jpg',
    3: 'scene3.jpg',
    4: null,
    5: 'scene5.jpg',
    6: null,
    7: 'scene7.jpg',
    8: 'scene8.jpg',
    9: 'scene9.jpg',
    10: 'scene10.jpg',
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center overflow-hidden selection:bg-gold/20 relative">
      <audio ref={audioRef} src="background-music.webm" />
      <audio ref={voiceoverRef} src="voiceover.mp3" />

      {/* Background Images with Ken Burns & Filters (Brightness +15%, Sepia for warmth) */}
      <AnimatePresence mode="popLayout">
        {started && scene > 0 && scenePhotos[scene] && (
          <motion.img
            key={`bg-${scene}`}
            src={scenePhotos[scene]!}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.85, scale: 1.15, transition: { duration: 15, ease: "linear" } }}
            exit={{ opacity: 0, transition: { duration: 2 } }}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0 mix-blend-luminosity brightness-150 sepia-[.15]"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-background/20 z-0 pointer-events-none transition-all duration-1000"></div>

      {/* Abstract Texture Overlay */}
      <div className="absolute inset-0 subtle-texture opacity-30 pointer-events-none transition-opacity duration-[3000ms] z-0"></div>

      {/* Start Sequence */}
      <AnimatePresence mode="wait">
        {!started && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            className="flex flex-col items-center justify-center z-10"
          >
            <button
              onClick={(e) => { e.stopPropagation(); startPresentation(); }}
              className="px-10 py-4 border border-gold/30 rounded-none text-gold uppercase tracking-[0.2em] font-sans text-sm hover:bg-gold/5 hover:border-gold/60 transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
              Begin
            </button>
            <p className="mt-8 text-white/30 font-sans text-xs uppercase tracking-[0.3em] text-center max-w-sm leading-relaxed">
              Please turn on your sound. <br /> Replace audio in public/ folder.
            </p>
          </motion.div>
        )}

        {/* SCENE 1: Opening */}
        {scene === 1 && (
          <motion.div
            key="scene-1"
            initial={{ opacity: 0, filter: 'blur(5px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)', transition: { duration: 2, ease: "easeOut" } }}
            exit={{ opacity: 0, filter: 'blur(5px)', transition: { duration: 2 } }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-slate-50 tracking-wider gold-glow drop-shadow-2xl font-normal">
              54 Years.
            </h1>
          </motion.div>
        )}

        {/* SCENE 2: Hard Work */}
        {scene === 2 && (
          <motion.div
            key="scene-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 2.5, ease: "easeOut" } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 2 } }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-gold tracking-wide drop-shadow-2xl text-center">
              Of Hard Work.
            </h2>
          </motion.div>
        )}

        {/* SCENE 3: Sacrifice */}
        {scene === 3 && (
          <motion.div
            key="scene-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 2.5, ease: "easeInOut" } }}
            exit={{ opacity: 0, transition: { duration: 2 } }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-slate-50 tracking-wide font-light text-center drop-shadow-2xl">
              Of Sacrifice.
            </h2>
          </motion.div>
        )}

        {/* SCENE 4: First Joke */}
        {scene === 4 && (
          <motion.div
            key="scene-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.5, ease: "easeOut" } }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-slate-100 tracking-wide text-center leading-relaxed max-w-4xl px-8 drop-shadow-lg">
              Of Never Leaving Us Alone.
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 2.5 }}
                className="block mt-4 text-gold font-normal italic"
              >
                Ever.
              </motion.span>
            </h2>
          </motion.div>
        )}

        {/* SCENE 5: Accent Joke */}
        {scene === 5 && (
          <motion.div
            key="scene-5"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1.8, ease: "easeOut" } }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-gold tracking-wide text-center leading-relaxed max-w-5xl px-8 drop-shadow-lg">
              Of an Accent That Could Negotiate World Peace.
            </h2>
          </motion.div>
        )}

        {/* SCENE 6: Music Joke */}
        {scene === 6 && (
          <motion.div
            key="scene-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.5 } }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 space-y-8"
          >
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-slate-100 tracking-wide text-center leading-relaxed max-w-4xl px-8 drop-shadow-lg">
              And Music Compositions That...
            </h2>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
              className="font-serif text-2xl md:text-4xl lg:text-5xl text-gold tracking-wide text-center italic drop-shadow-lg"
            >
              Should Stay Unreleased.
            </motion.h2>
          </motion.div>
        )}

        {/* SCENE 7: Emotional Shift */}
        {scene === 7 && (
          <motion.div
            key="scene-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 3, ease: "easeInOut" } }}
            exit={{ opacity: 0, transition: { duration: 2 } }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            {/* Warmer overlay */}
            <div className="absolute inset-0 bg-gold/5 mix-blend-overlay pointer-events-none"></div>

            <h3 className="font-serif text-xl md:text-3xl lg:text-4xl text-slate-100 tracking-widest font-light text-center leading-loose max-w-4xl px-8 uppercase drop-shadow-xl z-20">
              The older we get, the more we understand<br /> what you’ve carried.
            </h3>
          </motion.div>
        )}

        {/* SCENE 8: Sacrifice Detail */}
        {scene === 8 && (
          <motion.div
            key="scene-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 2 } }}
            exit={{ opacity: 0, transition: { duration: 2 } }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 space-y-16"
          >
            <motion.h3
              initial={{ opacity: 0, filter: 'blur(3px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 2.5, delay: 0.5 }}
              className="font-serif text-3xl md:text-5xl text-slate-200 tracking-wider text-center drop-shadow-lg font-light"
            >
              The stress.
            </motion.h3>
            <motion.h3
              initial={{ opacity: 0, filter: 'blur(3px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 2.5, delay: 3.5 }}
              className="font-serif text-3xl md:text-5xl text-slate-200 tracking-wider text-center drop-shadow-lg font-light"
            >
              The responsibility.
            </motion.h3>
            <motion.h3
              initial={{ opacity: 0, filter: 'blur(3px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 3, delay: 6.5 }}
              className="font-serif text-3xl md:text-5xl text-gold tracking-wider text-center italic drop-shadow-lg font-normal"
            >
              The sacrifices you never complained about.
            </motion.h3>
          </motion.div>
        )}

        {/* SCENE 9: Legacy Line */}
        {scene === 9 && (
          <motion.div
            key="scene-9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 3, ease: "easeInOut" } }}
            exit={{ opacity: 0, transition: { duration: 2.5 } }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 3, delay: 0 }}
              className="font-serif text-3xl md:text-5xl lg:text-6xl text-slate-50 tracking-wide text-center font-light z-10 drop-shadow-2xl mb-6"
            >
              Everything we build is rooted in the foundation you created.
            </motion.h2>
          </motion.div>
        )}

        {/* SCENE 10: Closing Slide */}
        {scene === 10 && (
          <motion.div
            key="scene-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 4, ease: "easeIn" } }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-background/40 pointer-events-none z-0 backdrop-blur-sm"></div>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-gold tracking-wide mb-12 gold-glow z-10 drop-shadow-2xl">
              Happy 54th Birthday, Daddy.
            </h1>

            <p className="font-serif text-xl md:text-3xl text-slate-100 tracking-wider font-light z-10 drop-shadow-lg mb-8">
              We’re proud to be your kids.
            </p>

            <p className="font-serif text-lg md:text-2xl text-slate-300 tracking-widest font-light z-10 italic">
              With love,<br />
              <span className="text-gold not-italic mt-2 block">Satvik & Tanu</span>
            </p>

            {/* Final touch: Elite fade in text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 4, delay: 8 }}
              className="absolute bottom-12 right-12 z-20"
            >
              <p className="font-sans font-light tracking-widest text-[10px] uppercase text-gold/60">
                54 looks good on you.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
