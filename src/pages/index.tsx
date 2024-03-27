import { FC, useEffect, useRef } from 'react';
import { Game } from '../game';

export const IndexPage: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const game = new Game(canvasRef.current);
      game.initializeGame();
    }
  }, []);

  return <canvas ref={canvasRef} />;
};

export default IndexPage;
