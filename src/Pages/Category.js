// import React, { useState } from "react";
// import "../Styles/Category.css";
// import Navbar from "../Navbar";

// const Category = () => {
//   const [terms, setTerms] = useState([]);
//   const [term, setTerm] = useState("");
//   const [points, setPoints] = useState("");

//   const submitTerm = (e)=> {
//     e.preventDefault();
//     const termObject = {term:term, points:points};
//     setTerms((prevTerms)=>[...prevTerms,termObject]);
//   }

//   const submitCategory = (e)=> {
//     e.preventDefault();
//   }

//   return (
//     <div className="category-main-wrapper">
//       <Navbar route="/profile" />
//       <div className="category-wrapper">
//         <form className="category-form" onSubmit={submitCategory}>
//           <input type="text" placeholder="Kategorija" id="category-title" />
//           <form className="term-form" onSubmit={submitTerm}>
//             <input
//               type="text"
//               placeholder="Pojam"
//               value={term}
//               name="term"
//               onChange={(e) => {
//                 setTerm(e.target.value);
//               }}
//             />
//             <input
//               type="text"
//               placeholder="Poeni"
//               value={points}
//               name="points"
//               onChange={(e) => {
//                 setPoints(parseInt(e.target.value));
//               }}
//             />
//             <button type="submit">Unesi pojam</button>
//           </form>
//           <button type="submit">Unesi kategoriju</button>
//         </form>
//         <div className="terms">
//             {terms.map((t)=>{
//                 return <p>Pojam: {t.term}, poeni {t.points}</p>
//             })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Category;
import React, { useState } from "react";
import "../Styles/Category.css";
import Navbar from "../Navbar";

const Category = () => {
  const [terms, setTerms] = useState([]);
  const [term, setTerm] = useState("");
  const [points, setPoints] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");

  const submitTerm = (e) => {
    e.preventDefault();
    const termObject = { term, points: parseInt(points, 10) };
    setTerms((prevTerms) => [...prevTerms, termObject]);
    // Clear term and points fields after adding term
    setTerm("");
    setPoints("");
  };

  const submitCategory = (e) => {
    e.preventDefault();
    // Add logic to handle category submission here
    console.log("Category submitted:", categoryTitle);
  };

  return (
    <div className="category-main-wrapper">
      <Navbar route="/profile" />
      <div className="category-wrapper">
        <form className="category-form" onSubmit={submitCategory}>
          <input
            type="text"
            placeholder="Kategorija"
            id="category-title"
            value={categoryTitle}
            onChange={(e) => setCategoryTitle(e.target.value)}
          />
          <button type="submit">Unesi kategoriju</button>
        </form>
        <form className="term-form" onSubmit={submitTerm}>
          <input
            type="text"
            placeholder="Pojam"
            value={term}
            name="term"
            onChange={(e) => setTerm(e.target.value)}
          />
          <input
            type="number"
            placeholder="Poeni"
            value={points}
            name="points"
            onChange={(e) => setPoints(e.target.value)}
          />
          <button type="submit">Unesi pojam</button>
        </form>
        <div className="terms">
          {terms.map((t, index) => (
            <p key={index}>Pojam: {t.term}, poeni: {t.points}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;

