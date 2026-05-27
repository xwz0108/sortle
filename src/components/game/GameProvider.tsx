import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import useGameStore from '../../store/gameStore';
import GameBoard from './GameBoard';

const GameProvider: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <GameBoard />
    </DndProvider>
  );
};

export default GameProvider;
