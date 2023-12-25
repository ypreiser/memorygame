import { useState } from 'react'

export default function Card({ card, index, clickhandler, numUniqueCards }) {

 
    return (
      <div className={`card ${card.status} c${numUniqueCards}` } onClick={() => clickhandler(index)}>
        <img src={card.image} alt={card.alt} draggable="false" />
      </div>
    );
  }