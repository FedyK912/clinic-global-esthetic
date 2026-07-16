/**
 * Coupe de peau schématique : remplace l'ancienne scène three.js (≈500 Ko de
 * JS) par un SVG inline de quelques Ko. Trois états de follicule superposés,
 * révélés en fondu selon la phase active ; le faisceau laser n'apparaît
 * qu'en phase anagène (la seule où le traitement agit).
 */
export default function CycleDiagram({ phase }: { phase: number }) {
  const on = (i: number) => ({ opacity: phase === i ? 1 : 0 });

  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden="true">
      {/* Couches de peau */}
      <rect x="0" y="110" width="400" height="80" fill="#EAD2BB" />
      <rect x="0" y="190" width="400" height="130" fill="#F0DFC9" />
      <rect x="0" y="320" width="400" height="80" fill="#F6ECDD" />
      <line x1="0" y1="110" x2="400" y2="110" stroke="#C9A583" strokeWidth="2" />
      <line x1="0" y1="190" x2="400" y2="190" stroke="#DDC3A4" strokeWidth="1" strokeDasharray="5 7" />
      <line x1="0" y1="320" x2="400" y2="320" stroke="#E4D2B9" strokeWidth="1" strokeDasharray="5 7" />

      {/* ---- Phase 0 : anagène, follicule profond, faisceau actif ---- */}
      <g className="follicle" style={on(0)}>
        <path d="M186 296 Q184 110 193 42" stroke="#4A3A2C" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M170 250 Q168 300 186 308 Q206 300 202 250 Q200 200 186 200 Q172 200 170 250 Z" fill="#E2C4A4" stroke="#C9A583" strokeWidth="2" />
        <ellipse cx="186" cy="292" rx="15" ry="17" fill="#4A3A2C" />
        <ellipse cx="186" cy="298" rx="7" ry="8" fill="#8C6E3F" />
        {/* Faisceau laser */}
        <g className="beam">
          <path d="M176 0 L196 0 L191 108 L181 108 Z" fill="url(#beamGrad)" />
          <ellipse cx="186" cy="292" rx="26" ry="27" fill="rgba(243,223,184,0.45)" />
          <ellipse cx="186" cy="292" rx="38" ry="39" fill="rgba(243,223,184,0.18)" />
        </g>
      </g>

      {/* ---- Phase 1 : catagène, le follicule se rétracte ---- */}
      <g className="follicle" style={on(1)}>
        <path d="M192 218 Q189 110 197 48" stroke="#5D4A38" strokeWidth="6.5" strokeLinecap="round" fill="none" />
        <path d="M178 180 Q176 222 192 228 Q208 222 205 180 Q203 150 192 150 Q180 150 178 180 Z" fill="#E2C4A4" stroke="#C9A583" strokeWidth="2" />
        <ellipse cx="192" cy="214" rx="11" ry="12" fill="#5D4A38" />
        <path d="M186 258 Q192 240 198 258" stroke="#C9A583" strokeWidth="2" strokeDasharray="3 5" fill="none" />
      </g>

      {/* ---- Phase 2 : télogène, au repos, le poil se détache ---- */}
      <g className="follicle" style={on(2)}>
        <path d="M204 148 Q203 104 210 60" stroke="#6E5A45" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M192 128 Q190 152 204 156 Q218 152 216 128 Q214 112 204 112 Q194 112 192 128 Z" fill="#E2C4A4" stroke="#C9A583" strokeWidth="2" />
        <ellipse cx="204" cy="144" rx="9" ry="9" fill="#6E5A45" />
        {/* Germe du futur poil */}
        <circle cx="196" cy="180" r="5" fill="#AD8A55" opacity="0.6" />
        <path d="M196 176 Q196 160 200 152" stroke="#AD8A55" strokeWidth="1.5" strokeDasharray="2 4" fill="none" opacity="0.6" />
      </g>

      <defs>
        <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F3DFB8" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#AD8A55" stopOpacity="0.55" />
        </linearGradient>
      </defs>
    </svg>
  );
}
