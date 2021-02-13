import React from "react";

export default function Pause(props) {
    const { handleClick } = props;

    return (
        <a className="play" onClick={() => handleClick()}>
            <i class="far fa-pause-circle"></i>
        </a>
    );
}
