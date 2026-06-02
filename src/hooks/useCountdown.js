import { useState, useEffect, useRef } from 'react';

export function useCountdown(initialSeconds, onExpire) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const firedRef = useRef(false);
  const intervalRef = useRef(null);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          if (!firedRef.current) {
            firedRef.current = true;
            onExpireRef.current();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  function start() {
    firedRef.current = false;
    setIsRunning(true);
  }

  function pause() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  }

  function reset(newSeconds) {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    firedRef.current = false;
    setTimeLeft(newSeconds ?? initialSeconds);
  }

  return { timeLeft, isRunning, start, pause, reset };
}
