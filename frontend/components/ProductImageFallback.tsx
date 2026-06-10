import React from "react";

interface ProductImageFallbackProps {
  category: string;
  name: string;
  className?: string;
}

export default function ProductImageFallback({ category, name, className = "" }: ProductImageFallbackProps) {
  const lowerCat = (category || "").toLowerCase();

  // 1. Footwear Silhouette SVG (Orange-Red gradient)
  if (lowerCat.includes("foot") || lowerCat.includes("shoe") || lowerCat.includes("wear")) {
    return (
      <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-400/20 to-red-500/20 p-6 ${className}`}>
        <svg viewBox="0 0 100 100" className="h-3/4 w-3/4 text-orange-500 dark:text-orange-400 drop-shadow-xl animate-float" fill="currentColor">
          <path d="M15 65 c10 -15, 30 -20, 50 -10 c10 5, 20 0, 25 -10 c2 -5, 5 -5, 5 5 c0 15, -15 20, -35 15 c-15 -3, -30 2, -40 10 c-3 2, -5 2, -5 0 z" />
          <path d="M45 50 c-5 -10, -15 -15, -25 -12 c-2 1, -2 0, 0 -2 c15 -5, 25 2, 30 12 c1 2, -1 4, -5 2 z" />
          <path d="M15 63 c5 5, 15 5, 20 2 c3 -2, 5 0, 2 3 c-5 5, -15 5, -22 0 c-2 -2, -1 -4, 0 -5 z" />
          <path d="M40 45 c2 -3, 6 -3, 8 0 c1 2, -1 3, -4 1 c-3 -2, -3 -2, -4 -1 z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M44 41 c2 -3, 6 -3, 8 0 c1 2, -1 3, -4 1 c-3 -2, -3 -2, -4 -1 z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
    );
  }

  // 2. Apparel Silhouette SVG (Blue-Indigo gradient)
  if (lowerCat.includes("apparel") || lowerCat.includes("cloth") || lowerCat.includes("shirt") || lowerCat.includes("hood") || lowerCat.includes("jacket")) {
    return (
      <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400/20 to-indigo-500/20 p-6 ${className}`}>
        <svg viewBox="0 0 100 100" className="h-2/3 w-2/3 text-blue-500 dark:text-blue-400 drop-shadow-xl" fill="currentColor">
          <path d="M25 35 l10 -10 l15 5 l15 -5 l10 10 l5 30 l-10 5 l-5 -15 l-10 0 l-5 15 l-10 -5 z" />
          <path d="M40 23 c5 -5, 15 -5, 20 0 c3 3, -3 7 -10 7 c-7 0, -13 -4, -10 -7 z" fill="currentColor" opacity="0.8" />
          <path d="M38 52 h24 v10 h-24 z" fill="currentColor" opacity="0.6" />
        </svg>
      </div>
    );
  }

  // 3. Electronics Silhouette SVG (Purple-Pink gradient)
  if (lowerCat.includes("elect") || lowerCat.includes("phone") || lowerCat.includes("tech") || lowerCat.includes("speaker") || lowerCat.includes("head")) {
    return (
      <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-400/20 to-pink-500/20 p-6 ${className}`}>
        <svg viewBox="0 0 100 100" className="h-2/3 w-2/3 text-purple-500 dark:text-purple-400 drop-shadow-xl" fill="currentColor">
          <path d="M20 50 c0 -20, 15 -35, 30 -35 s30 15, 30 35" stroke="currentColor" strokeWidth="8" fill="none" />
          <rect x="14" y="45" width="10" height="20" rx="4" />
          <rect x="76" y="45" width="10" height="20" rx="4" />
          <rect x="22" y="48" width="4" height="14" rx="2" opacity="0.5" />
          <rect x="74" y="48" width="4" height="14" rx="2" opacity="0.5" />
        </svg>
      </div>
    );
  }

  // 4. Accessories Silhouette SVG (Emerald-Teal gradient)
  if (lowerCat.includes("access") || lowerCat.includes("bag") || lowerCat.includes("watch") || lowerCat.includes("glass") || lowerCat.includes("wallet")) {
    return (
      <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-400/20 to-teal-500/20 p-6 ${className}`}>
        <svg viewBox="0 0 100 100" className="h-2/3 w-2/3 text-emerald-500 dark:text-emerald-400 drop-shadow-xl" fill="currentColor">
          <rect x="42" y="15" width="16" height="70" rx="4" fill="currentColor" opacity="0.6" />
          <rect x="30" y="30" width="40" height="40" rx="10" />
          <circle cx="50" cy="50" r="14" fill="white" opacity="0.15" />
          <line x1="50" y1="50" x2="50" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="50" x2="60" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // 5. Home Silhouette SVG (Yellow-Amber gradient)
  if (lowerCat.includes("home") || lowerCat.includes("lamp") || lowerCat.includes("furn") || lowerCat.includes("light") || lowerCat.includes("store")) {
    return (
      <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-yellow-400/20 to-amber-500/20 p-6 ${className}`}>
        <svg viewBox="0 0 100 100" className="h-2/3 w-2/3 text-amber-500 dark:text-amber-400 drop-shadow-xl" fill="currentColor">
          <path d="M35 50 l5 -20 h20 l5 20 z" />
          <line x1="50" y1="50" x2="50" y2="75" stroke="currentColor" strokeWidth="4" />
          <ellipse cx="50" cy="75" rx="15" ry="4" />
          <line x1="30" y1="58" x2="20" y2="62" stroke="currentColor" strokeWidth="2" opacity="0.4" />
          <line x1="70" y1="58" x2="80" y2="62" stroke="currentColor" strokeWidth="2" opacity="0.4" />
        </svg>
      </div>
    );
  }

  // 6. Fitness Kettlebell Silhouette SVG (Rose-Purple gradient)
  return (
    <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-rose-400/20 to-purple-500/20 p-6 ${className}`}>
      <svg viewBox="0 0 100 100" className="h-2/3 w-2/3 text-rose-500 dark:text-rose-400 drop-shadow-xl" fill="currentColor">
        <path d="M30 40 c0 -15, 10 -25, 20 -25 s20 10, 20 25 h-10 c0 -8, -5 -15, -10 -15 s-10 7, -10 15 z" />
        <circle cx="50" cy="60" r="24" />
        <text x="50" y="65" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">FIT</text>
      </svg>
    </div>
  );
}
