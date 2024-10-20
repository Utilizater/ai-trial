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
    // paddingLeft: '10px',
    bgcolor: '#1A1938',
    // border: '2px solid white',
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
    // border: '2px solid red',
    width: '90%',
    height: '80%',
    maxHeight: 'calc(100% - 60px)', // Adjust 60px based on your heading's height
    borderRadius: 1,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center', // This will center the container horizontally
    overflow: 'auto', // Add scrolling if content exceeds container height
  },
  textarea: {
    width: '95%',
    padding: '8px',
    border: '1px solid rgba(0, 0, 0, 0.23)', // Changed to be visible on white background
    borderRadius: '4px',
    resize: 'none',
    overflow: 'auto',
    backgroundColor: 'transparent',
    color: 'black', // Changed to be visible on white background
    flex: 1,
    marginBottom: '16px',
    outline: 'none', // Remove the default focus outline
    // '&:focus': {
    //   border: '1px solid rgba(0, 0, 0, 0.23)', // Keep the same border on focus
    //   boxShadow: 'none', // Remove any focus shadow
    // },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mt: 2,
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
