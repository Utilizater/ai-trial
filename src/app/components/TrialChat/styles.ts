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
}

export const styles: Styles = {
  container: {
    height: '800px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    bgcolor: '#1A1938',
    padding: 1,
    // border: '2px solid red',
  },
  headerContainer: {
    width: '100%',
    mb: 2,
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
    marginTop: '-15px',
    bgcolor: 'white',
    // border: '2px solid red',
    width: '90%',
    height: '81.5%',
    maxHeight: 'calc(100% - 1px)', // Adjust 60px based on your heading's height
    borderRadius: 1,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center', // This will center the container horizontally
    overflow: 'auto', // Add scrolling if content exceeds container height
  },
  chatBox: {
    flex: 1,
    overflow: 'auto',
    bgcolor: '#f5f5f5',
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
    p: 1,
    // bgcolor: 'primary.light',
    bgcolor: 'background.paper',
    borderRadius: 1,
  },
  nonJudgeMessage: {
    alignSelf: 'flex-start',
    maxWidth: '70%',
    p: 1,
    bgcolor: 'background.paper',
    borderRadius: 1,
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
};
