import React, { useRef, useEffect } from "react";

const SpeedoCanvas = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 500;
    const context = canvas.getContext("2d");
    context.scale(1, 1);

    var speedGradient = context.createLinearGradient(0, 500, 0, 0);
    speedGradient.addColorStop(0, "#00b8fe");
    speedGradient.addColorStop(1, "#41dcf4");

    const speedNeedle = (rotation) => {
      context.lineWidth = 2;

      context.save();
      context.translate(250, 250);
      context.rotate(rotation);
      context.strokeRect(-130 / 2 + 170, -1 / 2, 135, 1);
      context.restore();

      rotation += Math.PI / 180;
    };

    const drawMiniNeedle = (rotation, width, speed) => {
      context.lineWidth = width;

      context.save();
      context.translate(250, 250);
      context.rotate(rotation * 1.2);
      context.strokeStyle = "#333";
      context.fillStyle = "#333";
      context.strokeRect(-20 / 2 + 220, -1 / 2, 20, 1);
      context.restore();
      let x = 250 + 180 * Math.cos(rotation * 1.2);
      let y = 250 + 180 * Math.sin(rotation * 1.2);

      context.font = "700 20px Open Sans";
      context.fillText(speed, x, y);

      rotation += Math.PI / 180;
    };

    const calculateSpeedAngle = (x, a, b) => {
      let degree = (a - b) * x + b;
      let radian = (degree * Math.PI) / 180;
      return radian <= 1.45 ? radian : 1.45;
    };

    const drawSpeedo = (speed, topSpeed) => {
      if (speed === undefined) {
        return false;
      } else {
        speed = Math.floor(speed);
      }

      context.clearRect(0, 0, 500, 500);

      context.beginPath();
      context.fillStyle = "rgba(0, 0, 0, .9)";
      context.arc(250, 250, 240, 0, 2 * Math.PI);
      context.fill();
      context.save();
      context.restore();
      context.fillStyle = "#FFF";
      context.stroke();

      context.beginPath();
      context.strokeStyle = "#333";
      context.lineWidth = 10;
      context.arc(250, 250, 100, 0, 2 * Math.PI);
      context.stroke();

      context.beginPath();
      context.lineWidth = 1;
      context.arc(250, 250, 240, 0, 2 * Math.PI);
      context.stroke();

      context.font = "700 70px Open Sans";
      context.textAlign = "center";
      context.fillText(speed, 250, 280);

      context.font = "700 15px Open Sans";
      context.fillText("mph", 250, 295);

      context.fillStyle = "#FFF";
      for (var i = 10; i <= Math.ceil(topSpeed / 20) * 20; i += 10) {
        console.log();
        drawMiniNeedle(
          calculateSpeedAngle(i / topSpeed, 83.07888, 34.3775) * Math.PI * 1.2,
          i % 20 === 0 ? 3 : 1,
          i % 20 === 0 ? i : ""
        );
      }

      context.beginPath();
      context.strokeStyle = "#41dcf4";
      context.lineWidth = 25;
      context.shadowBlur = 20;
      context.shadowColor = "#00c6ff";

      context.strokeStyle = speedGradient;
      context.arc(
        250,
        250,
        228,
        0.8 * Math.PI,
        calculateSpeedAngle(speed / topSpeed, 83.07888, 34.3775) * Math.PI * 1.5
      );
      context.stroke();
      context.beginPath();
      context.lineWidth = 25;
      context.shadowBlur = 0;

      context.strokeStyle = "#41dcf4";
      speedNeedle(
        calculateSpeedAngle(speed / topSpeed, 83.07888, 34.3775) * Math.PI * 1.5
      );

      context.strokeStyle = "#000";
    };

    const setSpeed = () => {
      let speedM = 0;
      setInterval(function () {
        if (speedM > 220) {
          speedM = 0;
        }

        speedM++;
        drawSpeedo(speedM, 220);
      }, 40);
    };
    setSpeed();
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

export default SpeedoCanvas;
