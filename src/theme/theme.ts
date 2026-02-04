import { palette } from "./palette";
import { radius } from "./radius";
import { spacing } from "./spacing";
import { typography } from "./typography";

export const theme = {
  palette,
  radius,
  spacing,
  typography,
  gradients: {
    action: [palette.pink, palette.purple2] as const,
    actionAlt: [palette.sky, palette.mint] as const,
    warm: [palette.coral, palette.lemon] as const,
  },
} as const;

export type AppTheme = typeof theme;
