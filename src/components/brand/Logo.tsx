// ManaMind logo, vector geometry extracted from the Brand Playbook v0.1 (linear lockup).
// Colourways: Wisp on dark backgrounds, Void on light backgrounds. Never recolour outside the palette.

type LogoProps = { className?: string; title?: string };

export function LogoLinear({ className, title = "ManaMind" }: LogoProps) {
  return (
    <svg viewBox="0 0 1081.55 84.94" className={className} fill="currentColor" role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <path d="M69.12,0.00L69.12,56.97L96.99,84.83L166.11,84.83L81.28,0.00L69.12,0.00Z" />
      <path d="M69.12,56.97L12.16,0.00L0.00,0.00L0.00,84.84L69.12,84.84L69.12,56.97Z" />
      <path d="M263.10,0.00L250.94,0.00L166.11,84.83L235.23,84.83L263.10,56.97L263.10,0.00Z" />
      <path d="M332.23,0.00L320.07,0.00L263.10,56.97L263.10,84.84L332.23,84.84L332.23,0.00Z" />
      <path d="M421.31,83.38L399.74,0.00L371.24,0.00L371.24,84.94L385.65,84.94L385.65,1.68L407.56,84.94L434.95,84.94L456.85,1.68L456.85,84.94L471.27,84.94L471.27,0.00L442.77,0.00L421.31,83.38Z" />
      <path d="M510.48,0.00L481.09,84.94L496.29,84.94L504.45,60.58L544.12,60.58L552.28,84.94L567.48,84.94L538.09,0.00L510.48,0.00M508.58,48.29L524.34,1.79L539.99,48.29L508.58,48.29Z" />
      <path d="M639.23,83.27L606.03,0.00L577.31,0.00L577.31,84.94L591.73,84.94L591.73,1.68L624.92,84.94L653.64,84.94L653.64,0.00L639.23,0.00L639.23,83.27Z" />
      <path d="M692.87,0.00L663.47,84.94L678.67,84.94L686.83,60.58L726.51,60.58L734.67,84.94L749.87,84.94L720.47,0.00L692.87,0.00M690.97,48.29L706.73,1.79L722.38,48.29L690.97,48.29Z" />
      <path d="M809.77,83.38L788.20,0.00L759.70,0.00L759.70,84.94L774.11,84.94L774.11,1.68L796.02,84.94L823.41,84.94L845.31,1.68L845.31,84.94L859.73,84.94L859.73,0.00L831.23,0.00L809.77,83.38Z" />
      <path d="M893.57,0.00L879.16,0.00L879.16,84.94L893.57,84.94L893.57,0.00Z" />
      <path d="M974.94,83.27L941.74,0.00L913.02,0.00L913.02,84.94L927.43,84.94L927.43,1.68L960.63,84.94L989.35,84.94L989.35,0.00L974.94,0.00L974.94,83.27Z" />
      <path d="M1038.97,0.00L1008.79,0.00L1008.79,84.94L1038.97,84.94C1064.45,84.94 1081.55,70.53 1081.55,42.48C1081.55,14.31 1064.45,0.00 1038.97,0.00M1039.30,72.54L1023.21,72.54L1023.21,12.41L1039.30,12.41C1056.63,12.41 1066.69,23.14 1066.69,42.48C1066.69,61.92 1056.63,72.54 1039.30,72.54Z" />
    </svg>
  );
}

// The four-piece symbol (two "M"s forming one "M"), viewBox 663 x 169.
export const SYMBOL_PIECES = [
  "0,0 26,0 139,113 139,169 0,169",
  "139,0 164,0 332,169 194,169 139,113",
  "499,0 524,0 524,113 469,169 331,169",
  "637,0 663,0 663,169 524,169 524,113",
];

export function LogoSymbol({ className, title = "ManaMind", outlined = false }: LogoProps & { outlined?: boolean }) {
  return (
    <svg viewBox="-2 -2 667 173" className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      {SYMBOL_PIECES.map((points) => (
        <polygon key={points} points={points} fill={outlined ? "none" : "currentColor"} stroke={outlined ? "currentColor" : "none"} strokeWidth={outlined ? 3 : 0} strokeLinejoin="miter" />
      ))}
    </svg>
  );
}
