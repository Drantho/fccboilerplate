import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import User from './User';
import NewMint from './NewMint';
import ViewMint from './ViewMint';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Profile from './Profile';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#009688' }, 
        secondary: { main: '#ff5722' }, 
        textColor: { main: '#333333'}
    },
});

class App extends React.Component{

    render(){

        return(

            <Router forceRefresh={true}>
            
                <MuiThemeProvider theme={theme}>
                    
                    <Header />
                
                    <main style={{marginTop: 75}}>
            
                        <Route exact path='/' component={Home}/>                        
                        <Route exact path='/User/:uid' component={User} />                        
                        <Route exact path='/NewMint' component={NewMint} />
                        <Route exact path='/ViewMint/:mintId' component={ViewMint} />
                        <Route exact path='/SignUp' component={SignUp} />                    
                        <Route exact path='/SignIn' component={SignIn} />                        
                        <Route exact path='/Profile' component={Profile} />
            
                    </main>

                    <Footer />
        
                </MuiThemeProvider>

            </Router>
                    
        )

    }
  
}

export default App;
