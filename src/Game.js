import Navbar from "./Navbar";
import "./Styles/Game.css";
import { useState, useEffect } from "react";

//slike
import roundColor from "./Media/Round-color.png";
import roundBlanco from "./Media/Round-blanco.png";

const Game = () => {
  const initialTime = 30;
  let [userWords, setUserWords] = useState([]); //reci koje se prikazuju u polju
  let [userWord, setUserWord] = useState(""); //nova rec iz inputa
  let [timerValue, setTimerValue] = useState(initialTime); //vrednost tajmera
  let [timedOut, setTimedOut] = useState(false); //indikator isteka vremena
  let [wordCount, setWordCount] = useState(0); //broj unetih reci
  let [round, setRound] = useState(1); //redni broj runde
  let [gameOver, setGameOver] = useState(false); //indikator kraja igre

  //poeni po rundama
  let [score1, setScore1] = useState(0);
  let [score2, setScore2] = useState(0);
  let [score3, setScore3] = useState(0);

  //timer - smanjuje od 30 do 0 svake sekunde, a nakon toga se resetuje sto oznacava pocetak nove runde
  useEffect(() => {
    if (timerValue > 0) {
      const interval = setInterval(() => {
        setTimerValue((prevValue) => prevValue - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerValue]);

  //logika sta se to desi kada istekne vreme
  useEffect(() => {
    if (timerValue === 0) {
      setTimedOut(true);
      setTimeout(() => {
        setUserWords([]); //brise sve reci iz polja za unos nakon zavrsene runde

        //upisati poene po rundama za prikaz
        if (round === 1) {
          setScore1(wordCount);
        }
        if (round === 2) {
          setScore2(wordCount);
        }
        if (round === 3) {
          setScore3(wordCount);
          //zavrsava se igra kada se zavrsi runda 3
          setGameOver(true);
          return;
        }
        setWordCount(0); //reset brojaca za reci
        setRound((prevRound) => prevRound + 1); //prelazimo u novu rundu
        setTimerValue(initialTime); //reset tajmera
        setTimedOut(false); //indikator isteklog vremena se resetuje
      }, 5000);
    }
  }, [timerValue, round, wordCount]);

  //form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    //proverava da li su unete prazne reci
    if (userWord.trim() !== "") {
      setUserWords((prevWords) => [...prevWords, userWord]);
      setWordCount((prevWordCount) => prevWordCount + 1);
    }
    //reset polja za unos nakon svakog unosa
    setUserWord("");
  };

  return (
    <div className="game-main-wrapper">
      <Navbar username="Korisničko ime" route="/profile" />
      <div className="game-wrapper">
        <div className="input-side">
          <div className="words">
            {userWords.map((word, index) => {
              return <p key={index}> {word} </p>;
            })}
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="wordsinput"> Unesite reč </label>
            <input
              type="text"
              name="words"
              id="wordsinput"
              value={userWord}
              onChange={(e) => {
                setUserWord(e.target.value);
              }}
              disabled={timedOut} //onemogucen unos ako je isteklo vreme
            />
          </form>
        </div>
        <div className="stats-side">
          <div className="round">
            <img src={roundColor} alt="roundColor" />
            <img src={round > 1 ? roundColor : roundBlanco} alt="roundBlanco" />
            <img src={round > 2 ? roundColor : roundBlanco} alt="roundBlanco" />
          </div>
          <div className="timer">
            {!gameOver ? (
              timedOut ? (
                <h2> Vreme je isteklo </h2>
              ) : (
                <>
                  <h2>Vreme</h2>
                  <h2>{timerValue}</h2>
                </>
              )
            ) : (
              <h2> Igra je gotova </h2>
            )}
          </div>
          <div className="category">
            <h1>Kategorija</h1>
          </div>
          <div className="points">
            <h2> Poeni po rundama: </h2>
            <p> Runda 1 : {score1} </p>
            <p> Runda 2 : {score2} </p>
            <p> Runda 3 : {score3} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
