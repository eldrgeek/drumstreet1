import React from 'react';
import { Drum } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-blue-600 flex flex-col items-center justify-center text-white">
      <div className="animate-bounce mb-8">
        <Drum size={64} />
      </div>
      <h1 className="text-4xl font-bold mb-2">Drum Store Finder</h1>
      <p className="text-blue-100">Find the best drum stores near you</p>
    </div>
  );
}