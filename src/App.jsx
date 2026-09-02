import { useState, useEffect } from "react";
import "./App.css";
const apiUrl = "https://dog.ceo/api/breed/pug/images";
import { getRandomIntegers } from "./functions.js";

function App() {
  const [currScore, setCurrScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const request = new Request(apiUrl);
    fetch(apiUrl, { mode: "cors" })
      .then((result) => result.json())
      .then((json) => {
        const imagesAux = [];
        const randomNumbers = getRandomIntegers(16, 100);
        for (const i of randomNumbers) {
          imagesAux.push({ key: i, src: json.message[i], clicked: false });
        }
        console.log(imagesAux);
        setImages(imagesAux);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <header>
        <h1>Memory Card</h1>
      </header>
      <hr />
      <div className="instructions">
        <h2> Instructions </h2>
        <p> Click all the pictures, without clicking any twice.</p>
      </div>
      <div className="images">
        {images.map((image) => (
          <img key={image.key} className="card" src={image.src} />
        ))}
      </div>
    </>
  );
}

export default App;
