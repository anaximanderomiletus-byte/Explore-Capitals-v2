import React, { useState, useEffect, useMemo, useCallback, useRef, Suspense } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Timer, Trophy, ArrowLeft, Car, Play, Lock, Crown, ChevronLeft, ChevronRight } from 'lucide-react';
import * as THREE from 'three';
import { MOCK_COUNTRIES } from '../constants';
import Button from '../components/Button';
import { Country } from '../types';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';
import { useUser } from '../context/UserContext';
import { useGameLimit } from '../hooks/useGameLimit';

const getCountryCode = (emoji: string) => {
  return Array.from(emoji)
    .map(char => String.fromCharCode(char.codePointAt(0)! - 127397).toLowerCase())
    .join('');
};

// Simple car mesh component
function CarMesh({ position, rotation, color, isPlayer = false }: { position: [number, number, number]; rotation?: [number, number, number]; color: string; isPlayer?: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={meshRef} position={position} rotation={rotation || [0, 0, 0]}>
      {/* Car body */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.2, 0.4, 2.4]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Car top */}
      <mesh position={[0, 0.65, -0.1]} castShadow>
        <boxGeometry args={[1, 0.35, 1.4]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Wheels */}
      {[[-0.5, 0.15, 0.7], [0.5, 0.15, 0.7], [-0.5, 0.15, -0.7], [0.5, 0.15, -0.7]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}
      {/* Headlights */}
      {isPlayer && (
        <>
          <mesh position={[-0.4, 0.3, 1.21]}>
            <boxGeometry args={[0.2, 0.15, 0.02]} />
            <meshStandardMaterial color="#ffff88" emissive="#ffff44" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0.4, 0.3, 1.21]}>
            <boxGeometry args={[0.2, 0.15, 0.02]} />
            <meshStandardMaterial color="#ffff88" emissive="#ffff44" emissiveIntensity={0.5} />
          </mesh>
        </>
      )}
      {/* Taillights for oncoming car */}
      {!isPlayer && (
        <>
          <mesh position={[-0.4, 0.3, 1.21]}>
            <boxGeometry args={[0.2, 0.15, 0.02]} />
            <meshStandardMaterial color="#ff4444" emissive="#ff2222" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[0.4, 0.3, 1.21]}>
            <boxGeometry args={[0.2, 0.15, 0.02]} />
            <meshStandardMaterial color="#ff4444" emissive="#ff2222" emissiveIntensity={0.8} />
          </mesh>
        </>
      )}
    </group>
  );
}

// Road component with lane markings
function Road({ driveSide }: { driveSide: 'Left' | 'Right' }) {
  const roadRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={roadRef}>
      {/* Main road surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[10, 200]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
      </mesh>
      {/* Road edges - white lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-4.8, 0.02, 0]}>
        <planeGeometry args={[0.15, 200]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4.8, 0.02, 0]}>
        <planeGeometry args={[0.15, 200]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Center line - dashed yellow */}
      {Array.from({ length: 40 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -100 + i * 5]}>
          <planeGeometry args={[0.15, 3]} />
          <meshStandardMaterial color="#ffcc00" />
        </mesh>
      ))}
      {/* Grass on sides */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-10, 0, 0]}>
        <planeGeometry args={[10, 200]} />
        <meshStandardMaterial color="#2d5a27" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[10, 0, 0]}>
        <planeGeometry args={[10, 200]} />
        <meshStandardMaterial color="#2d5a27" />
      </mesh>
    </group>
  );
}

// Tree component for roadside
function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 2, 8]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>
      {/* Foliage */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <coneGeometry args={[1.2, 2.5, 8]} />
        <meshStandardMaterial color="#1a472a" />
      </mesh>
      <mesh position={[0, 3.5, 0]} castShadow>
        <coneGeometry args={[0.9, 2, 8]} />
        <meshStandardMaterial color="#1a472a" />
      </mesh>
    </group>
  );
}

