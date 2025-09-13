import React from 'react';
import { View, StyleSheet } from 'react-native';

interface SnakeProps {
  snake: { x: number; y: number }[];
  color: string;
  cellSize: number;
}

const Snake: React.FC<SnakeProps> = ({ snake, color, cellSize }) => {
  return (
    <>
      {snake.map((segment, index) => (
        <View
          key={index}
          style={[
            styles.snakeSegment,
            {
              width: cellSize,
              height: cellSize,
              left: segment.x * cellSize,
              top: segment.y * cellSize,
              backgroundColor: color,
              borderRadius: index === 0 ? cellSize / 2 : 6,
              borderWidth: index === 0 ? 2 : 1,
              borderColor: '#FFF',
            },
          ]}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  snakeSegment: {
    position: 'absolute',
  },
});

export default Snake;
