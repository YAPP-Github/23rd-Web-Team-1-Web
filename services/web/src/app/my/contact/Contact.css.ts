import { style } from '@vanilla-extract/css';

export const wrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '24px',
  paddingRight: '24px',
  overflow: 'auto',
});
export const searchInputWrapper = style({
  marginTop: '1.9rem',
});

export const nonLoginWrapper = style({
  width: '100%',
  height: '30rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
