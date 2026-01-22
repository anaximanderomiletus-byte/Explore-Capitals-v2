import React from 'react';
import { Globe2, Compass, Map as MapIcon, Flag, ShieldCheck } from 'lucide-react';

export const AVATAR_PRESETS = [
  { id: 'globe', icon: <Globe2 size={24} />, color: 'bg-blue-500' },
  { id: 'compass', icon: <Compass size={24} />, color: 'bg-emerald-500' },
  { id: 'map', icon: <MapIcon size={24} />, color: 'bg-amber-500' },
  { id: 'flag', icon: <Flag size={24} />, color: 'bg-rose-500' },
  { id: 'shield', icon: <ShieldCheck size={24} />, color: 'bg-indigo-500' },
];

export const getAvatarById = (id: string | null | undefined) => {
  return AVATAR_PRESETS.find(p => p.id === id);
};





