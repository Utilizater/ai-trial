// src/components/CaseInput/styles.ts
import { SxProps, Theme } from '@mui/material/styles';

interface Styles {
  container: SxProps<Theme>;
  headerContainer: SxProps<Theme>;
  heading: SxProps<Theme>;
  inputContainer: SxProps<Theme>;
  textarea: React.CSSProperties;
  buttonContainer: SxProps<Theme>;
  button: SxProps<Theme>;
}

export const styles: Styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: 1,
    bgcolor: '#1A1938',
  },
  heading: {
    fontFamily: 'var(--font-damion)',
    fontSize: '2rem',
    fontWeight: 'normal',
    color: '#B7DA3D',
    mb: 1,
    userSelect: 'none',
  },
  inputContainer: {
    bgcolor: 'white',
    width: '90%',
    flex: 1,
    minHeight: 0,
    borderRadius: 1,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '4px',
    resize: 'none',
    overflow: 'auto',
    backgroundColor: 'transparent',
    color: 'black',
    flex: 1,
    minHeight: '150px',
    marginBottom: '16px',
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: '14px',
    lineHeight: '1.5',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mt: 1,
  },
  button: {
    color: '#B7DA3D',
    borderColor: '#B7DA3D',
    '&:hover': {
      borderColor: '#D4E584',
      backgroundColor: 'rgba(183, 218, 61, 0.04)',
    },
  },
  headerContainer: {
    marginLeft: '27px',
  },
};
