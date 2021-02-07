import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

export default function Bar(props) {
    const { duration, currentTime, onTimeUpdate } = props;
    const percentage = (currentTime / duration) * 100;

    function format(duration) {
        return moment.duration(duration, "seconds").format("mm:ss", { trim: false })
    }

    function setClickedTime(event) {
        const clickPositionX = event.pageX;
        const bar = document.querySelector(".timelinebar");
        const barStart = bar.getBoundingClientRect().left + window.scrollX;
        const barWidth = bar.offsetWidth;
        const clickPositionInBar = clickPositionX - barStart;
        const timePerPixel = duration / barWidth;
        return timePerPixel * clickPositionInBar;
    }

    function handleTimeDrag(event) {
        onTimeUpdate(setClickedTime(event))

        const updateTimeOnMove = move => {
            onTimeUpdate(setClickedTime(move))
        }

        document.addEventListener("mouseMove", updateTimeOnMove);

        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", updateTimeOnMove);
        })
    }

    return (
        <div className="bar">
            <span className="barTime"> {format(currentTime)}</span>
            <div
                className="timelinebar"
                style={{ background: `linear-gradient(to right, green ${percentage}%, white 0` }}
                onMouseDown={event => handleTimeDrag(event)}>
                <div className="knob" style={{ left: `${percentage - 2}%` }}></div>
            </div>
            <span className="barTime">{format(duration)}</span>
        </div>
    )
}