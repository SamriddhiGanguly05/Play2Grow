import React from 'react'
import { Box, Typography } from "@mui/material";
import Topbar from "../../component/Dashboard/Topbar";
import Sidebar from "../../component/Dashboard/Sidebar";
import Container from "@mui/material/Container";
import BallClicker from '../../component/BallClicker/BallClicker';
import GameRulesModal from "../../common/GameRules/GameRulesModal";


const BallGame = () => {
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
            Ball Clicking Test
          </Typography>
          <Typography variant="h5"
            sx={{ m: "0px 25px" }} >

          </Typography>
          <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
            <BallClicker />
            {showRules && (
              <GameRulesModal
                title="Ball Clicking Rules"
                rules="Click on the red balls as they appear on the screen! Be quick and don't miss them. Ready?"
                onStart={startGame}
              />
            )}
          </Container>
        </Box>
      </main>
    </div>
  )
}

export default BallGame