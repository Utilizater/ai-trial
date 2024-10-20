// src/app/layout.tsx
import { Inter, Damion } from 'next/font/google';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
// import { store } from '../lib/store';
import './styles/globals.css';
import StoreProvider from './StoreProvider';

const inter = Inter({ subsets: ['latin'] });
const damion = Damion({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-damion',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${inter.className} ${damion.variable}`}>
      <body>
        <StoreProvider>
          <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}

function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      {children}
    </ThemeProvider>
  );
}