// Main 3D scene
function GameScene({ 
  playerLane, 
  onCollision, 
  gamePhase,
  driveSide 
}: { 
  playerLane: 'left' | 'right'; 
  onCollision: () => void; 
  gamePhase: 'driving' | 'collision' | 'correct';
  driveSide: 'Left' | 'Right';
}) {
  const playerRef = useRef<THREE.Group>(null);
  const oncomingRef = useRef({ z: -80 });
  const [oncomingZ, setOncomingZ] = useState(-80);
  const { camera } = useThree();
  const hasCollided = useRef(false);
  
  // Player X position based on lane choice
  const playerX = playerLane === 'left' ? -2.5 : 2.5;
  
  // Oncoming car lane based on correct driving side
  // If drive on left, oncoming traffic is on the right lane
  // If drive on right, oncoming traffic is on the left lane
  const oncomingX = driveSide === 'Left' ? 2.5 : -2.5;
  
  // Check for collision
  const willCollide = playerX === oncomingX;
  
  useEffect(() => {
    // Position camera behind and above the player car
    camera.position.set(0, 4, 12);
    camera.lookAt(0, 0, -10);
  }, [camera]);
  
  useFrame((state, delta) => {
    if (gamePhase === 'driving') {
      // Move oncoming car toward player
      oncomingRef.current.z += delta * 35; // Speed of oncoming car
      setOncomingZ(oncomingRef.current.z);
      
      // Check collision - when cars meet
      if (oncomingRef.current.z > 0 && !hasCollided.current) {
        if (willCollide) {
          hasCollided.current = true;
          onCollision();
        }
      }
    }
  });

  // Reset for new round
  useEffect(() => {
    if (gamePhase === 'driving') {
      oncomingRef.current.z = -80;
      setOncomingZ(-80);
      hasCollided.current = false;
    }
  }, [gamePhase, driveSide]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={1} 
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <hemisphereLight args={['#87ceeb', '#2d5a27', 0.3]} />
      
      {/* Sky */}
      <mesh>
        <sphereGeometry args={[100, 32, 32]} />
        <meshBasicMaterial color="#1a1a3a" side={THREE.BackSide} />
      </mesh>
      
      {/* Road */}
      <Road driveSide={driveSide} />
      
      {/* Trees along roadside */}
      {Array.from({ length: 20 }).map((_, i) => (
        <React.Fragment key={i}>
          <Tree position={[-7 + Math.random() * 2, 0, -90 + i * 10]} />
          <Tree position={[7 - Math.random() * 2, 0, -85 + i * 10]} />
        </React.Fragment>
      ))}
      
      {/* Player car */}
      <CarMesh 
        position={[playerX, 0, 5]} 
        color={gamePhase === 'collision' ? '#ff3333' : '#3b82f6'} 
        isPlayer={true}
      />
      
      {/* Oncoming car */}
      <CarMesh 
        position={[oncomingX, 0, oncomingZ]} 
        rotation={[0, Math.PI, 0]} 
        color="#ef4444" 
      />
      
      {/* Collision effect */}
      {gamePhase === 'collision' && (
        <mesh position={[playerX, 1.5, 3]}>
          <sphereGeometry args={[2, 16, 16]} />
          <meshBasicMaterial color="#ff6600" transparent opacity={0.6} />
        </mesh>
      )}
    </>
  );
}

