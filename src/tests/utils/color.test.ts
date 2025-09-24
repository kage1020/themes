import {
  getContrast,
  getContrastTextColor,
  getLuminance,
  stringToHex,
} from "../../utils/color";

describe("stringToHex", () => {
  it("should generate consistent hex colors for the same string", () => {
    const result1 = stringToHex("test");
    const result2 = stringToHex("test");
    expect(result1).toBe(result2);
    expect(result1).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("should generate different hex colors for different strings", () => {
    const result1 = stringToHex("test1");
    const result2 = stringToHex("test2");
    expect(result1).not.toBe(result2);
  });

  it("should handle empty string", () => {
    const result = stringToHex("");
    expect(result).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("should handle special characters", () => {
    const result = stringToHex("!@#$%^&*()");
    expect(result).toMatch(/^#[0-9a-f]{6}$/);
  });
});

describe("getLuminance", () => {
  it("should return 1 for white color", () => {
    const result = getLuminance([255, 255, 255]);
    expect(result).toBeCloseTo(1, 3);
  });

  it("should return 0 for black color", () => {
    const result = getLuminance([0, 0, 0]);
    expect(result).toBe(0);
  });

  it("should return intermediate values for gray colors", () => {
    const result = getLuminance([128, 128, 128]);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });

  it("should handle red color correctly", () => {
    const result = getLuminance([255, 0, 0]);
    expect(result).toBeCloseTo(0.2126, 3);
  });

  it("should handle green color correctly", () => {
    const result = getLuminance([0, 255, 0]);
    expect(result).toBeCloseTo(0.7152, 3);
  });

  it("should handle blue color correctly", () => {
    const result = getLuminance([0, 0, 255]);
    expect(result).toBeCloseTo(0.0722, 3);
  });
});

describe("getContrast", () => {
  it("should return maximum contrast for white and black", () => {
    const result = getContrast([255, 255, 255], [0, 0, 0]);
    expect(result).toBeCloseTo(21, 1);
  });

  it("should return 1 for identical colors", () => {
    const result = getContrast([128, 128, 128], [128, 128, 128]);
    expect(result).toBe(1);
  });

  it("should be symmetric", () => {
    const color1: [number, number, number] = [255, 0, 0];
    const color2: [number, number, number] = [0, 255, 0];
    const result1 = getContrast(color1, color2);
    const result2 = getContrast(color2, color1);
    expect(result1).toBe(result2);
  });

  it("should return values greater than 1", () => {
    const result = getContrast([255, 255, 255], [128, 128, 128]);
    expect(result).toBeGreaterThan(1);
  });
});

describe("getContrastTextColor", () => {
  it("should return black text for light colors", () => {
    const result = getContrastTextColor("#ffffff");
    expect(result).toBe("#000000");
  });

  it("should return white text for dark colors", () => {
    const result = getContrastTextColor("#000000");
    expect(result).toBe("#ffffff");
  });

  it("should return black text for yellow (bright color)", () => {
    const result = getContrastTextColor("#ffff00");
    expect(result).toBe("#000000");
  });

  it("should return white text for dark blue", () => {
    const result = getContrastTextColor("#000080");
    expect(result).toBe("#ffffff");
  });

  it("should handle lowercase hex colors", () => {
    const result = getContrastTextColor("#abc123");
    expect(result).toBe("#000000");
  });

  it("should handle uppercase hex colors", () => {
    const result = getContrastTextColor("#ABC123");
    expect(result).toBe("#000000");
  });

  it("should throw error for invalid hex format - no hash", () => {
    expect(() => getContrastTextColor("ffffff")).toThrow("Invalid hex color");
  });

  it("should throw error for invalid hex format - wrong length", () => {
    expect(() => getContrastTextColor("#fff")).toThrow("Invalid hex color");
    expect(() => getContrastTextColor("#fffffff")).toThrow("Invalid hex color");
  });

  it("should throw error for invalid hex characters", () => {
    expect(() => getContrastTextColor("#gggggg")).toThrow("Invalid hex color");
    expect(() => getContrastTextColor("#12345z")).toThrow("Invalid hex color");
  });
});
