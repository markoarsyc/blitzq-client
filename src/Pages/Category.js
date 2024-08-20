import React, { useEffect, useState } from "react";
import "../Styles/Category.css";
import Navbar from "../Navbar";
import { useSocket } from "../Contexts/SocketContext";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const socket = useSocket();
  const [terms, setTerms] = useState([]);
  const [term, setTerm] = useState("");
  const [points, setPoints] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [statusFlag, setStatusFlag] = useState(false);

  const navigate = useNavigate();

  const submitTerm = (e) => {
    e.preventDefault();
    const termObject = {
      term: term.toUpperCase(),
      points: parseInt(points, 10),
    };
    setTerms((prevTerms) => [...prevTerms, termObject]);
    setTerm("");
    setPoints("");
  };

  const sendCategory = () => {
    socket.emit("add-category", {
      title: categoryTitle,
      terms: terms,
    });
  };

  useEffect(() => {
    socket.on("add-category-status", (status) => {
      if (status) {
        setStatusFlag(true);
        setTimeout(() => {
          navigate("/homepage");
        }, 3000);
      } else {
        setStatusFlag(false);
      }
    });
  }, [socket, statusFlag, navigate]);

  return (
    <div className="category-main-wrapper">
      <Navbar />
      <div className="category-wrapper">
        <form
          className="category-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="Kategorija"
            id="category-title"
            value={categoryTitle}
            onChange={(e) => setCategoryTitle(e.target.value)}
          />
        </form>
        <form className="term-form" onSubmit={submitTerm}>
          <input
            type="text"
            placeholder="Pojam"
            value={term}
            name="term"
            onChange={(e) => setTerm(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Poeni"
            value={points}
            name="points"
            onChange={(e) => setPoints(e.target.value)}
            required
          />
          <button type="submit">Unesi pojam</button>
        </form>
        {statusFlag === false ? (
          <div className="category-user-input-table">
            <h2>{categoryTitle}</h2>
            <div className="terms">
              {terms.map((t, index) => (
                <p key={index}>
                  {index + 1}. {t.term} ({t.points}p)
                </p>
              ))}
            </div>
            {terms.length === 0 || (
              <button id="main-submit" onClick={sendCategory}>
                {" "}
                Unesi kategoriju{" "}
              </button>
            )}
          </div>
        ) : (
          <h1> Uspešno ste uneli kategoriju </h1>
        )}
      </div>
    </div>
  );
};

export default Category;
