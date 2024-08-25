import Navbar from "../Navbar";
import "../Styles/Game.css";
import { useState, useEffect, useContext } from "react";
import { useSocket } from "../Contexts/SocketContext";
import { useNavigate } from "react-router-dom";

//slike i muzika
import roundColor from "../Media/Round-color.png";
import roundBlanco from "../Media/Round-blanco.png";
import { LoginContext } from "../Contexts/LoginContext";
import GameSong from "../Audio/GameSong";


const Game = () => {
  const initialTime = 30;
  const [userWords, setUserWords] = useState([]); //reci koje se prikazuju u polju
  const [userWord, setUserWord] = useState(""); //nova rec iz inputa
  const [timerValue, setTimerValue] = useState(initialTime); //vrednost tajmera
  const [timedOut, setTimedOut] = useState(false); //indikator isteka vremena
  const [wordCount, setWordCount] = useState(0); //broj unetih reci
  const [round, setRound] = useState(1); //redni broj runde
  const [gameOver, setGameOver] = useState(false); //indikator kraja igre
  const [categories, setCategories] = useState([]); //ucitane kategorije iz baze
  const [roundCategory, setRoundCategory] = useState("Kategorija");

  const socket = useSocket();
  const {loggedInPlayer} = useContext(LoginContext);
  const navigate = useNavigate();

  //poeni po rundama
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);


  //funkcija za proveru da li uneta rec postoji u okviru neke kategorije
  const isLegit = (word, category) => {
    // Preveravamo da li je `category` definisana i da li sadrži `terms`
    if (!category || !category.terms) {
      return false;
    }

    // Konvertujemo unos i termine u mala slova radi upoređivanja
    const upperCaseWord = word.toUpperCase();

    // Prolazimo kroz termine i proveravamo da li se unesena reč poklapa sa nekim od termina
    for (let t of category.terms) {
      if (upperCaseWord === t.term.toUpperCase()) {
        return true; // Reč je validna
      }
    }

    return false; // Reč nije pronađena u kategoriji
  };

  //pronadji koliko rec nosi poena
  const getPoints = (word, category) => {
    // Preveravamo da li je `category` definisana i da li sadrži `terms`
    if (!category || !category.terms) {
      return false;
    }

    // Konvertujemo unos i termine u mala slova radi upoređivanja
    const upperCaseWord = word.toUpperCase();

    // Prolazimo kroz termine i proveravamo da li se unesena reč poklapa sa nekim od termina
    for (let t of category.terms) {
      if (upperCaseWord === t.term.toUpperCase()) {
        return t.points; // Reč je validna i ima odredjen broj poena
      }
    }

    return 0;
  };

  //proveri da li je rec vec prethodno unesena
  const isAlreadyConfirmed = (word, wordsArray) => {
    const upperCaseWord = word.toUpperCase();
    for (let w of wordsArray) {
      if (upperCaseWord === w.toUpperCase()) {
        return true;
      }
    }

    return false;
  };

  //timer - smanjuje od 30 do 0 svake sekunde, a nakon toga se resetuje sto oznacava pocetak nove runde
  useEffect(() => {
    if (categories) {
      if (timerValue > 0) {
        const interval = setInterval(() => {
          setTimerValue((prevValue) => prevValue - 1);
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [timerValue,categories]);

  //logika sta se to desi kada istekne vreme
  useEffect(() => {
    setRoundCategory(categories[round - 1]?.title);
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
    if (gameOver) {
      socket.emit("game-over",{
        player: loggedInPlayer.username,
        scores: [score1,score2,score3]
      })
      setTimeout(()=>{
        navigate("/score");
      },3000)
    }
  }, [timerValue, round, wordCount, categories,navigate,gameOver,socket,score1,score2,score3,loggedInPlayer]);

  useEffect(() => {
    socket.emit("game-started");
    socket.on("game-started", (game) => {
      setCategories(game.categories);
    });
  }, [socket]);

  //form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    //proverava da li su unete prazne reci
    if (userWord.trim() !== "") {
      if (isLegit(userWord, categories[round - 1])) {
        if (!isAlreadyConfirmed(userWord, userWords)) {
          setUserWords((prevWords) => [...prevWords, userWord]);
          setWordCount(
            (prevWordCount) =>
              prevWordCount + getPoints(userWord, categories[round - 1])
          );
        }
      }
    }
    //reset polja za unos nakon svakog unosa
    setUserWord("");
  };

  return (
    <div className="game-main-wrapper">
      <GameSong />
      <Navbar />
      <div className="game-wrapper">
        <div className="input-side">
          <div className="words">
            {userWords.map((word, index) => {
              return (
                <p key={index}>
                  {" "}
                  {word} ({getPoints(word, categories[round - 1])}p){" "}
                </p>
              );
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
            <h1>{roundCategory}</h1>
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
