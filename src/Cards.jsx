import React, { useRef, useState, useEffect } from 'react'
import GameFinishedModal from './GameFinishedModal';
import Card from './Card'
import Settings from './Settings';
import useSound from './UseSound';  
export default function Cards() {


    const [numUniqueCards, setNumUniqueCards] = useState(3);
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
    const [isSettingsOpen, setSettingsOpen] = useState(false);
    const playCorrectSound = useSound('./Correct Answer sound effect.mp3');
    const playWinSound = useSound("./cheer.mp3");

    const openSettings = () => {
        setSettingsOpen(true);
    };

    const closeSettings = () => {
        setSettingsOpen(false);
    };

    const mode = (m) => {
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

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };

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
            playWinSound()
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
            playCorrectSound()
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
                return
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
            return
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
                    <button className="settingsButton" onClick={openSettings}>
                        Settings
                    </button>
                    <div className={`settings-container ${showSettings ? 'show' : ''}`}>

                        {showSettings && <Settings mode={mode} chooseDeck={chooseDeck} />}
                    </div>

                    <button className="newGame" onClick={resetGame}>New Game</button>
                    {gameMode === 'single' ? (
                        <>
                            <div className='timer'>Timer: {formatTime(timer)}</div>
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
                {isSettingsOpen && (
                    <Settings onClose={closeSettings} chooseDeck={chooseDeck} mode={mode} />
                )}
                {isGameFinished && (
                    <GameFinishedModal onClose={closeModal} formatTime={formatTime}  time ={timer} turns={turns} score={score} gameMode={gameMode} />
                )}

            </div >
        </>
    );
}