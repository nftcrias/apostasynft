import React, { useState, useEffect } from "react";

var audio = new Audio("https://cdn.discordapp.com/attachments/1092318521276510208/1092318763015208990/samurai-jack_the_bucket.mp3");

const Player = ({}) => {

    const [isPlaying, setIsPlaying] = useState(0);

    function playSfx(){
        audio.play();
        setIsPlaying(audio.paused ? 0 : 1);
    }

    function stopSfx(){
        audio.pause();
        setIsPlaying(0);
    }

    useEffect(()=> {
        playSfx();
    },[]);

    return (
        <div>
            {isPlaying === 1 ? 
            (<div class="pauseBtn" onClick={stopSfx.bind(this)}></div>)
            : 
            (<div class="playBtn" onClick={playSfx.bind(this)}></div>)
            }
        </div>
    );
}

export default Player;