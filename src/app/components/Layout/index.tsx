// src/components/Layout/index.tsx
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import SelectedRoles from '../SelectedRoles';
import { styles } from './styles';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [leftWidth, setLeftWidth] = useState(50);

  const handleResize = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = leftWidth;

    const doDrag = (e: MouseEvent) => {
      const newWidth =
        ((e.clientX - startX) / window.innerWidth) * 100 + startWidth;
      setLeftWidth(Math.max(10, Math.min(90, newWidth))); // Limit between 10% and 90%
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', stopDrag);
  };

  return (
    <Box sx={styles.layoutContainer}>
      <Box sx={styles.navigation}>
        <Typography sx={styles.damionHeading}>Justice Flow</Typography>
      </Box>
      <SelectedRoles />
      <Box sx={styles.mainContent}>
        <Box sx={{ ...styles.contentWrapper, width: `${leftWidth}%` }}>
          {Array.isArray(children) ? children[0] : null}
        </Box>
        <Box sx={styles.resizerContainer}>
          <Box sx={styles.resizer} onMouseDown={handleResize} />
        </Box>

        <Box sx={{ ...styles.contentWrapper, width: `${100 - leftWidth}%` }}>
          {Array.isArray(children) ? children[1] : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
