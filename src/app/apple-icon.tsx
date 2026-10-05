export const contentType = 'image/svg+xml';
export const size = { width: 180, height: 180 };

export default function AppleIcon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="180" y2="180" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#8b5cf6"/><stop offset="55%" stop-color="#a855f7"/><stop offset="100%" stop-color="#d946ef"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#d946ef" stop-opacity="0.5"/><stop offset="100%" stop-color="#d946ef" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="180" height="180" rx="40" fill="#170b2e"/>
  <circle cx="90" cy="90" r="80" fill="url(#glow)"/>
  <path d="M90 14 L156 52 V128 L90 166 L24 128 V52 Z" fill="none" stroke="url(#g)" stroke-width="8" stroke-linejoin="round"/>
  <ellipse cx="90" cy="90" rx="80" ry="30" transform="rotate(-24 90 90)" fill="none" stroke="url(#g)" stroke-opacity="0.4" stroke-width="4" stroke-dasharray="8 13"/>
  <path d="M59 125 V55 L121 125 V55" fill="none" stroke="url(#g)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="59" cy="125" r="9" fill="#d946ef"/>
  <circle cx="59" cy="55" r="9" fill="#8b5cf6"/>
  <circle cx="121" cy="125" r="9" fill="#8b5cf6"/>
  <circle cx="121" cy="55" r="9" fill="#d946ef"/>
</svg>`;
  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}
