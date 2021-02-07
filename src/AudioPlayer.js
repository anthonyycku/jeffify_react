import { useState, useEffect } from "react";

export default function AudioPlayer() {
    const [duration, setDuration] = useState();
    const [currentTime, setCurTime] = useState();
    const [playing, setPlaying] = useState(false);
    const [clickedTime, setClickedTime] = useState();

    useEffect(() => {
        const audio = document.getElementById("audio");

        const setAudioData = () => {
            setDuration(audio.duration);
            setCurTime(audio.currentTime);
        }

        const setAudioTime = () => setCurTime(audio.currentTime);

        audio.addEventListener("loadeddata", setAudioData);
        audio.addEventListener("timeupdate", setAudioTime);

        playing ? audio.play() : audio.pause();

        if (clickedTime && clickedTime !== currentTime) {
            audio.currentTime = clickedTime;
            setClickedTime(null);
        }


        return () => {
            audio.removeEventListener("loadeddata", setAudioData);
            audio.removeEventListener("timeupdate", setAudioTime);
        }
    });

    return {
        currentTime, duration, playing, setPlaying, setClickedTime
    }
}
