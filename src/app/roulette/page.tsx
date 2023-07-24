"use client";
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
  const [drawnNumbersSet, setDrawnNumbersSet] = useState<Set<number>>(
    new Set()
  ); // Sử dụng Set để lưu trữ các số đã rút ra
  const [isAutomatic, setIsAutomatic] = useState<boolean>(false);
  const [isGameEnded, setIsGameEnded] = useState<boolean>(false);
  const [userAcerts, setUserAcerts] = useState<number>(0);
  const [cpuAcerts, setCpuAcerts] = useState<number>(0);

  const [betAmount, setBetAmount] = useState<number>(0);
  const [totalMoney, setTotalMoney] = useState<number>(1000); // Số tiền ban đầu của người chơi

  useEffect(() => {
    const maxScoreValue = parseInt(localStorage.getItem("maxScore") || "0", 10);
    setMaxScore(maxScoreValue);
    setUserNumbers(fifteenRandomNumbers());
    setCpuNumbers(fifteenRandomNumbers());
  }, []);

  const startGame = () => {
    if (betAmount <= totalMoney) {
      setTotalMoney(totalMoney - betAmount);
      setDrawnNumbersSet(new Set()); // Reset Set các số đã rút
      setIsGameEnded(false);
      setIsAutomatic(false);
      setBalls(initialBalls);
      setCurrentNumber(null);
      setUserAcerts(0);
      setCpuAcerts(0);
      randomNumberDraw();
    } else {
      alert("Not enough money to place the bet!");
    }
  };

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
    const userAcerts = userNumbers.filter((num) =>
      drawnNumbersSet.has(num)
    ).length; // Sử dụng Set để kiểm tra số đã rút
    const cpuAcerts = cpuNumbers.filter((num) =>
      drawnNumbersSet.has(num)
    ).length; // Sử dụng Set để kiểm tra số đã rút

    if (userAcerts === 15) {
      setIsGameEnded(true);
      alert(`Ganaste!, quedaron en el bolillero ${balls.length} bolas`);
      onStopAutomatic();
      if (balls.length > maxScore) {
        setMaxScore(balls.length);
        localStorage.setItem("maxScore", balls.length.toString());
      }

      // ... (code xử lý khi người chơi thắng cuộc)
      // Cộng số tiền thắng vào tổng số tiền của người chơi
      setTotalMoney(totalMoney + betAmount * 2);
      // Lưu thông tin trận đấu vào localStorage
      const matchResult = {
        result: "win",
        score: balls.length,
        bet: betAmount,
        totalMoney: totalMoney + betAmount * 2,
      };
      localStorage.setItem("matchResult", JSON.stringify(matchResult));
    } else if (cpuAcerts === 15) {
      setIsGameEnded(true);
      alert(
        `Perdiste, la ganadora es la CPU! Quedaron en el bolillero ${balls.length} bolas`
      );
      onStopAutomatic();

      // ... (code xử lý khi người chơi thua)
      setTotalMoney((prev) => prev - betAmount);
      // Lưu thông tin trận đấu vào localStorage
      const matchResult = {
        result: "lose",
        score: balls.length,
        bet: betAmount,
        totalMoney: totalMoney,
      };
      localStorage.setItem("matchResult", JSON.stringify(matchResult));
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

  const resetGame = () => {
    // Khởi tạo lại các state
    setMaxScore(0);
    setUserNumbers(fifteenRandomNumbers());
    setCpuNumbers(fifteenRandomNumbers());
    setDrawnNumbersSet(new Set());
    setIsAutomatic(false);
    setIsGameEnded(false);
    setBalls(initialBalls);
    setCurrentNumber(null);
    setUserAcerts(0);
    setCpuAcerts(0);
  };

  return (
    <>
      <Head>
        <title>Juego de bingo</title>
      </Head>
      <Score maxScore={maxScore} />
      <section className="competidores">
        <PlayerBoard
          userNumbers={userNumbers}
          drawnNumbersSet={drawnNumbersSet}
        />
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
      <NumberContainer
        numbers={Array.from(drawnNumbersSet)}
        renderNumberColor={renderNumberColor}
      />
      <input
        type="number"
        value={betAmount}
        onChange={(e) => setBetAmount(parseInt(e.target.value))}
        min={0}
        max={totalMoney}
      />
      <button onClick={startGame}>Start Game</button>

      <button onClick={resetGame}>Reset</button>
      {
        <div>Remain: ${totalMoney}</div>
      }
    </>
  );
};

export default IndexPage;
