import './App.css'
import { useState, useEffect } from 'react';
import { characterMap } from './Components/onepiece.jsx';

export const App = () => {
  const [bestScore, setBestScore] = useState(() => {
    let savedBestScore = localStorage.getItem("memoryCard");
    return savedBestScore ? Number(savedBestScore) : 0;
  });
  const [currentScore, setCurrentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [copyArr, setCopyArr] = useState([...characterMap]);
  
  useEffect(() => {
    localStorage.setItem("memoryCard", bestScore);
  }, [bestScore]);

  const handleClick = (obj) => {
    const foundId = selectedId.includes(obj.id);
    const nextScore = currentScore + 1;
    if (!foundId) {
      setSelectedId([...selectedId, obj.id]);
      setCurrentScore(s => s + 1);
      setCopyArr(handleShuffle([...characterMap]));
      if (nextScore > bestScore) {
        setBestScore(nextScore);
      }
    } else {
      setGameOver(true);
    }
  };

  const handleShuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const handleReset = () => {
    setGameOver(false);
    setCurrentScore(0);
    setCopyArr([...characterMap]);
    setSelectedId([]);
  };

  const handleResetBestScore = () => {
    localStorage.removeItem("memoryCard");
    setBestScore(0);
  };
  // useEffect(() => {
  //   const fetchOnePieceCharacter = async () => {
  //     const url = `https://api.jikan.moe/v4/characters/40/pictures`;
  //     try {
  //       const response = await fetch(url);
  //       if (!response.ok) {
  //         throw new Error('The server rejected our request');
  //       }
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error('Failed to fetch One Piece Character :', error);
  //     }
  //   }
  //   fetchOnePieceCharacter();
  // }, [])

  return (
    <>
      <p>Best Score: {bestScore}</p>
      <p>Current Score: {currentScore}</p>
      <button onClick={handleResetBestScore}>Reset Best Score</button>
      {copyArr.map(obj => {
        return <button key={obj.id} onClick={() => handleClick(obj)} disabled={gameOver}><img  src={obj.image}></img></button>
      })}
      {gameOver ? (
        <div>
          <p>Game Over!</p>
          <button type="button" onClick={handleReset}>Try Again?</button>
        </div>
      ) : null}
    </>
  );
}
