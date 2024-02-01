import { colors } from '@linker/styles';
import { style } from '@vanilla-extract/css';

export const timelineItemContainer = style({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  paddingLeft: '2rem',
});

export const timelineItemTimeDividerWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
export const timelineItemTimeDivider = style({
  height: '100%',
  border: `0.1rem solid ${colors.gray300}`,
  background: `${colors.gray300}`,
});
export const timelineItemInfoWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  position: 'relative',
  zIndex: '-10',
});

export const timelineItmeInfoTextWrapper = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: '0.5rem',
  marginBottom: '0.4rem',
});

export const timelineItemHeaderWrapper = style({
  marginLeft: '1.4rem',
});

export const timelineRowWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '0.4rem',
  alignItems: 'center',
});

export const timelineColorDivider = style({
  position: 'absolute',
  left: '-1.4rem',
  width: '0.4rem',
  borderRadius: '0.8rem',
  height: '100%',
});
export const timelineItemDivider = style({
  marginTop: '1.2rem',
  width: '100%',
  height: '0.1rem',
  background: `${colors.gray100}`,
});

export const timelineItemMemoWrapper = style({
  marginTop: '1.4rem',
  display: 'flex',
  flexDirection: 'column',
});
