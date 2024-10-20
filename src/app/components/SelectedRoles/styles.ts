// src/components/SelectedRoles/styles.ts
import { SxProps, Theme } from '@mui/material/styles';

interface Styles {
  container: SxProps<Theme>;
  dropdownsContainer: SxProps<Theme>;
  heading: SxProps<Theme>;
}

export const styles: Styles = {
  container: {
    width: '100%',
    padding: 1,
    paddingLeft: '30px',
    borderBottom: '1px solid',
    borderColor: 'divider',
    bgcolor: '#1A1938',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
  },
  dropdownsContainer: {
    width: '40%',
    display: 'flex',
    justifyContent: 'space-between',
    mt: 2,
  },
  heading: {
    fontFamily: 'var(--font-damion)',
    fontSize: '2rem',
    fontWeight: 'normal',
    color: '#B7DA3D',
    userSelect: 'none',
    mb: 1,
  },
};
