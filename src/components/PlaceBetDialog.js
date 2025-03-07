import React, { useState } from "react";
import { Box, Dialog, Slide } from "@mui/material";
import Card from "@mui/material/Card";
import PlaceBetLoader from "./PlaceBetLoader";
import {
    INVALID_BET_SUBMITTED,
    INVALID_BET_RATE_SUBMITTED,
    INVALID_BET_USER_NOT_ELIGIBLE,
    INVALID_BET_MARKET_NOT_LIVE,
    INVALID_BET_INSUFFICIENT_BALANCE,
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

export default function PlaceBetDialog({ logOut, yesValue, noValue, showToastMessage, candidateMarketId, waitTime, backSelected, betType, marketType, candidateRate, nation, candidate, setShowPlaceBetDialog, preBetPreferenceData }) {

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const [betInputValue, setBetInputValue] = useState("");
    const [successful, setSuccessful] = useState(false);

    const backColor = "#7AA3F6";
    const layColor = "#FFFFFF";
    const posColor = "#F8F8F8";

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

    var betBackgroundColor;
    const getBetBackgroundColorWithOpacity = () => {
        if (backSelected) {
            betBackgroundColor = backColor + "40";
        } else {
            betBackgroundColor = layColor + "40";
        }
        return "rgba(161, 62, 201, 0.9)"
            ;
    };

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
                        logOut();
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
                        logOut();
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
        <div>
            {showLoader && <div className="overlay">
                <div className="overlay-content">
                    <PlaceBetLoader time={waitTime} laps={1} placeBetFunction={placeBet} /></div>
            </div>}
            <Dialog
                open={true}
                TransitionComponent={SlideTransition}
                keepMounted
                // onClose={cancelClick}
                fullWidth
                maxWidth="sm"
                disableEscapeKeyDown
                sx={{
                    '& .MuiDialog-paper': {
                        position: 'fixed',
                        bottom: 0,
                        margin: 0,
                        borderRadius: '16px 16px 0 0',
                        maxHeight: '80vh',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        animation: 'slideUp 0.3s ease-out',
                    },
                    '@keyframes slideUp': {
                        from: { transform: 'translateY(100%)' },

                        to: { transform: 'translateY(0)' },
                    },
                }}
            >
                <Card variant="outlined" square={true}>
                    <Box sx={{
                        padding: "5px",
                        backgroundColor: getBetBackgroundColorWithOpacity(),
                    }}>
                        <div className="game-bets">
                            {bets.map((bet, indexBet) => (
                                <button
                                    className="bet-amount-button "
                                    variant="contained"
                                    color="inherit"
                                    style={{ border: '1px solid black', boxShadow: '1px 1px black' }}
                                    key={indexBet}
                                    // style={{border: '1px solid black 0.5'}}
                                    onClick={() => handleBetButtonClick(bet)}
                                >
                                    {bet}
                                </button>
                            ))}
                        </div>
                    </Box>
                </Card>
                <Card variant="outlined" square={true}>
                    <Box sx={{
                        padding: "10px",
                        backgroundColor: getBetBackgroundColorWithOpacity(),
                    }}>
                        <div style={{ marginBottom: "10px", padding: 'px', display: "flex", flexDirection: "row", background: "transparent" }}>
                            <div className="bet-selected-market-state-header">
                                <label>Market: </label>
                            </div>
                            <div className="bet-selected-market-state-value">
                                <label>{marketType}</label>
                            </div>
                            <div className="bet-selected-market-state-header">
                                <label>RATE: </label>
                            </div>
                            <div className="bet-selected-market-state-value">
                                <label>{candidateRate}</label>
                            </div>
                            <div className="bet-selected-market-state-header">
                                <label>TEAM: </label>
                            </div>
                            <div className="bet-selected-market-state-value">
                                <label>{nation}</label>
                            </div>
                            <div className="bet-selected-market-state-header">
                                <label>BET: </label>
                            </div>
                            <div className="bet-selected-market-state-value">
                                {candidate == "back" && <label>BACK</label>}
                                {candidate == "lay" && <label>LAY</label>}
                            </div>
                        </div>
                        <div>
                            <input
                                style={{ width: "100%", height: "50px", background: "#f1f1f1", border: "1px solid grey", fontSize: "1.2em" }}
                                variant="standard"
                                type="number"
                                value={betInputValue}
                                onChange={(e) => handleBetInputChange(e)}
                                placeholder="Enter Coins"
                            />
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "10px"
                        }}>
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