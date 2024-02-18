import { colors, typography } from '@linker/styles';
import { style } from '@vanilla-extract/css';

export const formContainer = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
});

export const labelContainer = style([
  typography({ type: 'p3', fontWeight: 'medium' }),
  {
    marginBottom: '0.4rem',
    color: colors.gray700,
  },
]);

export const textareaContainer = style({
  position: 'relative',
  height: '5.2rem',
  padding: '1.4rem 2rem',
  borderRadius: '0.8rem',
  border: 'none',
  color: colors.gray900,
  textAlign: 'start',
  backgroundColor: colors.gray000,
  resize: 'none',

  '::placeholder': {
    color: `${colors.gray300}`,
  },

  ':focus': {
    outline: 'none',
  },
});

export const errorText = style({
  marginTop: '0.8rem',
});
