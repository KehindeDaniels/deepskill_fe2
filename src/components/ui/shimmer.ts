export function shimmer(w: number, h: number) {
  return `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" 
        xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="g">
            <stop stop-color="#eee" offset="20%" />
            <stop stop-color="#ddd" offset="50%" />
            <stop stop-color="#eee" offset="70%" />
          </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="#eee" />
        <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
        <animate href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
      </svg>
    `;
}

export function toBase64(str: string) {
  return typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
}
