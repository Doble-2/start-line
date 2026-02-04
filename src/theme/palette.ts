export const palette = {
  black: "#050507",
  white: "#FFFFFF",

  surface0: "#07070B",
  surface1: "#0E0E14",
  surface2: "#14141D",
  surface3: "#1B1B27",

  textPrimary: "rgba(255,255,255,0.92)",
  textSecondary: "rgba(255,255,255,0.70)",
  textTertiary: "rgba(255,255,255,0.52)",

  border: "rgba(255,255,255,0.10)",

  vino: "#6B0F1A",
  vino2: "#8C1D2D",
  purple: "#6D28D9",
  purple2: "#8B5CF6",
  magenta: "#B5179E",

  // Accent colors (más “friendly”)
  pink: "#FF4FD8",
  coral: "#FF5D6C",
  sky: "#38BDF8",
  mint: "#34D399",
  lemon: "#FDE047",

  success: "#22C55E",
  danger: "#EF4444",
} as const;

export type Palette = typeof palette;
