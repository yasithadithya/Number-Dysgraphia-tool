// src/components/Canvas/DrawingCanvas.jsx
import React, { useRef, useState, useEffect } from 'react';
import './DrawingCanvas.css';

const DrawingCanvas = React.forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [lineWidth, setLineWidth] = useState(4); // Default line width

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineWidth = lineWidth;
    setContext(ctx);
  }, []); // Run once on mount

  // Update the context lineWidth whenever lineWidth state changes
  useEffect(() => {
    if (context) {
      context.lineWidth = lineWidth;
    }
  }, [lineWidth, context]);

  // Expose methods to parent via ref
  React.useImperativeHandle(ref, () => ({
    getImageData: () => canvasRef.current.toDataURL('image/png'),
    clearCanvas: () => {
      const canvas = canvasRef.current;
      context.clearRect(0, 0, canvas.width, canvas.height);
    },
  }));

  const getMousePos = (e) => ({
    x: e.nativeEvent.offsetX,
    y: e.nativeEvent.offsetY,
  });

  const getTouchPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  };

  const startDrawing = (x, y) => {
    setIsDrawing(true);
    context.beginPath();
    context.moveTo(x, y);
  };

  const drawLine = (x, y) => {
    if (!isDrawing) return;
    context.lineTo(x, y);
    context.stroke();
  };

  const finishDrawing = () => {
    if (isDrawing) {
      context.closePath();
      setIsDrawing(false);
    }
  };

  // Mouse event handlers
  const handleMouseDown = (e) => {
    const { x, y } = getMousePos(e);
    startDrawing(x, y);
  };

  const handleMouseMove = (e) => {
    const { x, y } = getMousePos(e);
    drawLine(x, y);
  };

  const handleMouseUp = () => finishDrawing();

  // Touch event handlers
  const handleTouchStart = (e) => {
    e.preventDefault();
    const { x, y } = getTouchPos(e);
    startDrawing(x, y);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const { x, y } = getTouchPos(e);
    drawLine(x, y);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    finishDrawing();
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        className="drawing-canvas w-full h-80 border-2 border-blue-300 rounded-lg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <div className="mt-4 flex flex-col items-center">
        <label htmlFor="lineWidth" className="text-gray-700 font-semibold">
          Line Width: {lineWidth}
        </label>
        <input
          id="lineWidth"
          type="range"
          min="1"
          max="10"
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
          className="w-64 mt-2"
        />
      </div>
    </div>
  );
});

export default DrawingCanvas;
