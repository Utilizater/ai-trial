// src/components/Layout/styles.ts
import { SxProps, Theme } from '@mui/material/styles';

interface Styles {
  layoutContainer: SxProps<Theme>;
  navigation: SxProps<Theme>;
  mainContent: SxProps<Theme>;
  contentWrapper: SxProps<Theme>;
  resizer: SxProps<Theme>;
  resizerContainer: SxProps<Theme>;
  damionHeading: SxProps<Theme>;
}

export const styles: Styles = {
  layoutContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
  contentWrapper: {
    height: '100%',
    overflow: 'hidden',
  },
  resizerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: '#1A1938',
  },
  resizer: {
    width: '10px',
    bgcolor: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    cursor: 'col-resize',
    height: '100px',
    // '&:hover': {
    //   bgcolor: '#999',
    // },
  },
  damionHeading: {
    fontFamily: 'var(--font-damion)',
    fontSize: '2rem',
    fontWeight: 'normal',
  },
};
