import { useState, useEffect } from "react";
import "./App.css";
const apiUrl = "https://dog.ceo/api/breed/pug/images";
import { getRandomIntegers } from "./functions.js";

function App() {
  const [currScore, setCurrScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [images, setImages] = useState([]);

  function resetImageOrder() {
    const numOfImages = images.length;
    const randomIndices = getRandomIntegers(numOfImages, numOfImages);
    const newImageArray = [];
    for (const i of randomIndices) {
      newImageArray.push(images[i]);
    }
    setImages(newImageArray);
  }

  function markAsClicked(key) {
    const image = images.filter((img) => img.key === key).pop();
    console.log(image);
    if (image.clicked) {
      window.alert("sorry, this image was already clicked");
      setCurrScore(0);
      images.forEach((img) => (img.clicked = false));
      return;
    }
    image.clicked = true;
    setCurrScore(currScore + 1);
    if (currScore + 1 > maxScore) {
      setMaxScore(maxScore + 1);
    }
  }

  useEffect(() => {
    const request = new Request(apiUrl);
    fetch(apiUrl, { mode: "cors" })
      .then((result) => result.json())
      .then((json) => {
        const imagesAux = [];
        const randomNumbers = getRandomIntegers(16, 100);
        let key = 0;
        for (const i of randomNumbers) {
          imagesAux.push({ key: key++, src: json.message[i], clicked: false });
        }
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
      <div>
        <p>
          current Score: {currScore}
          <br />
        </p>
        <p>
          {" "}
          Max Score: {maxScore} <br />
        </p>
      </div>
      <div className="images">
        {images.map((image) => (
          <img
            key={image.key}
            className="card"
            src={image.src}
            onClick={(e) => {
              resetImageOrder();
              markAsClicked(image.key);
            }}
          />
        ))}
      </div>
    </>
  );
}

export default App;
