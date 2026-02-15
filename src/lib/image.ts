const shimmer = (width: number, height: number) =>
  `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g"><stop stop-color="#dbeafe" offset="20%"/><stop stop-color="#e2e8f0" offset="50%"/><stop stop-color="#dbeafe" offset="70%"/></linearGradient></defs><rect width="${width}" height="${height}" fill="#e2e8f0"/><rect id="r" width="${width}" height="${height}" fill="url(#g)"/><animate href="#r" attributeName="x" from="-${width}" to="${width}" dur="1.2s" repeatCount="indefinite"/></svg>`;

const toBase64 = (value: string) =>
  typeof window === "undefined"
    ? Buffer.from(value).toString("base64")
    : window.btoa(value);

export const getBlurDataURL = (width = 16, height = 9) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`;
