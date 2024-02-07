import { recipe } from '@vanilla-extract/recipes';

export const profile = recipe({
  base: {
    objectFit: 'contain',
  },

  variants: {
    size: {
      small: {
        borderRadius: '1.2rem',
      },
      medium: {
        borderRadius: '1.2rem',
      },
      large: {
        borderRadius: '2.4rem',
      },
      xLarge: {
        borderRadius: '2.4rem',
      },
    },
  },

  defaultVariants: {
    size: 'large',
  },
});
