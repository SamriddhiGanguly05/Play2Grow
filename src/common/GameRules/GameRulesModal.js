import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const GameRulesModal = ({ title, rules, onStart }) => {
    const [open, setOpen] = useState(true);

    const handleStart = () => {
        setOpen(false);
        if (onStart) {
            onStart();
        }
    };

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title || "Game Rules"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {rules || "Please follow the instructions to play the game."}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleStart} variant="contained" autoFocus>
                    Start Game
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GameRulesModal;
