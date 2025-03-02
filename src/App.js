import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
  return (
    <div className="App">
     
      {Counter()}
      {GenerateButton()}
      <div>
          {CardGridB(deckCards,12)}
      </div>
    </div>
  );
}


let deckCards = [];
let displayCards = [];
for (let i=0;i<4;i++)
{
    for (let j=1;j<=13;j++)
    {
        deckCards.push(<Card suit={i} value={j} key={`${i}-${j}`}/>);
    }
}

function moveDeckCardsToDisplayed(deckCards,displayCards)
{
    displayCards.push(deckCards.pop());
}

function moveDisplayCardsToDeckCards(deckCards,displayCards)
{
    deckCards.push(displayCards.pop());
}


function CardGrid(deckCards)
{
    let rows = [];
    let columns = [];
    let cardCounter = 0;
    while ( cardCounter <= 52)
    {
      for (let h=0;h<=6;h++)
      {
        for (let i=0;i<=10;i++)
          {
              let selectedCard=deckCards[cardCounter];
              columns.push(<div className="col">{selectedCard}</div>)
              cardCounter++;   
          }
          rows.push(<div className="row">{columns}</div>);
          columns = [];
      }
        
    }
    return <div>{rows}</div>
}

function CardGridB(deckCards,onTheTable)
{
    console.log("On the table is " + onTheTable);
    const [displayed,setDisplay] = useState(onTheTable);
    let rows = [];
    let columns = [];
    let cardCounter = 0;

    function incrementCardGrid()
    {
        setDisplay(displayed+1);
    }

    function dealFive()
    {
        setDisplay(5);
    }

    function dealSeven()
    {
        setDisplay(7);
    }
    
    while ( cardCounter <= displayed && cardCounter <= 52)
    {
      for (let h=0;h<=6;h++)
      {
        for (let i=0;i<=10;i++)
          {
            if ( cardCounter < displayed )
            {
              let selectedCard=deckCards[cardCounter];
              columns.push(<div className="col">{selectedCard}</div>)
              cardCounter++;   
            }
            else
            {
              cardCounter++;
            }            
          }
          rows.push(<div className="row">{columns}</div>);
          columns = [];
      }
        
    }
    return( 
    <div>
        <button onClick={dealSeven}>Deal 7</button>
        <button onClick={dealFive}>Deal 5</button>
        <button onClick={incrementCardGrid}>Test Increment Card Grid</button>
        {rows}
    </div>);
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


function test0()
{
    return <p>Testo</p>
}

function GenerateButton()
{
    
    return(
      <button onClick={moveDisplayCardsToDeckCards(deckCards,displayCards)}>moveDisplayCardsToDeckCards()</button>
    );
}

export default App;
