import React, { useRef, useState, useEffect } from 'react'
import GameFinishedModal from './GameFinishedModal';
import Card from './Card'
import Settings from './Settings';
export default function Cards() {


    const [numUniqueCards, setNumUniqueCards] = useState(6);
    const [previousCardState, setPreviousCardState] = useState(-1)
    const previousIndex = useRef(-1)
    const [timer, setTimer] = useState(0);
    const [turns, setTurns] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [shuffleAnimation, setShuffleAnimation] = useState(false);
    const [isGameFinished, setGameFinished] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [score, setScore] = useState({ player1: 0, player2: 0 });
    const [gameMode, setGameMode] = useState('single');
    const [showSettings, setShowSettings] = useState(false);

    const mode = (m) =>{
        setGameMode(m)
        resetGame()
    }

    let shuffledCards = [];

    for (let i = 1; i <= numUniqueCards; i++) {
        shuffledCards.push(
            { id: i, image: `./imgs/${i}.jpg`, alt: `animal${i}`, status: "" },
            { id: i, image: `./imgs/${i}.jpg`, alt: `animal${i}`, status: "" }
        );
    }
    shuffledCards = shuffledCards.sort(() => Math.random() - 0.5);
    const [cards, setCards] = useState(shuffledCards)


    useEffect(() => {
        let interval;

        if (gameStarted && !isGameFinished) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [gameStarted, isGameFinished]);

    const switchPlayer = () => {
        setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
    };

    const resetGame = () => {
        setCards(shuffledCards);
        setPreviousCardState(-1);
        previousIndex.current = -1;
        setTimer(0);
        setTurns(0);
        setGameStarted(false);
        setShuffleAnimation(true);
        setTimeout(() => {
            setShuffleAnimation(false);
        }, 500);
        setCurrentPlayer(1);
        setScore({ player1: 0, player2: 0 })
    };

    const updateScore = () => {
        const newScore = { ...score };
        newScore[`player${currentPlayer}`] += 1;
        setScore(newScore);
    };


    const finishGame = () => {

        setGameFinished(true);
    };

    const closeModal = () => {
        setGameFinished(false);
        resetGame();
    };


    const checkGameCompletion = () => {
        const isFinished = cards.every((card) => card.status === 'matched');
        if (isFinished) {
            setGameFinished(true);
        }
    };

    const chooseDeck = (num) => {
        setNumUniqueCards(num);
    };

    useEffect(() => {
        if (numUniqueCards) {
            setShuffleAnimation(true);
            setGameFinished(false);
            setTimeout(() => {
                resetGame();
                setShuffleAnimation(false);
            }, 500);
        }
    }, [numUniqueCards]);



    const matchCheck = (currentCard) => {
        if (cards[currentCard].id === cards[previousCardState].id) {
            cards[previousCardState].status = 'matched'
            cards[currentCard].status = 'matched'
            setPreviousCardState(-1)
            updateScore()
        } else {
            cards[currentCard].status = 'active'
            setCards([...cards])
            setTimeout(() => {
                setPreviousCardState(-1)
                cards[currentCard].status = ''
                cards[previousCardState].status = ''
                setCards([...cards])
                switchPlayer();
            }, 1000);
        }
        setTurns((prevTurns) => prevTurns + 1);

        checkGameCompletion();


    }

    const clickhandler = (index) => {
        if (!gameStarted) {
            setGameStarted(true);
        }

        if (index !== previousIndex.current) {
            if (cards[index].status === 'matched') {
                alert('already matched')
            } else {
                if (previousCardState === -1) {
                    previousIndex.current = index
                    cards[index].status = 'active'
                    setCards([...cards])
                    setPreviousCardState(index)
                } else {
                    matchCheck(index)
                    previousIndex.current = -1
                }
            }
        } else {
            alert('card currently seleted')
        }

    }

    return (
        <>
            <div className="game-wrapper">
                <div className={`container ${shuffleAnimation ? 'reshuffle' : ''}`}>
                    {cards.map((card, index) => {
                        return <Card key={index} card={card} index={index} clickhandler={clickhandler} numUniqueCards={numUniqueCards} />
                    })}
                </div>
                <div className="game-info">
                    <button className="settings-button" onClick={() => setShowSettings(!showSettings)}>
                        Settings
                    </button>
                    <div className={`settings-container ${showSettings ? 'show' : ''}`}>

                    {showSettings && <Settings mode={mode} chooseDeck={chooseDeck} />}
                    </div>

                    <button className="newGame" onClick={resetGame}>New Game</button>
                    {gameMode === 'single' ? (
                        <>
                            <div className='timer'>Timer: {timer} seconds</div>
                            <div className='turns'>Turns: {turns}</div>
                        </>
                    ) : (
                        <>
                            <div className='currentPlayer'>Current Player: {currentPlayer}</div>
                            <div className='score'>
                                Score: <br />
                                Player 1 - {score.player1} <br />
                                Player 2 - {score.player2}
                            </div>
                        </>
                    )}
                </div>
                {isGameFinished && (
                    <GameFinishedModal onClose={closeModal} time={timer} turns={turns} score={score} />
                )}

            </div >
        </>
    );
}