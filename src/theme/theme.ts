import { palette } from './palette';
import { radius } from './radius';
import { spacing } from './spacing';
import { typography } from './typography';

export const theme = {
  palette,
  radius,
  spacing,
  typography,
  gradients: {
    action: [palette.vino, palette.purple] as const,
    actionAlt: [palette.vino2, palette.magenta] as const,
  },
} as const;

export type AppTheme = typeof theme;
