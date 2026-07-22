import './App.css'
import { useState, useEffect } from 'react';
import { characterMap } from './Components/onepiece.jsx';
import { fetchCatData } from './Components/cat.jsx';

export const App = () => {
  /// --- General state -------------------------------------------------------------------------------------------------------
  const [bestScore, setBestScore] = useState(() => {
    let savedBestScore = localStorage.getItem("memoryCard");
    return savedBestScore ? Number(savedBestScore) : 0;
  });
  const [currentScore, setCurrentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [catArr, setCatArr] = useState();
  const [theme, setTheme] = useState([{
    option: 'One Piece',
    selected: true 
  }, {
    option: 'Cat',
    selected: false
  }]);
  const [copyArr, setCopyArr] = useState([...characterMap]);
  const foundTheme = theme.find(({selected}) => selected === true).option;
  const themeData = {
    'One Piece': characterMap,
    'Cat': catArr || []
  };
  
  /// --- useEffect -------------------------------------------------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem("memoryCard", bestScore);
  }, [bestScore]);

  useEffect(() => {
    const openCatPromise = async () => {
      try {
        const result = await fetchCatData();
        setCatArr(result);
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
    const arr = themeData[foundTheme];
    if (!foundId) {
      setSelectedId([...selectedId, obj.id]);
      setCurrentScore(s => s + 1);
      if (nextScore > bestScore) {
        setBestScore(nextScore);
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
    const arr = themeData[foundTheme];
    setGameOver(false);
    setCurrentScore(0);
    setCopyArr([...arr]);
    setSelectedId([]);
  };

  const handleResetBestScore = () => {
    localStorage.removeItem("memoryCard");
    setBestScore(0);
  };

  const handleChooseTheme = (e) => {
    setTheme(p => p.map(item => {
      if (e.target.dataset.value === item.option) {
        return {...item, selected: true};
      }
      return {...item, selected: false};
    }));
    if (e.target.dataset.value === "One Piece") {
      setCopyArr([...characterMap]);
    } else if (e.target.dataset.value === "Cat") {
      setCopyArr(catArr);
    }
    setCurrentScore(0);
    setGameOver(false);
  };
  
  return (
    <div className={foundTheme === 'One Piece' ? 'main-container-op' : 'main-container-cat'}>
      <div className="score-container">
        <div className="current-score-container">
          <p className='current-score'>{currentScore}</p>
        </div>
        <p className='main-title'>Memory Game</p>
        <div className='best-score-container'>
          <p className='best-score'>{bestScore}</p>
          <div className='reset-best-score' onClick={handleResetBestScore}></div>
        </div>
      </div>
      <div className="theme-button">
        <div className='one-piece-button' data-value="One Piece" onClick={handleChooseTheme}></div>
        <div className='cat-button' data-value="Cat" onClick={handleChooseTheme}></div>
      </div>
      <div className='button-wrapper'>
        {copyArr.map(obj => {
        return <button key={obj.id} onClick={() => handleClick(obj)} disabled={gameOver}><img  src={obj.url}></img><span className='object-name'>{obj.name}</span></button>
      })}
      </div>
      {gameOver ? (
        <div className="game-over-UI">
          <div className='game-over'>
            <span className='final-current-score'>{currentScore}</span>
            <span className='final-best-score'>{bestScore}</span>
            <div className='try-again' onClick={handleRestart}></div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
