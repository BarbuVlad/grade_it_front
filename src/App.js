
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

import { createMuiTheme, MuiThemeProvider, CssBaseline, Container } from '@material-ui/core';

import { amber, indigo } from '@material-ui/core/colors';
import InsideController from './pages/InsideController';

import Layout from './Layout';
import NotFound from './pages/NotFound';

/*  Theme overriding
see: https://material-ui.com/customization/default-theme/#default-theme*/
const theme = createMuiTheme({
  palette: {
      primary:{ main: amber[600]},
      secondary: {main: indigo[500]}, /*for color obj see https://material-ui.com/customization/color/#color 
                        using an color obj, it applies the variations automatically (dark, light)*/
      background: {
        default: '#4a4a4a'
      },
  },
  //typography: {}
});


function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <CssBaseline />
    
    <Router>
      
      <Switch>
        <Route exact path="/">
            <Login/>
        </Route>

        <Route path="/register">
          <div style={{}}>
          <Register />
          </div>
        </Route>

        <Route path="/home">
            <Home/>
        </Route>

        <Route path="/app">
            <InsideController/>
        </Route>
        <Route path='*' exact={true} component={NotFound} />

      </Switch>
    
    </Router>
    </MuiThemeProvider>
  );
}

export default App;
