import React, { useRef, useState } from 'react'
import Card from './Card'
export default function Cards() {
  const [cards, setCards] = useState([
    { id: 1, image: "./imgs/1.jpg", alt: "fox", status: "" },
    { id: 1, image: "./imgs/1.jpg", alt: "fox", status: "" },
    { id: 2, image: "./imgs/2.jpg", alt: "wolf", status: "" },
    { id: 2, image: "./imgs/2.jpg", alt: "wolf", status: "" },
    { id: 3, image: "./imgs/3.jpg", alt: "lion", status: "" },
    { id: 3, image: "./imgs/3.jpg", alt: "lion", status: "" },
    { id: 4, image: "./imgs/4.jpg", alt: "lepard", status: "" },
    { id: 4, image: "./imgs/4.jpg", alt: "lepard", status: "" },
    { id: 5, image: "./imgs/5.jpg", alt: "tiger", status: "" },
    { id: 5, image: "./imgs/5.jpg", alt: "tiger", status: "" },
    { id: 6, image: "./imgs/6.jpg", alt: "panda", status: "" },
    { id: 6, image: "./imgs/6.jpg", alt: "panda", status: "" }
  ].sort(() => Math.random() - .5))

  const [previousCardState, setPreviousCardState] = useState(-1)
    const previousIndex = useRef(-1)

    const matchCheck = (currentCard) => {
        if(cards[currentCard].id === cards[previousCardState].id){
            cards[previousCardState].status =  'matched'
            cards[currentCard].status = 'matched'
            setPreviousCardState(-1)
        }else{
            cards[currentCard].status = 'active'
            setCards([...cards])
            setTimeout(() => {
                setPreviousCardState(-1)
                cards[currentCard].status = ''
                cards[previousCardState].status = ''
                setCards([...cards])
            }, 1000);
        }
    }

    const clickhandler = (index) => {
        
        if(index !== previousIndex.current){
            if(cards[index].status === 'matched'){
                alert('already matched')
            }else{
                if(previousCardState === -1){
                    previousIndex.current = index
                    cards[index].status = 'active'
                    setCards([...cards])
                    setPreviousCardState(index)
                }else{
                    matchCheck(index)
                    previousIndex.current = -1
                }
            }
        }else{
            alert('card currently seleted')
        }

    }

    return (
      <div className="container">
        { cards.map((card, index) => {
            return <Card key={index} card={card} index={index} clickhandler={clickhandler} />
        })}
      </div>
    );
}