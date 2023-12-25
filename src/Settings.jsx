export default function Settings({chooseDeck, mode}) {
  return (
    <>
        <button className="players" onClick={()=>mode("single")}>1 PLAYER</button>
        <button className="players" onClick={()=>mode("2")}>2 PLAYERS</button>
        <button className="deck" onClick={()=>chooseDeck(3)}>6</button>
        <button className="deck" onClick={()=>chooseDeck(6)}>12</button>
        <button className="deck" onClick={()=>chooseDeck(10)}>20</button>
        <button className="deck" onClick={()=>chooseDeck(15)}>30</button>
    </>
  )
}
