import { useState } from 'react'

export default function Card({ card, index, clickhandler }) {

 
    return (
      <div className={`card ${card.status}`} onClick={() => clickhandler(index)}>
        <img src={card.image} alt={card.alt} />
      </div>
    );
  }