import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
import AQTest from "./pages/AQTest/AQTest";
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import { AuthProvider } from './context/Auth';
import PrivateRoute from './common/guards/PrivateRoute';
import FingerTapping from './pages/FingerTapping/FIngerTapping';
import EMGame from './pages/EMGame/EMGame';
import MemoryTest from './pages/MemoryTest/MemoryTest';
import BallGame from './pages/BallGame/BallGame';
import WebGazerGame from './pages/WebGazerGame/WebGazerGame';
import ContactDoctor from './pages/ContactDoctor/ContactDoctor';

import LandingPage from './pages/LandingPage/LandingPage';

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh', width: '100%' }}>
          <AuthProvider>

            <Router>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <PrivateRoute exact path="/Home" component={Home} />
                <PrivateRoute path="/AQTest" component={AQTest} />
                <PrivateRoute path="/FingerTapping" component={FingerTapping} />
                <PrivateRoute path="/EmojiTest" component={EMGame} />
                <PrivateRoute path="/MemoryTest" component={MemoryTest} />
                <PrivateRoute path="/BallGame" component={BallGame} />
                <PrivateRoute path="/WebGazerGame" component={WebGazerGame} />
                <PrivateRoute path="/ContactDoctor" component={ContactDoctor} />
                <Route path="/SignIn" component={SignIn} />
                <Route path="/SignUp" component={SignUp} />
                <Route exact path="*" component={SignIn} />
              </Switch>
            </Router>

          </AuthProvider>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
