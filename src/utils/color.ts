export function stringToHex(str: string): string {
  const hash = Array.from(str).reduce(
    (acc, cur) => cur.charCodeAt(0) + ((acc << 5) - acc),
    0,
  );
  return Array(3)
    .fill(0)
    .reduce(
      (acc, _, i) =>
        `${acc}${(`00${((hash >> (i * 8)) & 0xff).toString(16)}`).slice(-2)}`,
      "#",
    );
}

export const getLuminance = (color: [number, number, number]) => {
  const [R, G, B] = color.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

export const getContrast = (
  color1: [number, number, number],
  color2: [number, number, number],
) => {
  const L1 = getLuminance(color1);
  const L2 = getLuminance(color2);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
};

export function getContrastTextColor(hex: string) {
  const isHex = /^#[0-9A-F]{6}$/i.test(hex);
  if (!isHex) {
    throw new Error("Invalid hex color");
  }
  const color = hex
    .replace("#", "")
    .match(/.{2}/g)
    ?.map((c) => parseInt(c, 16)) as [number, number, number];

  const whiteContrast = getContrast([255, 255, 255], color);
  const blackContrast = getContrast([0, 0, 0], color);

  const bestColor = whiteContrast > blackContrast ? "#ffffff" : "#000000";

  return bestColor;
}
