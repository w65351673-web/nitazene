export const contentType = 'image/svg+xml';
export const size = { width: 32, height: 32 };

export default function Icon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#8b5cf6"/><stop offset="55%" stop-color="#a855f7"/><stop offset="100%" stop-color="#d946ef"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#d946ef" stop-opacity="0.5"/><stop offset="100%" stop-color="#d946ef" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="32" cy="32" r="30" fill="url(#glow)"/>
  <path d="M32 5 L55.4 18.5 V45.5 L32 59 L8.6 45.5 V18.5 Z" fill="none" stroke="url(#g)" stroke-width="3" stroke-linejoin="round"/>
  <ellipse cx="32" cy="32" rx="29" ry="11" transform="rotate(-24 32 32)" fill="none" stroke="url(#g)" stroke-opacity="0.4" stroke-width="1.4" stroke-dasharray="3 5"/>
  <path d="M21 45 V19 L43 45 V19" fill="none" stroke="url(#g)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="21" cy="45" r="3.4" fill="#d946ef"/>
  <circle cx="21" cy="19" r="3.4" fill="#8b5cf6"/>
  <circle cx="43" cy="45" r="3.4" fill="#8b5cf6"/>
  <circle cx="43" cy="19" r="3.4" fill="#d946ef"/>
</svg>`;
  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}
