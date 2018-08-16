import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#009688' }, 
        secondary: { main: '#ff5722' }, 
        textColor: { main: '#333333'}
    },
});

const App = ({ children }) => (
  <div>
    <MuiThemeProvider theme={theme}>
      <Header />

      <main style={{marginTop: 75}}>
        {children}
      </main>

      <Footer />
    </MuiThemeProvider>
  </div>
);

export default App;
