import { Box, Typography } from "@mui/material";
import Topbar from "../../component/Dashboard/Topbar";
import Sidebar from "../../component/Dashboard/Sidebar";
import Container from "@mui/material/Container";
import MGame from "../../component/MemoryGame/MGame"
import React from 'react';
import GameRulesModal from "../../common/GameRules/GameRulesModal";


const AQTest = () => {
    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    const [showRules, setShowRules] = React.useState(true); // Using React.useState instead of importing useState
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
                        sx={{ m: "5px 25px" }}>
                        Memory Game
                    </Typography>
                    <Typography variant="h5"
                        sx={{ m: "0px 25px" }} >
                    </Typography>
                    <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
                        <MGame />
                        {showRules && (
                            <GameRulesModal
                                title="Memory Game Rules"
                                rules="Watch the sequence of highlighted blocks carefully and repeat it! The sequence gets longer each round. Ready?"
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
