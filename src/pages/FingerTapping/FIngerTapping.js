import { Box, Typography } from "@mui/material";
import React from "react";
import { styled, useTheme } from '@mui/material/styles';
import GameRulesModal from "../../common/GameRules/GameRulesModal";
import Topbar from "../../component/Dashboard/Topbar";
import Sidebar from "../../component/Dashboard/Sidebar";
import Tapping from "../../component/TappingGame/Tapping";
import Container from '@mui/material/Container';

const FingerTapping = () => {
  const [showRules, setShowRules] = React.useState(true);
  const [gameActive, setGameActive] = React.useState(false);

  const startGame = () => {
    setShowRules(false);
    setGameActive(true);
  };

  return (
    <div className="app">
      <Sidebar />
      <main className='content'>
        <Topbar />
        <Box sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography
            variant="h2"
            // color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: "5px 25px" }}
          >
            Finger Tapping Game
          </Typography>
          <Typography variant="h5"
            sx={{ m: "0px 25px" }} >

          </Typography>
          <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
            {showRules && (
              <GameRulesModal
                title="Finger Tapping Rules"
                rules="Tap the SPACEBAR as fast as you can for 10 seconds! Try to get the highest score possible. Ready?"
                onStart={startGame}
              />
            )}
            {/* Only mount Tapping component when game starts if it has internal timers, or just overlay rules */}
            <Tapping />
          </Container>
        </Box>
      </main>
    </div>
  );
};

export default FingerTapping;
