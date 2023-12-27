export default function Settings({ chooseDeck, mode, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content settings" >
                <div className="modal-header">
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                    <h1>Game Settings</h1>
                </div>

                <h2>Players</h2>
                <button className="players" onClick={() => mode("single")}>1 PLAYER</button>
                <button className="players" onClick={() => mode("2")}>2 PLAYERS</button>
                <h2>Number of cards</h2>
                <button className="deck" onClick={() => chooseDeck(3)}>6</button>
                <button className="deck" onClick={() => chooseDeck(6)}>12</button>
                <button className="deck" onClick={() => chooseDeck(10)}>20</button>
                <button className="deck" onClick={() => chooseDeck(15)}>30</button>
            </div>
        </div>
    )
}
