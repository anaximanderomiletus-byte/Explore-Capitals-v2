import React, { useState, useRef, useEffect } from 'react';
import { User as UserIcon, Settings, LogOut, Award } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { getAvatarById } from '../constants/avatars';
import ConfirmationModal from './ConfirmationModal';

const AccountMenu: React.FC = () => {
  const { user: authUser, signOut, loading: authLoading } = useAuth();
  const { user, isAuthenticated, isLoading: userLoading, isSyncing } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const loading = authLoading || userLoading;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // While checking auth status, show a static placeholder (no animation to prevent flash)
  if (loading && !isAuthenticated) {
    return (
      <Link
        to="/auth"
        className="w-9 h-9 rounded-full bg-white/10 border-2 border-white/60 flex items-center justify-center overflow-hidden relative group"
      >
        <div className="absolute inset-0 bg-glossy-gradient opacity-10" />
        <UserIcon size={16} className="text-white/30" />
      </Link>
    );
  }

  // If not logged in, take them to the separate Auth page
  if (!isAuthenticated) {
    return (
      <Link
        to="/auth"
        state={{ from: location }}
        className="shing-btn group relative flex items-center justify-center w-9 h-9 rounded-full bg-white/10 backdrop-blur-xl border-2 border-white/60 text-white/50 hover:text-sky-light hover:border-sky/50 transition-all overflow-hidden"
        aria-label="Sign in"
      >
        <div className="absolute inset-0 bg-glossy-gradient opacity-20 group-hover:opacity-40 transition-opacity" />
        <span className="shing-container absolute inset-0 overflow-hidden rounded-full pointer-events-none">
          <span className="shing-glare" />
        </span>
        <UserIcon size={18} strokeWidth={2.5} className="relative z-10" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-sky rounded-full border border-surface-dark z-20" />
      </Link>
    );
  }

  const avatar = getAvatarById(authUser?.photoURL || user.photoURL);
  const initials = (authUser?.displayName || user.name)?.[0] || 'E';

  const handleSignOut = async () => {
    setIsOpen(false);
    setShowSignOutModal(false);
    await signOut();
    navigate('/');
  };

  // If logged in, show dropdown menu
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`shing-btn relative flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all overflow-hidden ${
          isOpen ? 'border-sky-light' : 'border-white/60 hover:border-sky/40'
        } ${avatar ? avatar.color : 'bg-gel-blue'} text-white font-display font-bold`}
      >
        {avatar ? (
          <div className="relative z-10">{React.cloneElement(avatar.icon as React.ReactElement, { size: 18 })}</div>
        ) : (authUser?.photoURL || user.photoURL) && (authUser?.photoURL || user.photoURL)!.startsWith('http') ? (
          <img src={(authUser?.photoURL || user.photoURL)!} alt="avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="text-[10px] tracking-tighter relative z-10">{initials}</span>
        )}
        <div className="absolute inset-0 bg-glossy-gradient opacity-50 pointer-events-none" />
        <span className="shing-container absolute inset-0 overflow-hidden rounded-full pointer-events-none">
          <span className="shing-glare" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-surface-dark/90 backdrop-blur-3xl rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.25)] border border-white/20 p-2.5 z-[3000] animate-in fade-in zoom-in-95 duration-200">
          <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-2xl" />
          <div className="px-4 py-3 border-b border-white/10 mb-2 relative z-10">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-0.5">Authenticated Citizen</p>
            <p className="text-xs font-black text-white uppercase tracking-tight truncate drop-shadow-md">{authUser?.displayName || user.name}</p>
          </div>
          
          <div className="space-y-1 relative z-10">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-sky-light transition-all group"
            >
              <Award size={18} className="text-sky-light" />
              EXPEDITION STATS
            </Link>
            
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all"
            >
              <Settings size={18} className="text-white/30 group-hover:text-white" />
              SECURITY CENTER
            </Link>
          </div>

          <div className="h-0.5 bg-white/10 my-2 mx-2 relative z-10" />

          <button
            onClick={() => {
              setShowSignOutModal(true);
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-red-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-red-400 hover:text-red-300 transition-all text-left relative z-10"
          >
            <LogOut size={18} />
            SIGN OUT
          </button>
        </div>
      )}

      <ConfirmationModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={handleSignOut}
        title="Sign Out?"
        message="Are you sure you want to end your session? Your progress is safely stored in your account."
        confirmText="SIGN OUT"
        variant="danger"
      />
    </div>
  );
};

export default AccountMenu;
