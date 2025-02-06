import React, { useEffect, useRef, useState } from 'react'
// import CarousalCard from './CarousalCard'



export default function Caraousal() {

    const cardRef =  useRef(null)
    const cardWrapRef =  useRef(null)


    const [move, setMove] = useState(0);
    const [isRightMove, setIsRightMove] = useState(null);

    setInterval(()=>{
        leftButton()
    }, 3000);



    function leftButton(){
        const cardWrap = cardWrapRef.current;
        setIsRightMove(false)

        
        setMove(prev => prev + cardWrap.getBoundingClientRect().width/5)
        
        // cardWrap.style.position = "relative"; // or "relative", "fixed", etc.
        // cardWrap.style.left = `-${move}px`;
    }

    



    function rightButton(){
        setIsRightMove(true)
        
        const cardWrap = cardWrapRef.current;
        setMove(prev => prev - cardWrap.getBoundingClientRect().width/5);
        cardWrap.style.position = "relative"; // or "relative", "fixed", etc.
        console.log(move);
        
        // cardWrap.style.left = `-${move}px`;
    }


    

    // Apply movement when `move` state updates
    useEffect(() => {
    if (cardWrapRef.current) {
        cardWrapRef.current.style.transform = `translateX(${-move}px)`;
    }
    }, [move]);


  return (
    <>
        <div className='cards-container' >
            <div className="card-wrap " ref={cardWrapRef}>
                { Array.from({ length: 5 }).map((_,index)=> <div className='card' key={index} ref={cardRef} > <h2>Title {index}</h2> </div> )}
            </div>
        </div>

        

        <div className='pips-container'>
            {Array.from({ length: 5 }).map((_,index)=>  <div className="pip"  key={index}> </div>) }
        </div>

        <button onClick={leftButton}>  Left </button>
        <button onClick={rightButton}> Right  </button>
    </>
  )
}





function CarousalCard() {
    return (
      <div className='card'>
          <h2>Title</h2>
      </div>
    )
  }
  