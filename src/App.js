import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
  return (
    <div className="App">
     
      {Counter()}
      <div>
          {CardGridB(deckCards,0)}
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

function resetDeckOfCards()
{
  deckCards = [];
  for (let i=0;i<4;i++)
    {
        for (let j=1;j<=13;j++)
        {
            deckCards.push(<Card suit={i} value={j} key={`${i}-${j}`}/>);
        }
    }
    return deckCards;
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

shuffle(deckCards);
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
        reset();
        setDisplay(5);
    }

    function dealSeven()
    {
        reset();
        setDisplay(7);
    }

    function reset()
    {
        deckCards = resetDeckOfCards(deckCards);
        shuffle(deckCards);
        setDisplay(0);
    }
    
    
  

    while ( cardCounter < displayed && cardCounter <= 52)
    {
      for (let h=0;h<=6;h++)
      {
        for (let i=0;i<=10;i++)
          {
            if (cardCounter>=displayed)
            {
              cardCounter++;
              columns.push(<div className="col"></div>)
              continue;
            }
            else
            {
              let selectedCard=deckCards[cardCounter];
              columns.push(<div className="col">{selectedCard}</div>)
              cardCounter++; 
            }
                
                   
          }
          
          rows.push(<div className="row">{columns}</div>);
          columns = [];
      }
        
    }
    return( 
    <div>

                  <div className="btn" onClick={incrementCardGrid}>Test Increment Card Grid</div>
  
        <div className="btn border border-black" onClick={reset}>Reset</div>
        <div className="btn border border-black" onClick={dealFive}>Deal 5</div>
        <div className="btn border border-black" onClick={dealSeven}>Deal 7</div>
 
       
        {rows}
    </div>);
}

function shuffle(deck) {
  let currentIndex = deck.length;


  while (currentIndex != 0) {


    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [deck[currentIndex], deck[randomIndex]] = [
      deck[randomIndex], deck[currentIndex]];
  }
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

function RectangleB({outputElement})
{
  const style = {
    width: "75px",
    height: "100px",
    border: '2px solid black',


    
};

return (
    <div style={style}>{outputElement}</div>
);
}

function Card({suit,value})
{
    //const [cardState,setCardState]  = useState({suit,value});
    let valueArray=['0','A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    let suitArray=['He','Di','Cl','Sp'];
    const heart = 'https://th.bing.com/th/id/R.c52a6ca4b798e80a5519571bbab7ae41?rik=QwwUbT1WLr9JGQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fheart-png-heart-png-image-free-download-2555.png&ehk=53syolBvFrxc8w886vqld%2fCfQwOE00Wy31ZGWcAIqVc%3d&risl=&pid=ImgRaw&r=0';
    const diamond = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/diamond-deck-of-cards-custom-home-fashions.jpg';
    const club = 'https://i.etsystatic.com/27498402/r/il/db473b/2955754533/il_1080xN.2955754533_dhwx.jpg';
    const spade = 'https://th.bing.com/th/id/R.5c3146c279d73aab243821025e0b95a3?rik=7mfvenQk2mGN8A&pid=ImgRaw&r=0';
    let suitImageArray=[heart,diamond,club,spade];
    suit=suit;
    value=value;
    let key=suit+value;
    let propText= "" +valueArray[value] + " " + suitArray[suit] + <img src={suitImageArray[suit]}></img>;
    return(
        <div> 
       
          <RectangleB outputElement=<p>{valueArray[value]} <img  height="30px" src={suitImageArray[suit]} ></img> </p> />
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
