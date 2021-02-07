import React from "react";

export default function Play(props) {
    const { handleClick } = props;

    return (
        <a className="play" onClick={() => handleClick()}>
            <i class="far fa-play-circle"></i>
        </a>
    );
}
