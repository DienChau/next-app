'use client'
import Head from "next/head";
import { useEffect, useState } from "react";
import "./style.css";
import Score from "./Score";
import PlayerBoard from "./PlayerBoard";
import CpuBoard from "./CpuBoard";
import NumberContainer from "./NumberContainer";
import AutomaticButton from "./AutomaticButton";

const IndexPage: React.FC = () => {
  const [maxScore, setMaxScore] = useState<number>(0);
  const [userNumbers, setUserNumbers] = useState<number[]>([]);
  const [cpuNumbers, setCpuNumbers] = useState<number[]>([]);
  const [drawnNumbersSet, setDrawnNumbersSet] = useState<Set<number>>(new Set()); // Sử dụng Set để lưu trữ các số đã rút ra
  const [isAutomatic, setIsAutomatic] = useState<boolean>(false);
  const [isGameEnded, setIsGameEnded] = useState<boolean>(false);

  useEffect(() => {
    const maxScoreValue = parseInt(localStorage.getItem("maxScore") || "0", 10);
    setMaxScore(maxScoreValue);
    setUserNumbers(fifteenRandomNumbers());
    setCpuNumbers(fifteenRandomNumbers());
  }, []);

  let automaticInterval: NodeJS.Timeout | null = null;

  const onAutomatic = () => {
    alert("Automatico activado!");
    setIsAutomatic(true);
    automaticInterval = setInterval(randomNumberDraw, 300);
  };

  const onStopAutomatic = () => {
    alert("Automatico desactivado!");
    setIsAutomatic(false);
    if (automaticInterval) {
      clearInterval(automaticInterval);
    }
  };

  const randomNumberDraw = () => {
    if (isGameEnded) {
      return; // Nếu trận đấu đã kết thúc, không rút số tiếp
    }

    if (balls.length === 0) {
      setIsGameEnded(true);
      alert("No quedan mas bolas!");
      // Khởi tạo danh sách bóng mới sau khi kết thúc trò chơi
      setBalls(initialBalls);
      return;
    }

    const randomNumber = balls[Math.floor(Math.random() * balls.length)];
    setBalls(balls.filter((num) => num !== randomNumber));
    setDrawnNumbersSet((prevSet) => new Set(prevSet.add(randomNumber))); // Thêm số đã rút vào Set

    setCurrentNumber(randomNumber);

    checkWinner();

    if (balls.length === 0) {
      setIsGameEnded(true);
      alert("No quedan mas bolas!");
      onStopAutomatic();
    }
  };

  const checkWinner = () => {
    const userAcerts = userNumbers.filter((num) => drawnNumbersSet.has(num)).length; // Sử dụng Set để kiểm tra số đã rút
    const cpuAcerts = cpuNumbers.filter((num) => drawnNumbersSet.has(num)).length; // Sử dụng Set để kiểm tra số đã rút

    if (userAcerts === 15) {
      setIsGameEnded(true);
      alert(`Ganaste!, quedaron en el bolillero ${balls.length} bolas`);
      onStopAutomatic();
      if (balls.length > maxScore) {
        setMaxScore(balls.length);
        localStorage.setItem("maxScore", balls.length.toString());
      }
    } else if (cpuAcerts === 15) {
      setIsGameEnded(true);
      alert(`Perdiste, la ganadora es la CPU! Quedaron en el bolillero ${balls.length} bolas`);
      onStopAutomatic();
    }
  };

  const renderNumberColor = (number: number) => {
    if (drawnNumbersSet.has(number)) {
      if (userNumbers.includes(number)) {
        return "green";
      } else if (cpuNumbers.includes(number)) {
        return "red";
      }
    }
    return "white"; // Màu mặc định
  };

  const fifteenRandomNumbers = () => {
    const arr: number[] = [];
    for (let i = 0; i < 15; i++) {
      const randomNumber = Math.floor(Math.random() * 100);
      if (randomNumber === 100 || randomNumber === 0) {
        i--;
        continue;
      } else if (!arr.includes(randomNumber)) {
        arr.push(randomNumber);
      } else {
        i--;
      }
    }
    return arr;
  };

  // const [balls, setBalls] = useState<number[]>(Array.from({ length: 99 }, (_, i) => i + 1));
  const initialBalls = Array.from({ length: 99 }, (_, i) => i + 1);
  const [balls, setBalls] = useState<number[]>(initialBalls);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>Juego de bingo</title>
      </Head>
      <Score maxScore={maxScore} />
      <section className="competidores">
        <PlayerBoard userNumbers={userNumbers} drawnNumbersSet={drawnNumbersSet} /> 
        <div className="mezclador">
          <p id="numberDraw" onClick={randomNumberDraw}>
            {currentNumber !== null ? currentNumber : "Start"}
          </p>
        </div>
        <CpuBoard cpuNumbers={cpuNumbers} drawnNumbersSet={drawnNumbersSet} /> 
      </section>
      <AutomaticButton
        onAutomatic={onAutomatic}
        onStopAutomatic={onStopAutomatic}
        isAutomatic={isAutomatic}
      />
      <NumberContainer numbers={Array.from(drawnNumbersSet)} renderNumberColor={renderNumberColor} /> 
    </>
  );
};

export default IndexPage;
