import './App.css'
import { useState, useEffect, useRef } from 'react';
import { characterMap } from './components/onepiece.jsx';
import { fetchCatData } from './components/cat.jsx';

export const App = () => {
  /// --- General state -------------------------------------------------------------------------------------------------------
  const [bestScore, setBestScore] = useState(() => {
    let savedBestScore = localStorage.getItem("memoryCard");
    return savedBestScore ? Number(savedBestScore) : 0;
  });
  const [currentScore, setCurrentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [catArr, setCatArr] = useState();
  const [currentTheme, setCurrentTheme] = useState('One Piece');
  const [copyArr, setCopyArr] = useState([...characterMap]);
  const themeData = {
    'One Piece': characterMap,
    'Cat': catArr || []
  };
  const arrlength = copyArr.length;
  const ref = useRef(currentTheme);
  
  /// --- useEffect -------------------------------------------------------------------------------------------------------
  useEffect(() => {
    ref.current = currentTheme
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem("memoryCard", bestScore);
  }, [bestScore]);

  useEffect(() => {
    const openCatPromise = async () => {
      try {
        const result = await fetchCatData();
        setCatArr(result);
        if (ref.current === 'Cat') {
          setCopyArr(result);
        }
      } catch (error) {
        console.error('Failed to call the function :', error);
      }
    };
    openCatPromise();
  },[]);

  /// --- General function -------------------------------------------------------------------------------------------------------
  const handleClick = (obj) => {
    const foundId = selectedId.includes(obj.id);
    const nextScore = currentScore + 1;
    const nextLengthSelectedId = selectedId.length + 1;
    const arr = themeData[currentTheme];
    
    if (!foundId) {
      setSelectedId([...selectedId, obj.id]);
      setCurrentScore(s => s + 1);
      if (nextScore > bestScore) {
        setBestScore(nextScore);
      }
      if (nextLengthSelectedId === arrlength) {
        setWin(true);
      }
      setCopyArr(handleShuffle([...arr]));
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

  const handleRestart = () => {
    const arr = themeData[currentTheme];
    setGameOver(false);
    setCurrentScore(0);
    setCopyArr([...arr]);
    setSelectedId([]);
  };

  const handleResetBestScore = () => {
    localStorage.removeItem("memoryCard");
    setBestScore(0);
  };

  const handleChooseTheme = (themeName) => {
    if (themeName === "One Piece") {
      setCurrentTheme('One Piece');
      setCopyArr([...characterMap]);
    } else if (themeName === "Cat") {
      setCurrentTheme('Cat');
      setCopyArr(catArr || []);
    }
    setCurrentScore(0);
    setGameOver(false);
    setWin(false);
    setSelectedId([]);
  };

  const handlePlayAgain = () => {
    setWin(false);
    setCurrentScore(0);
    setSelectedId([]);
    if (currentTheme === 'One Piece') {
      setCopyArr(handleShuffle([...characterMap]));
    } else if (currentTheme === 'Cat') {
      setCopyArr(handleShuffle([...(catArr || [])]));
    }
    

  };
  
  return (
    <div className={currentTheme === 'One Piece' ? 'main-container-op' : 'main-container-cat'}>
      <div className="score-container">
        <div className="current-score-container">
          <p className='current-score'>{currentScore}</p>
        </div>
        <p className='main-title'>Memory Game</p>
        <div className='best-score-container'>
          <p className='best-score'>{bestScore}</p>
          <button className='reset-best-score' onClick={handleResetBestScore} aria-label="Reset best score"></button>
        </div>
      </div>
      <div className="theme-button">
        <button className='one-piece-button' data-value="One Piece" onClick={() => handleChooseTheme('One Piece')} aria-label="Select One Piece theme"></button>
        <button className='cat-button' data-value="Cat" onClick={() => handleChooseTheme('Cat')} aria-label="Select Cat theme"></button>
      </div>
      <div className='button-wrapper'>
        {copyArr.map(obj => {
        return <button key={obj.id} className='card-button' onClick={() => handleClick(obj)} disabled={gameOver || win}><img  src={obj.url}></img><span className='object-name'>{obj.name}</span></button>
      })}
      </div>
      {gameOver ? (
        <div className="game-over-UI">
          <div className='game-over'>
            <span className='final-current-score'>{currentScore}</span>
            <span className='final-best-score'>{bestScore}</span>
            <button className='try-again' onClick={handleRestart} aria-label="Try again"></button>
          </div>
        </div>
      ) : null}
      {win ? (
        <div className='win-UI'>
          <div className='win'>
            <button className='play-again' onClick={handlePlayAgain} aria-label="Play again"></button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
