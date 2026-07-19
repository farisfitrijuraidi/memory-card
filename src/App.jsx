import './App.css'
import { useState, useEffect } from 'react';

export const TestLinter = () => {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(2);

//   useEffect(() => {
//     // We are using the multiplier variable inside here
//     const result = count * multiplier;
//     console.log(result);
//   }, [count, multiplier]); // Look here: multiplier is completely missing!

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}
