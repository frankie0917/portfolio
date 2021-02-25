import React, { useEffect, useMemo, useRef, useState } from "react";
import meImg from "../img/me.jpg";

export const Game = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [userScore, setUserScore] = useState(0);
  const [comScore, setComScore] = useState(0);
  const img = useMemo(() => new Image(), []);
  img.width = 40;
  img.height = 40;
  img.src = meImg;

  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (!ctx) return;

    const drawRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      color?: string
    ) => {
      ctx.fillStyle = color || "#ffffff";
      ctx.fillRect(x, y, w, h);
    };

    const fps = 50;
    const canvas = {
      width: ctx!.canvas.width,
      height: ctx!.canvas.height,
    };
    const borders = {
      size: 10,
      color: "#ffffff",
      x: 0,
      y: 0,
      xSpeed: 30,
      ySpeed: 20,
    };
    const paddle = {
      w: 30,
      h: 150,
    };
    const user = {
      x: 10,
      y: canvas.height / 2 - paddle.h / 2,
      score: 0,
    };
    const com = {
      x: canvas.width - paddle.w - 10,
      y: canvas.height / 2 - paddle.h / 2,
      score: 0,
      level: 0.1,
    };

    const ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 40,
      speed: 15,
      velocityX: 15,
      velocityY: 15,
    };

    ref.current!.addEventListener("mousemove", (e) => {
      const rect = ref.current!.getBoundingClientRect();

      user.y = e.clientY - rect.top - paddle.h / 2;
    });

    const drawBorders = () => {
      if (borders.x < canvas.width) {
        borders.x += borders.xSpeed;
      }
      drawRect(0, 0, borders.x, borders.size, borders.color);
      drawRect(
        canvas.width - borders.x,
        canvas.height - borders.size,
        borders.x,
        borders.size,
        borders.color
      );

      if (borders.y < canvas.height) {
        borders.y += borders.ySpeed;
      }
      drawRect(0, 0, borders.size, borders.y, borders.color);
      drawRect(
        canvas.width - borders.size,
        canvas.height - borders.y,
        borders.size,
        borders.y,
        borders.color
      );
    };

    const drawNet = () => {
      for (let i = 0; i < canvas.height; i += 30) {
        drawRect(canvas.width / 2 - 5, i, 10, 17);
      }
    };

    const drawBall = () => {
      const drawArc = () => {
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      };
      ctx.save();
      ctx.beginPath();
      drawArc();
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(img, ball.x - ball.radius, ball.y - ball.radius, 80, 80);

      ctx.beginPath();
      drawArc();
      ctx.clip();
      ctx.closePath();
      ctx.restore();
    };

    const render = () => {
      drawRect(0, 0, canvas.width, canvas.height, "rgba(55, 65, 81,1)");
      drawBorders();
      drawNet();
      drawBall();
      drawRect(user.x, user.y, paddle.w, paddle.h);
      drawRect(com.x, com.y, paddle.w, paddle.h);
    };

    const collision = (p: { x: number; y: number }) => {
      const bTop = ball.y - ball.radius;
      const bBottom = ball.y + ball.radius;
      const bLeft = ball.x - ball.radius;
      const bRight = ball.x + ball.radius;

      const pTop = p.y;
      const pBottom = p.y + paddle.h;
      const pLeft = p.x;
      const pRight = p.x + paddle.w;

      return (
        bTop < pBottom && bBottom > pTop && bLeft < pRight && bRight > pLeft
      );
    };

    const resetBall = () => {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;

      ball.velocityX = -ball.velocityX;
    };

    const update = () => {
      // if (
      //   ball.x + ball.radius > canvas.width - borders.size ||
      //   ball.x - ball.radius < borders.size
      // ) {
      //   ball.velocityX = -ball.velocityX;
      // }

      if (
        ball.y + ball.radius > canvas.height - borders.size ||
        ball.y - ball.radius < borders.size
      ) {
        ball.velocityY = -ball.velocityY;
      }
      ball.x += ball.velocityX;
      ball.y += ball.velocityY;

      com.y += (ball.y - com.y - paddle.h / 2) * com.level;

      const player = ball.x > canvas.width / 2 ? com : user;

      if (collision(player)) {
        let collidePoint = ball.y - (player.y + paddle.h / 2);
        collidePoint = collidePoint / (paddle.h / 2);

        let angleRad = (Math.PI / 4) * collidePoint;

        let direction = ball.x + ball.radius < canvas.width / 2 ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        ball.speed += 1;
      }

      if (ball.x - ball.radius < 10) {
        // com wins
        setComScore((prev) => prev + 1);
        resetBall();
      }

      if (ball.x + ball.radius > canvas.width - 10) {
        // user wins
        setUserScore((prev) => prev + 1);
        resetBall();
      }
    };

    const interval = setInterval(() => {
      update();
      render();
    }, 1000 / fps);

    return () => {
      clearInterval(interval);
    };
  }, [ref, img]);

  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{ transform: "translate(-50%,-50%)" }}
    >
      <canvas
        width={(window.innerWidth / 3) * 2}
        height={(window.innerHeight / 3) * 2}
        ref={ref}
      />
      <div
        className="absolute left-1/2 top-8 text-7xl text-white"
        style={{ transform: "translate(-200%,0)" }}
      >
        {userScore}
      </div>
      <div
        className="absolute left-1/2 top-8 text-7xl text-white"
        style={{ transform: "translate(100%,0)" }}
      >
        {comScore}
      </div>
    </div>
  );
};