export default function DrivingDirection() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [playerLane, setPlayerLane] = useState<'left' | 'right'>('right');
  const [gamePhase, setGamePhase] = useState<'choosing' | 'driving' | 'collision' | 'correct'>('choosing');
  const [questionTimer, setQuestionTimer] = useState(5);
  const [hasReported, setHasReported] = useState(false);
  const [streak, setStreak] = useState(0);
  const { recordGameResult } = useUser();
  const { isPremium } = useGameLimit();
  const navigate = useNavigate();
  const { setPageLoading } = useLayout();
  
  // Filter countries that have driveSide data
  const countriesWithDriveSide = useMemo(() => {
    return MOCK_COUNTRIES.filter(c => c.driveSide === 'Left' || c.driveSide === 'Right');
  }, []);

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  // Main game timer
  useEffect(() => {
    let timer: any;
    if (gameState === 'playing' && timeLeft > 0 && gamePhase !== 'collision') {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameState('finished');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, gamePhase]);

  // Question timer - auto-drive if no answer
  useEffect(() => {
    let timer: any;
    if (gamePhase === 'choosing' && questionTimer > 0) {
      timer = setInterval(() => {
        setQuestionTimer((prev) => prev - 1);
      }, 1000);
    } else if (gamePhase === 'choosing' && questionTimer === 0) {
      // Time ran out - drive on the wrong side
      const wrongSide = currentCountry?.driveSide === 'Left' ? 'right' : 'left';
      handleLaneChoice(wrongSide);
    }
    return () => clearInterval(timer);
  }, [gamePhase, questionTimer, currentCountry]);

  useEffect(() => {
    if (gameState === 'finished' && !hasReported) {
      recordGameResult({
        gameId: 'driving-direction',
        score,
        durationSeconds: 60 - timeLeft,
      });
      setHasReported(true);
    }
  }, [gameState, hasReported, recordGameResult, score, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const generateQuestion = useCallback(() => {
    const country = countriesWithDriveSide[Math.floor(Math.random() * countriesWithDriveSide.length)];
    setCurrentCountry(country);
    setGamePhase('choosing');
    setQuestionTimer(5);
    setPlayerLane('right'); // Default position
  }, [countriesWithDriveSide]);

  const startGame = () => {
    if (!isPremium) {
      navigate('/premium');
      return;
    }
    setScore(0);
    setTimeLeft(60);
    setHasReported(false);
    setStreak(0);
    generateQuestion();
    setGameState('playing');
  };

  const handleLaneChoice = (lane: 'left' | 'right') => {
    if (gamePhase !== 'choosing') return;
    setPlayerLane(lane);
    setGamePhase('driving');
  };

  const handleCollision = () => {
    setGamePhase('collision');
    setStreak(0);
    // After showing collision, move to next question
    setTimeout(() => {
      if (timeLeft > 0) {
        generateQuestion();
      } else {
        setGameState('finished');
      }
    }, 1500);
  };

  // Check if player made correct choice after driving phase
  useEffect(() => {
    if (gamePhase === 'driving' && currentCountry) {
      const correctLane = currentCountry.driveSide === 'Left' ? 'left' : 'right';
      if (playerLane === correctLane) {
        // Correct! Car passes safely
        setTimeout(() => {
          setGamePhase('correct');
          const bonus = streak >= 2 ? 5 : 0; // Streak bonus
          setScore(s => s + 10 + bonus);
          setStreak(s => s + 1);
          setTimeout(() => {
            if (timeLeft > 0) {
              generateQuestion();
            } else {
              setGameState('finished');
            }
          }, 800);
        }, 2500); // Time for car to pass
      }
    }
  }, [gamePhase, playerLane, currentCountry, timeLeft, streak, generateQuestion]);

  // Premium check screen
  if (!isPremium && gameState === 'start') {
    return (
      <div className="h-[100dvh] min-h-screen bg-surface-dark font-sans relative overflow-hidden flex items-center justify-center px-4">
        <SEO title="Driving Direction - Premium Game" description="Guess which side of the road to drive on before you crash! A 3D premium geography game." />
        
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-amber-500/10 rounded-full blur-[150px] opacity-60" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-amber-600/10 rounded-full blur-[120px] opacity-40" />
        </div>

        <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl p-8 text-center border-2 border-amber-500/30 relative z-10">
          <div className="w-20 h-20 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-amber-500/30">
            <Lock size={36} className="text-amber-400" />
          </div>
          <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter">Driving Direction</h1>
          <p className="text-amber-400 text-xs mb-6 font-bold uppercase tracking-[0.2em]">Premium Game</p>
          <p className="text-white/60 text-sm mb-8">Unlock this 3D driving game with Premium membership.</p>
          <div className="flex flex-col gap-4">
            <Button onClick={() => navigate('/premium')} className="w-full h-14 bg-gradient-to-r from-amber-500 to-amber-600 border-0">
              <Crown size={18} /> UNLOCK WITH PREMIUM
            </Button>
            <button 
              onClick={() => navigate('/games')}
              className="inline-flex items-center justify-center gap-2 text-white/30 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px] group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
              Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] min-h-screen bg-surface-dark font-sans relative overflow-hidden">
      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="h-full flex items-center justify-center px-4"
          >
            <SEO title="Driving Direction - Premium 3D Game" description="Drive on the correct side of the road before you crash! A 3D premium geography game." />
            
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-sky/20 rounded-full blur-[150px] opacity-60" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-amber-500/10 rounded-full blur-[120px] opacity-40" />
            </div>

            <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl p-8 text-center border-2 border-white/20 relative z-10">
              <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500/20 rounded-full text-[9px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Crown size={10} /> Premium
              </div>
              <div className="w-20 h-20 bg-sky/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-sky border border-white/30">
                <Car size={36} />
              </div>
              <h1 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter">Driving Direction</h1>
              <p className="text-white/40 text-[10px] mb-10 font-bold uppercase tracking-[0.2em]">Drive on the correct side or crash!</p>
              <div className="flex flex-col gap-6">
                <Button onClick={startGame} size="md" className="w-full h-16 text-xl uppercase tracking-widest font-black">
                  PLAY <Play size={20} fill="currentColor" />
                </Button>
                <button 
                  onClick={() => navigate('/games')}
                  className="inline-flex items-center justify-center gap-2 text-white/30 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px] group"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
                  Back to Games
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'playing' && currentCountry && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full flex flex-col overflow-hidden"
          >
            <SEO title="Driving Direction - Playing" description="Drive on the correct side of the road!" />
            
            {/* HUD Overlay */}
            <div className="absolute top-0 left-0 right-0 z-20 p-3 md:p-4">
              <div className="max-w-3xl mx-auto flex items-center gap-2 bg-black/50 backdrop-blur-xl p-2.5 md:p-3 rounded-2xl border border-white/20">
                <Link to="/games" className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white/60 hover:text-white transition-all border border-white/10 shrink-0">
                  <ArrowLeft size={18} />
                </Link>
                <div className="flex-1 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-warning/20 border border-warning/40">
                    <Trophy size={16} className="text-warning" />
                    <span className="font-display font-black text-lg text-white tabular-nums">{score}</span>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all ${timeLeft < 10 ? 'bg-red-500/10 border-2 border-error animate-timer-panic' : 'bg-sky/25 border border-white/30'}`}>
                    <Timer size={16} className={timeLeft < 10 ? 'text-error' : 'text-sky-light'} />
                    <span className={`font-display font-black text-lg tabular-nums ${timeLeft < 10 ? 'text-error' : 'text-white'}`}>{formatTime(timeLeft)}</span>
                  </div>
                </div>
                <div className="w-[42px] shrink-0" />
              </div>
            </div>

            {/* Country info overlay */}
            <div className="absolute top-20 md:top-24 left-0 right-0 z-20 px-4">
              <div className="max-w-md mx-auto text-center">
                <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <img 
                      src={`https://flagcdn.com/w80/${getCountryCode(currentCountry.flag)}.png`}
                      alt={`${currentCountry.name} flag`}
                      className="h-8 w-auto rounded shadow-lg"
                    />
                    <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">
                      {currentCountry.name}
                    </h2>
                  </div>
                  <p className="text-white/60 text-sm mb-3">Which side of the road do they drive on?</p>
                  
                  {gamePhase === 'choosing' && (
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className={`text-2xl font-black tabular-nums ${questionTimer <= 2 ? 'text-error animate-pulse' : 'text-warning'}`}>
                        {questionTimer}s
                      </div>
                    </div>
                  )}
                  
                  {gamePhase === 'collision' && (
                    <div className="text-error font-black text-xl animate-pulse">
                      💥 CRASH! They drive on the {currentCountry.driveSide}!
                    </div>
                  )}
                  
                  {gamePhase === 'correct' && (
                    <div className="text-accent font-black text-xl">
                      ✓ Correct! +{10 + (streak >= 3 ? 5 : 0)} points
                    </div>
                  )}
                  
                  {streak >= 2 && gamePhase === 'choosing' && (
                    <div className="text-amber-400 text-xs font-bold">
                      🔥 {streak} streak! Bonus points active
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3D Canvas */}
            <div className="flex-1 relative">
              <Canvas shadows camera={{ fov: 60 }}>
                <Suspense fallback={null}>
                  <GameScene 
                    playerLane={playerLane}
                    onCollision={handleCollision}
                    gamePhase={gamePhase === 'choosing' ? 'driving' : gamePhase}
                    driveSide={currentCountry.driveSide as 'Left' | 'Right'}
                  />
                </Suspense>
              </Canvas>
            </div>

            {/* Lane choice buttons */}
            {gamePhase === 'choosing' && (
              <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                <div className="max-w-lg mx-auto grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleLaneChoice('left')}
                    className="h-20 bg-white/10 hover:bg-sky/30 backdrop-blur-xl rounded-2xl border-2 border-white/20 hover:border-sky transition-all flex flex-col items-center justify-center gap-1 group"
                  >
                    <ChevronLeft size={32} className="text-white group-hover:text-sky-light transition-colors" />
                    <span className="font-black text-white uppercase tracking-wider text-sm">Left</span>
                  </button>
                  <button
                    onClick={() => handleLaneChoice('right')}
                    className="h-20 bg-white/10 hover:bg-sky/30 backdrop-blur-xl rounded-2xl border-2 border-white/20 hover:border-sky transition-all flex flex-col items-center justify-center gap-1 group"
                  >
                    <ChevronRight size={32} className="text-white group-hover:text-sky-light transition-colors" />
                    <span className="font-black text-white uppercase tracking-wider text-sm">Right</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {gameState === 'finished' && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="h-full flex items-center justify-center px-4"
          >
            <div className="max-w-md w-full bg-white/10 backdrop-blur-3xl rounded-3xl p-10 text-center border-2 border-white/20 relative z-10">
              <div className="w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-8 text-warning border border-white/30">
                <Trophy size={36} />
              </div>
              <h1 className="text-3xl font-display font-black text-white mb-1 uppercase tracking-tighter">Finished</h1>
              <p className="text-white/40 mb-6 text-[10px] font-bold uppercase tracking-[0.2em]">Final Score</p>
              <div className="text-7xl font-display font-black text-white mb-10 tabular-nums">{score}</div>
              <div className="flex flex-col gap-6">
                <Button onClick={startGame} size="md" className="w-full h-16 text-xl uppercase tracking-widest font-black">Play Again</Button>
                <button 
                  onClick={() => navigate('/games')}
                  className="inline-flex items-center justify-center gap-2 text-white/30 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px] group"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
                  Back to Games
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
