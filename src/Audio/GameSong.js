import React from 'react'
import gameSong from "../Media/game-song.mp3"

const GameSong = () => {
  return (
    <audio src={gameSong} autoPlay loop>
      Your browser does not support the audio element.
    </audio>
  )
}

export default GameSong;