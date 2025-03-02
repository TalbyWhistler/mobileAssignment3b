import logo from './logo.svg';
import './App.css';
import { useState } from 'react';




function App() {
  return (
    <div className="App">
     
      {Counter()}
    </div>
  );
}

function Rectangle({propText}) {
  const style = {
      width: "75px",
      height: "100px",
      border: '2px solid black',
  

      
  };

  return (
      <div style={style}><p>{propText}</p></div>
  );
}

function Card({suit,value})
{
    //const [cardState,setCardState]  = useState({suit,value});
    let valueArray=['0','A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    let suitArray=['He','Di','Cl','Sp'];
    suit=suit;
    value=value;
    let key=suit+value;
    let propText= "" +valueArray[value] + " " + suitArray[suit];
    return(
        <div> 
        <Rectangle propText={propText}/>
        </div>
    );
}


function Counter() {
  const [count, setCount] = useState(0);

  function incrementCount() {
      setCount(count + 1);
  }

  return (
      <button onClick={incrementCount}>Count: {count}</button>
  );
}

export default App;
