import React, { useState } from "react";
import { Box, Dialog, Slide } from "@mui/material";
import Card from "@mui/material/Card";
import Modal from "./Modal";
import PlaceBetLoader from "./PlaceBetLoader";
import "./PlaceBet.css";
import {
    INVALID_BET_SUBMITTED,
    INVALID_BET_RATE_SUBMITTED,
    INVALID_BET_USER_NOT_ELIGIBLE,
    INVALID_BET_MARKET_NOT_LIVE,
    INVALID_BET_INSUFFICIENT_BALANCE,
    MARKET_MATCH_ODDS,
    MARKET_BOOKMAKER,
    MARKET_TOSS_ODDS,
    MARKET_FANCY_BET,
    SOMETHING_WENT_WRONG
} from "../common/constants";
import { placeCricBet } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../actions/message";

const SlideTransition = React.forwardRef((props, ref) => {
    return (
        <Slide
            direction="up"
            ref={ref}
            {...props}
            timeout={0}
            mountOnEnter
            unmountOnExit
            className="slide-up"
        />
    );
});

export default function PlaceBetDialog({ yesValue, noValue,logout, showToastMessage, candidateMarketId, waitTime, backSelected, betType, marketType, candidateRate, nation, candidate, setShowPlaceBetDialog, preBetPreferenceData }) {

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const [betInputValue, setBetInputValue] = useState("");
    const [successful, setSuccessful] = useState(false);

    const bets = [
        preBetPreferenceData.pb1,
        preBetPreferenceData.pb2,
        preBetPreferenceData.pb3,
        preBetPreferenceData.pb4,
        preBetPreferenceData.pb5,
        preBetPreferenceData.pb6,
        preBetPreferenceData.pb7,
        preBetPreferenceData.pb8,
    ];

    const handleBetButtonClick = (bet, index) => {
        setBetInputValue(bet);
    };

    const handleBetInputChange = (event, index) => {
        event.preventDefault();
        console.log("handleBetInputChange", "handleBetInputChange");
        const b = event.target.value;
        setBetInputValue(b);
    };

    const [showLoader, setShowLoader] = useState(false);
    const handlePlaceBetClick = (e) => {
        e.preventDefault();
        if (candidateRate <= 0) {
            showToastMessage("Bet can not be placed.");
        } else {
            setShowLoader(true);
        }
    }

    const placeBet = () => {
        setSuccessful(false);
        console.log("place bet", candidateMarketId, candidate, betInputValue, betType, candidateRate);
        if (betType === MARKET_FANCY_BET) {
            dispatch(placeCricBet(candidateMarketId, candidate, betInputValue, MARKET_FANCY_BET, candidateRate, yesValue, noValue))
                .then((data) => {
                    console.log("place bet res: ", data);
                    if (data.status === 401 && data.data !== SOMETHING_WENT_WRONG) {
                        logout();
                    } else if (data.data === INVALID_BET_SUBMITTED
                        || data.data === INVALID_BET_RATE_SUBMITTED
                        || data.data === INVALID_BET_USER_NOT_ELIGIBLE
                        || data.data === INVALID_BET_MARKET_NOT_LIVE
                        || data.data === INVALID_BET_INSUFFICIENT_BALANCE
                        || data.data === SOMETHING_WENT_WRONG
                    ) {
                        setSuccessful(false);
                        showToastMessage(data.data);
                    } else if (data.status === 200) {
                        showToastMessage("Bet Done", true);
                        setSuccessful(true);
                        setShowPlaceBetDialog(false);
                    }
                })
                .catch(() => {
                });
        } else {
            dispatch(placeCricBet(candidateMarketId, candidate, betInputValue, betType, candidateRate))
                .then((data) => {
                    console.log("place bet resp: ", data);
                    if (data.status === 401 && data.data !== SOMETHING_WENT_WRONG) {
                        logout();
                    } else if (data.data === INVALID_BET_SUBMITTED
                        || data.data === INVALID_BET_RATE_SUBMITTED
                        || data.data === INVALID_BET_USER_NOT_ELIGIBLE
                        || data.data === INVALID_BET_MARKET_NOT_LIVE
                        || data.data === INVALID_BET_INSUFFICIENT_BALANCE
                        || data.data === SOMETHING_WENT_WRONG
                    ) {
                        setSuccessful(false);
                        showToastMessage(data.data);
                    } else if (data.status === 200) {
                        showToastMessage("Bet Done", true);
                        setSuccessful(true);
                        setShowPlaceBetDialog(false);
                    }
                })
                .catch(() => {
                });
        }
        setShowLoader(false);
    }

    return (
        <div className="full-width-dialog-container">
            <Dialog
                open={true}
                TransitionComponent={SlideTransition}
                keepMounted
                fullWidth
                maxWidth={false}
                disableEscapeKeyDown={false}
                onClose={() => setShowPlaceBetDialog(false)}
                sx={{
                    width: '100vw',
                    margin: 0,
                    '& .MuiDialog-container': {
                        width: '100%',
                        margin: 0,
                        padding: 0,
                    },
                    '& .MuiDialog-paper': {
                        position: 'fixed',
                        bottom: 0,
                        margin: 0,
                        width: '100%',
                        maxWidth: '100%',
                        borderRadius: '16px 16px 0 0',
                        maxHeight: '80vh',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    },
                }}
            >
                {showLoader && (
                    <div className="loader-container">
                        <div className="loader-content">
                            <PlaceBetLoader time={waitTime} laps={1} placeBetFunction={placeBet} />
                        </div>
                    </div>
                )}
                
                <Card variant="outlined" square={true} className={candidate === "back" ? "back-selected" : "lay-selected"}>
                    <Box className="game-bets">
                        {bets.map((bet, indexBet) => (
                            <button
                                className="bet-amount-button"
                                variant="contained"
                                color="inherit"
                                key={indexBet}
                                onClick={() => handleBetButtonClick(bet)}
                            >
                                {bet}
                            </button>
                        ))}
                    </Box>
                </Card>
                <Card variant="outlined" square={true}>
                    <Box className="bet-dialog-content">
                        <div className="bet-market-info">
                            <div className="bet-market-info-item">
                                <div className="bet-selected-market-state-header">
                                    <label>Market: </label>
                                </div>
                                <div className="bet-selected-market-state-value">
                                    <label>{marketType}</label>
                                </div>
                            </div>
                            
                            <div className="bet-market-info-item">
                                <div className="bet-selected-market-state-header">
                                    <label>RATE: </label>
                                </div>
                                <div className="bet-selected-market-state-value">
                                    <label>{candidateRate}</label>
                                </div>
                            </div>
                            
                            <div className="bet-market-info-item">
                                <div className="bet-selected-market-state-header">
                                    <label>TEAM: </label>
                                </div>
                                <div className="bet-selected-market-state-value">
                                    <label>{nation}</label>
                                </div>
                            </div>
                            
                            <div className="bet-market-info-item">
                                <div className="bet-selected-market-state-header">
                                    <label>BET: </label>
                                </div>
                                <div className="bet-selected-market-state-value">
                                    {candidate === "back" ? 
                                        <span className="bet-type-back">BACK</span> : 
                                        <span className="bet-type-lay">LAY</span>
                                    }
                                </div>
                            </div>
                        </div>
                        
                        <div className="bet-input-container">
                            <input
                                className="bet-input"
                                variant="standard"
                                type="number"
                                value={betInputValue}
                                onChange={(e) => handleBetInputChange(e)}
                                placeholder="Enter Coins"
                            />
                        </div>
                        
                        <div className="bet-buttons-container">
                            <button className="bet-cancel-button" onClick={() => setShowPlaceBetDialog(false)}>
                                CANCEL
                            </button>
                            <button className="bet-done-button" onClick={(e) => handlePlaceBetClick(e)}>
                                DONE
                            </button>
                        </div>
                    </Box>
                </Card>
            </Dialog>
        </div>
    );
};