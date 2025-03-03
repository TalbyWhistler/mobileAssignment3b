/**
 * "I Stephen Tatone 000748591 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
 */


import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// the background image turned out to be more intrusive and ugly than I imagined
const backGroundImageSrc = 'https://thumbs.dreamstime.com/b/card-table-background-6787920.jpg';


// an optional styling component for the main div
const divStyle = {
  backgroundImage: `url(${backGroundImageSrc})`,
  backgroundSize: 'cover',
  height: "100%",

  
}
/**
 * The main rendering app 
 * @returns the main component to be rendered to the page
 */
function App() {
  return (
    <div className="App" >
     
     
      <div >
          <h1 className="text-center">A Card Game</h1>
          {CardGridB(deckCards,0)}
        
      </div>
    </div>
  );
}

// two arrays, one for the generic deck of cards and one for the cards displaying fact up
let deckCards = [];
let displayCards = [];

// an initializing loop for the deckCards array getting a full deck together
for (let i=0;i<4;i++)
{
    for (let j=1;j<=13;j++)
    {
        deckCards.push(<Card suit={i} value={j} key={`${i}-${j}`}/>);
    }
}

/**
 * 
 * @returns A void function that regenerates deckCards
 */
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


/**
 * Moves deck cards to display cards
 * @param {deckOf cards array} deckCards 
 * @param {the deck of cards on display} displayCards 
 */
function moveDeckCardsToDisplayed(deckCards,displayCards)
{
    displayCards.push(deckCards.pop());
}

/**
 * A function to move display cards back to the deck
 * @param {card deck array} deckCards 
 * @param {display deck array} displayCards 
 */
function moveDisplayCardsToDeckCards(deckCards,displayCards)
{
    deckCards.push(displayCards.pop());
}

/**
 * A depreciated function for generating the card grid
 * @param {card deck} deckCards 
 * @returns 
 */
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
// initial shuffle of the card
shuffle(deckCards);

/**
 * The working model of the function that takes the deck of cards and turns it into the card grid on display
 * @param {deck of cards} deckCards 
 * @param {the number of cards on the table} onTheTable 
 * @returns 
 */
function CardGridB(deckCards,onTheTable)
{

    
    console.log("On the table is " + onTheTable);
    const [displayed,setDisplay] = useState(onTheTable);
    let rows = [];
    let columns = [];
    let cardCounter = 0;
    /**
     * A function to increment the number of cards that can be seen on the table
     */
    function incrementCardGrid()
    {
        setDisplay(displayed+1);
      //  moveDeckCardsToDisplayed(deckCards,displayCards);
    }

    /**
     * A function to deal five cards out to the table
     */
    function dealFive()
    {
        reset();
       
        setDisplay(5);
    }

    /**
     * A function to deal seven cards out to the table
     */

    function dealSeven()
    {
        reset();
        setDisplay(7);
    }

    /**
     * A function to reset the card deck
     */
    function reset()
    {
        deckCards = resetDeckOfCards(deckCards);
        shuffle(deckCards);
        setDisplay(0);
    }
    
    /**
     * A function that is attempting to get rid of the selected card on the table, this doesn't work yet
     */
    function popValues()
    {
      console.log("POP values looking for " + selectedSuit + " value " + selectedValue);
        for (let i=0;i<deckCards.length-1;i++)
        {
            if (deckCards[i].suit==selectedSuit && deckCards[i].value == selectedValue )
            {
               deckCards.pop(i);
               console.log("poppeed");
               CardGridB(deckCards,onTheTable);
            }
        }
    }
    
    function wildCard() {
       let randSuit = Math.floor(Math.random()*3);
       let randValue = Math.floor(Math.random()*12)+1;
       deckCards.push(<Card suit={randSuit} value={randValue} />)
       setDisplay(displayed+1);
    }

    
  // assemble the card grid

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

          // push the row and reset the column array
          
          rows.push(<div className="row">{columns}</div>);
          columns = [];
      }
        
    }

    // return the card grid with the function buttons
    return( 
    <div>

                  <div className="btn" onClick={incrementCardGrid}>
                    <img height="250px" width="105px" src="https://images.squarespace-cdn.com/content/v1/56ba85d9cf80a17a6f304b72/17021f49-d2e2-449f-a7c4-5d0ce8e08b7b/Card-Back.jpg"></img>
                  </div>
  
        <div className="btn border border-black bg-primary text-white" onClick={reset}>Reset</div>
        <div className="btn border border-black bg-primary text-white" onClick={dealFive}>Deal 5</div>
        <div className="btn border border-black bg-primary text-white" onClick={dealSeven}>Deal 7</div>
        <div className="btn border border-black bg-primary text-white" onClick={popValues}>Toss</div>
        <div className="btn border border-black bg-primary text-white" onClick={wildCard}>Wild Card</div>

 
       
        {rows}
    </div>);
}


