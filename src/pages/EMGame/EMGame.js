import { Box, Typography } from "@mui/material";
import React from "react";
import EmojiGame from "../../component/EmojiGame/EmojiGame"
import GameRulesModal from "../../common/GameRules/GameRulesModal";
import Topbar from "../../component/Dashboard/Topbar";
import Sidebar from "../../component/Dashboard/Sidebar";
import Container from "@mui/material/Container";


const AQTest = () => {
  // const theme = useTheme;
  // const colors = tokens(theme.palette.mode);
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
            Emoji Test
          </Typography>
          <Typography variant="h5"
            sx={{ m: "0px 25px" }} >

          </Typography>
          <Typography variant="h5"
            sx={{ m: "0px 25px" }} >

          </Typography>
          <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
            <EmojiGame />
            {showRules && (
              <GameRulesModal
                title="Emoji Test Rules"
                rules="Guess the emotion shown by the emoji! Select the correct option to score points. Are you ready?"
                onStart={startGame}
              />
            )}
          </Container>
        </Box>
      </main>
    </div>
  );
};

export default AQTest;
