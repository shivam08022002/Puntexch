// import { Widgets } from "@mui/icons-material";
import React from "react";
import ReactSpinnerTimer from "react-spinner-timer";
import "./PlaceBet.css";

function BetPlaceLoader({ time, laps, placeBetFunction }) {
    const handleChange = (lap) => {
        if (lap.isFinish) {
            placeBetFunction();
            console.log("Finished!!");
        } else {
            console.log("Running!! Lap:", lap.actualLap);
        }
    };
    return (
        <ReactSpinnerTimer
            timeInSeconds={time}
            totalLaps={laps}
            isRefresh={false}
            onLapInteraction={handleChange}
            isPause={false}
        />
    );
}
export default BetPlaceLoader;