//a function to an array  
function shuffle(deck) {
  let currentIndex = deck.length;


  while (currentIndex != 0) {


    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [deck[currentIndex], deck[randomIndex]] = [
      deck[randomIndex], deck[currentIndex]];
  }
}

/**
 *  This is depreciated 
 * @param {property text } param0 
 * @returns 
 */
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

/**
 * A function that's supposed to return the deck of cards index that matches the suit and value
 * @param {card value} value 
 * @param {card suit} suit 
 * @returns 
 */
function getCardIndex(value,suit)
{
    let counter=0;
    for (let i=0;i<deckCards.length-1;i++)
    {
        if (deckCards[i].value == value)
        {
            if (deckCards[i].suit == suit)
            {
              return i;
            }
        }
        counter++;
    }
    return -1;
}

// a number of variables to attempt to swap selected cards
let numberOfSelected = 0;
let selectedValue = 0;
let selectedSuit = 0;
let targetSuit =0;
let targetValue = 0;

/**
 * The functional rectangle array, it takes the suit and value from the Card and produces a styled rectangle that shows the card stuff
 * @param {Takes the suit and value} param0 
 * @returns 
 */
function RectangleB({suit,value})
{

  let valueArray=['0','A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    let suitArray=['He','Di','Cl','Sp'];
    const heart = 'https://th.bing.com/th/id/R.c52a6ca4b798e80a5519571bbab7ae41?rik=QwwUbT1WLr9JGQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fheart-png-heart-png-image-free-download-2555.png&ehk=53syolBvFrxc8w886vqld%2fCfQwOE00Wy31ZGWcAIqVc%3d&risl=&pid=ImgRaw&r=0';
    const diamond = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/diamond-deck-of-cards-custom-home-fashions.jpg';
    const club = 'https://i.etsystatic.com/27498402/r/il/db473b/2955754533/il_1080xN.2955754533_dhwx.jpg';
    const spade = 'https://th.bing.com/th/id/R.5c3146c279d73aab243821025e0b95a3?rik=7mfvenQk2mGN8A&pid=ImgRaw&r=0';
    let suitImageArray=[heart,diamond,club,spade];
    suit=suit;
    value=value;
  

  const [selected,setSelect] = useState(false);
  suit = suit;
  value = value;


  /**
   * This function handles the card clicks, select works but swap doesn't
   * @param {Event} e 
   */
  function handleClick(e)
  {
      console.log(e.target)
      if (!selected && numberOfSelected == 0)
      {
        setSelect(true);
        console.log("Selected suit and value is " + suit + " and " + value);
        numberOfSelected++;
        selectedValue=value;
        selectedSuit=suit;
       
      }
    
      else if (selected && numberOfSelected == 1)
      {
        setSelect(false);
        numberOfSelected--;
       
      }
      else if (!selected && numberOfSelected == 1)
      {
         setSelect(false);
         console.log("Target select suit and value is " + suit + " and " + value);
        targetSuit = suit;
        targetValue = value;
        
      }
  }

    const style = {
      width: "75px",
      height: "100px",
      border: [selected ?'5px solid green': '2px solid black'],
  }

  let outputElement = <p>{valueArray[value]} <img height="30px" src={suitImageArray[suit]}></img></p>;

return (
    <div onClick={handleClick} style={style}>{outputElement}</div>
);
}
/**
 * This is  the main card function that generates a rectangle and passes the suit and value to it
 * @param {suit and value} param0 
 * @returns 
 */
function Card({suit,value})
{
    //const [cardState,setCardState]  = useState({suit,value});
    
    suit=suit;
    value=value;
    let isSelected=false;

    let key=suit+value;
    let divStyle;
    if (isSelected)
        divStyle = {color:'green'};
    else
        divStyle = {color:'black'};

    //let propText= "" +valueArray[value] + " " + suitArray[suit] + <img src={suitImageArray[suit]}></img>;
    return(
        <div style={divStyle}> 
       
          <RectangleB value={value} suit={suit}  />
        </div>
    );
}

/**
 * A test function that ensures that useState is still accessable
 * @returns 
 */
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
