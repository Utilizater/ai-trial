// src/components/TrialChat/styles.ts
import { SxProps, Theme } from '@mui/material/styles';

interface Styles {
  container: SxProps<Theme>;
  headerContainer: SxProps<Theme>;
  heading: SxProps<Theme>;
  inputContainer: SxProps<Theme>;
  chatBox: SxProps<Theme>;
  messageContainer: SxProps<Theme>;
  judgeMessage: SxProps<Theme>;
  nonJudgeMessage: SxProps<Theme>;
  scenarioTextBox: SxProps<Theme>;
  scenarioText: SxProps<Theme>;
  markdownContent: SxProps<Theme>;
}

export const styles: Styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    bgcolor: '#1A1938',
    padding: 1,
  },
  headerContainer: {
    width: '100%',
    mb: 1,
    ml: 3,
  },
  heading: {
    fontFamily: 'var(--font-damion)',
    fontSize: '2rem',
    fontWeight: 'normal',
    color: '#B7DA3D',
    userSelect: 'none',
    mb: 1,
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
  chatBox: {
    flex: 1,
    overflow: 'auto',
    bgcolor: '#f5f5f5',
    borderRadius: 1,
    p: 1,
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    mb: 2,
  },
  judgeMessage: {
    alignSelf: 'flex-end',
    maxWidth: '70%',
    p: 2,
    bgcolor: '#e3f2fd',
    borderRadius: 2,
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  },
  nonJudgeMessage: {
    alignSelf: 'flex-start',
    maxWidth: '70%',
    p: 2,
    bgcolor: 'background.paper',
    borderRadius: 2,
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  },
  scenarioTextBox: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    // border: '1px solid red',
  },
  scenarioText: {
    fontFamily: 'var(--font-damion)',
    fontSize: '2rem',
    fontWeight: 'normal',
    color: 'lightgray',
    userSelect: 'none',
    mb: 1,
  },
  markdownContent: {
    '& p': {
      margin: '0.5em 0',
      lineHeight: 1.6,
    },
    '& strong': {
      fontWeight: 700,
      color: '#1a1a1a',
    },
    '& em': {
      fontStyle: 'italic',
      color: '#555',
    },
    '& ul, & ol': {
      marginLeft: '1.5em',
      marginTop: '0.5em',
      marginBottom: '0.5em',
    },
    '& li': {
      marginBottom: '0.25em',
      lineHeight: 1.6,
    },
    '& h1, & h2, & h3, & h4, & h5, & h6': {
      marginTop: '0.75em',
      marginBottom: '0.5em',
      fontWeight: 600,
    },
    '& code': {
      backgroundColor: '#f5f5f5',
      padding: '0.2em 0.4em',
      borderRadius: '3px',
      fontSize: '0.9em',
    },
    '& hr': {
      margin: '1em 0',
      border: 'none',
      borderTop: '1px solid #ddd',
    },
  },
};
