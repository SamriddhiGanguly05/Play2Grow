import React, { useEffect, useRef, useState, useContext } from 'react';
import GameRulesModal from '../../common/GameRules/GameRulesModal';
import { Button, Typography, Box } from '@mui/material';
import Axios from "axios";
import { AuthContext } from '../../context/Auth';
import Topbar from "../../component/Dashboard/Topbar";
import Sidebar from "../../component/Dashboard/Sidebar";

const WebGazerGame = () => {
    const gameContainerRef = useRef(null);
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameStarted, setGameStarted] = useState(false); // Game Loop Active
    const [isCalibrating, setIsCalibrating] = useState(false); // Calibration Phase Active
    const [status, setStatus] = useState("Waiting...");
    const [canSubmit, setCanSubmit] = useState(false);

    // Calibration State: 9 points. 
    const [calibrationPoints, setCalibrationPoints] = useState([]);
    const [calibrationComplete, setCalibrationComplete] = useState(false);

    const scoreRef = useRef(0);
    const animationRef = useRef(null);
    const ballsRef = useRef([]);

    const { currentUser } = useContext(AuthContext);

    const stopWebGazer = () => {
        if (window.webgazer) {
            try {
                window.webgazer.clearGazeListener();
                window.webgazer.end();
            } catch (e) {
                console.warn("WebGazer end failed:", e);
            }
        }
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        const svg = document.getElementById("gameSVG");
        if (svg) svg.remove();

        const videoIds = ["webgazerVideoFeed", "webgazerVideoCanvas", "webgazerFaceOverlay", "webgazerFaceFeedbackBox"];
        videoIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.remove();
        });
    };

    useEffect(() => {
        return () => {
            stopWebGazer();
        };
    }, []);

    // 1. Initialize WebGazer (but don't start game loop yet)
    const initWebGazer = async () => {
        setStatus("Initializing Webcam...");
        if (!window.d3 || !window.webgazer) {
            setStatus("Error: Libraries not loaded. Refresh.");
            return;
        }

        const webgazer = window.webgazer;
        try {
            stopWebGazer();

            // Gaze Listener primarily for visualization during calibration
            webgazer.setGazeListener(gazeListener);

            await webgazer.setRegression('ridge')
                .setTracker('TFFacemesh')
                .begin();

            webgazer.showVideoPreview(true)
                .showPredictionPoints(false)
                .applyKalmanFilter(true);

            setStatus("Ready to Calibrate");
            startCalibration();

        } catch (e) {
            console.error(e);
            setStatus(`Error: ${e.message || e}`);
        }
    };

    // 2. Calibration Logic
    const startCalibration = () => {
        setIsCalibrating(true);
        // Generate 9 points grid
        const points = [
            { id: 0, x: '10%', y: '10%', clicks: 0 }, { id: 1, x: '50%', y: '10%', clicks: 0 }, { id: 2, x: '90%', y: '10%', clicks: 0 },
            { id: 3, x: '10%', y: '50%', clicks: 0 }, { id: 4, x: '50%', y: '50%', clicks: 0 }, { id: 5, x: '90%', y: '50%', clicks: 0 },
            { id: 6, x: '10%', y: '90%', clicks: 0 }, { id: 7, x: '50%', y: '90%', clicks: 0 }, { id: 8, x: '90%', y: '90%', clicks: 0 },
        ];
        setCalibrationPoints(points);
    };

    const handleCalibrationClick = (item) => {
        const newPoints = [...calibrationPoints];
        const point = newPoints.find(p => p.id === item.id);
        point.clicks += 1;
        setCalibrationPoints(newPoints);

        if (newPoints.every(p => p.clicks >= 5)) {
            finishCalibration();
        }
    };

    const finishCalibration = () => {
        setIsCalibrating(false);
        setCalibrationComplete(true);
        setStatus("Calibration Done. Ready to Play!");
        alert("Calibration Complete! Focus on the Center to start.");
    };

    // 3. Game Logic (Pursuit)
    const startGame = () => {
        if (!calibrationComplete) {
            alert("Please complete calibration first.");
            return;
        }

        setIsPlaying(true);
        setGameStarted(true);
        setCanSubmit(false);
        setStatus("Running");
        setScore(0);
        scoreRef.current = 0;

        setupGame();
    };

    const setupGame = () => {
        const d3 = window.d3;
        const width = window.innerWidth;
        const height = window.innerHeight;

        const userDetails = JSON.parse(localStorage.getItem('user_details') || '{}');
        const age = userDetails.age ? parseInt(userDetails.age) : 20;

        const targetSpeed = age < 10 ? 2 : 5;
        const distractorSpeed = age < 10 ? 2 : 4;
        const numDistractors = age < 10 ? 3 : 8;
        const targetRadius = age < 10 ? 40 : 30;

        const newBalls = [];

        // Target Ball (Index 0)
        newBalls.push({
            id: 'target',
            x: width / 2,
            y: height / 2,
            vx: (Math.random() - 0.5) * targetSpeed * 2,
            vy: (Math.random() - 0.5) * targetSpeed * 2,
            r: targetRadius,
            color: 'red',
            type: 'target'
        });

        // Distractors
        for (let i = 0; i < numDistractors; i++) {
            newBalls.push({
                id: `distractor-${i}`,
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * distractorSpeed * 2,
                vy: (Math.random() - 0.5) * distractorSpeed * 2,
                r: Math.random() * 10 + 15,
                color: '#aaa',
                type: 'distractor'
            });
        }

        ballsRef.current = newBalls;

        d3.select("#gameSVG").remove();

        const svg = d3.select("body").append("svg")
            .attr("id", "gameSVG")
            .attr("width", width)
            .attr("height", height)
            .style("position", "absolute")
            .style("top", "0")
            .style("left", "0")
            .style("z-index", 99998)
            .style("pointer-events", "none");

        svg.append("circle")
            .attr("id", "gazePoint")
            .attr("r", 10)
            .style("fill", "blue")
            .style("opacity", 0.7);

        updateGameLoop();
    };

    const gazeListener = (data, clock) => {
        if (!data) return;

        const d3 = window.d3;
        const gazeDot = d3.select("#gazePoint");
        if (!gazeDot.empty()) {
            gazeDot.attr("cx", data.x).attr("cy", data.y);
        }

        if (scoreRef.current !== undefined && document.getElementById("gameSVG")) {
            checkTracking(data.x, data.y);
        }
    };

    const checkTracking = (gx, gy) => {
        if (!ballsRef.current || !ballsRef.current.length) return;

        const target = ballsRef.current[0];
        const dx = gx - target.x;
        const dy = gy - target.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < target.r + 60) {
            scoreRef.current += 1;
            if (scoreRef.current % 10 === 0) {
                setScore(prev => prev + 1);
            }
        }
    };

    const updateGameLoop = () => {
        if (!ballsRef.current.length) return;

        const width = window.innerWidth;
        const height = window.innerHeight;
        const d3 = window.d3;
        const svg = d3.select("#gameSVG");

        ballsRef.current.forEach(ball => {
            ball.x += ball.vx;
            ball.y += ball.vy;

            if (ball.x - ball.r < 0) { ball.x = ball.r; ball.vx *= -1; }
            else if (ball.x + ball.r > width) { ball.x = width - ball.r; ball.vx *= -1; }

            if (ball.y - ball.r < 0) { ball.y = ball.r; ball.vy *= -1; }
            else if (ball.y + ball.r > height) { ball.y = height - ball.r; ball.vy *= -1; }
        });

        const circles = svg.selectAll(".gameBall")
            .data(ballsRef.current, d => d.id);

        circles.enter().append("circle")
            .attr("class", "gameBall")
            .attr("r", d => d.r)
            .style("fill", d => d.color)
            .style("stroke", d => d.type === 'target' ? 'black' : 'none')
            .style("stroke-width", 2);

        circles
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        circles.exit().remove();

        animationRef.current = requestAnimationFrame(updateGameLoop);
    };

    const stopGame = () => {
        setIsPlaying(false);
        setCanSubmit(true);
        setStatus("Stopped. Score: " + score);
        stopWebGazer();
        ballsRef.current = [];
    };

    const submitScore = () => {
        if (!currentUser) {
            alert("Please login to submit score.");
            return;
        }

        const userId = currentUser.uid;
        // Tracking Score roughly translates to time in frame? 
        // Let's just save the raw score number.

        Axios.post(`https://fun-games-c4f99-default-rtdb.firebaseio.com/EyeTrackingTest/${userId}.json`, {
            score: score,
            user: currentUser.email,
            Timestamp: new Date().toUTCString(),
        })
            .then(() => {
                alert("Score submitted successfully!");
                setCanSubmit(false); // Disable after submit
            })
            .catch(err => {
                console.error("Error submitting score:", err);
                alert("Failed to submit score.");
            });
    };

    const CalibrationNode = ({ point, onClick }) => {
        const opacity = Math.min(0.2 + (point.clicks * 0.2), 1);
        const color = point.clicks >= 5 ? 'green' : 'red';

        return (
            <div
                onClick={() => onClick(point)}
                style={{
                    position: 'absolute',
                    left: point.x,
                    top: point.y,
                    transform: 'translate(-50%, -50%)',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    opacity: opacity,
                    border: '2px solid black',
                    cursor: 'pointer',
                    zIndex: 100002,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 'bold'
                }}
            >
                {point.clicks < 5 ? point.clicks : '✓'}
            </div>
        );
    };


    return (
        <div className="app">
            <Sidebar />
            <main className="content">
                <Topbar />
                <div style={{ padding: '20px', textAlign: 'center', height: 'calc(100vh - 80px)', overflow: 'hidden', position: 'relative' }}>
                    <style>{`
                        #webgazerVideoFeed {
                            position: fixed !important;
                            top: unset !important;
                            bottom: 20px !important;
                            left: 20px !important;
                            z-index: 99999 !important;
                            width: 240px !important;
                            height: 180px !important;
                            display: block !important;
                            border: 2px solid white;
                            border-radius: 8px;
                        }
                    `}</style>

                    {!isCalibrating && !calibrationComplete && !isPlaying && (
                        <GameRulesModal
                            title="Calibration Required"
                            rules="To track your eyes, we need to calibrate. 1. Click 'Start Calibration'. 2. Click each Red Circle 5 times while looking at it. 3. When they turn Green, you are done!"
                            onStart={initWebGazer}
                        />
                    )}

                    {isCalibrating && (
                        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255,255,255,0.95)', zIndex: 100000 }}>
                            <Typography variant="h5" sx={{ mt: 10 }}>Click each circle 5 times to calibrate!</Typography>
                            {calibrationPoints.map(p => (
                                <CalibrationNode key={p.id} point={p} onClick={handleCalibrationClick} />
                            ))}
                        </div>
                    )}

                    {calibrationComplete && (
                        <>
                            {/* Score Panel - Adjusted Z-Index and position */}
                            <Box sx={{
                                position: 'absolute',
                                top: 20,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                zIndex: 1000,
                                background: 'rgba(255,255,255,0.9)',
                                padding: '10px 30px',
                                borderRadius: '20px',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}>
                                <Typography variant="h4" fontWeight="bold">Score: {score}</Typography>
                                <Typography variant="caption">{status}</Typography>
                            </Box>

                            <Box sx={{ position: 'absolute', bottom: 30, right: 30, zIndex: 1000 }}>
                                {!isPlaying ? (
                                    <Button
                                        variant="contained"
                                        color="success"
                                        size="large"
                                        onClick={startGame}
                                        sx={{ fontSize: '1.2rem', padding: '10px 40px', borderRadius: '30px', mr: 2 }}
                                    >
                                        Start Game
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="large"
                                        onClick={stopGame}
                                        sx={{ fontSize: '1.2rem', padding: '10px 40px', borderRadius: '30px' }}
                                    >
                                        Stop Game
                                    </Button>
                                )}

                                {/* Submit Button */}
                                {!isPlaying && canSubmit && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={submitScore}
                                        sx={{ fontSize: '1.2rem', padding: '10px 40px', borderRadius: '30px' }}
                                    >
                                        Submit Score
                                    </Button>
                                )}
                            </Box>
                        </>
                    )}

                    <div ref={gameContainerRef}></div>
                </div>
            </main>
        </div>
    );
};

export default WebGazerGame;
