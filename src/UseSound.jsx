import { useState, useEffect } from 'react';

const useSound = (soundUrl) => {
  const [audio] = useState(new Audio(soundUrl));

  const play = () => {
    audio.play();
  };

  useEffect(() => {
    audio.addEventListener('ended', () => {
      audio.currentTime = 0;
    });

    return () => {
      audio.removeEventListener('ended', () => {
        audio.currentTime = 0;
      });
    };
  }, [audio]);

  return play;
};

export default useSound;
