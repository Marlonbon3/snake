import React from 'react';
import { View, StyleSheet } from 'react-native';

interface FoodProps {
  food: { x: number; y: number };
  cellSize: number;
}

const Food: React.FC<FoodProps> = ({ food, cellSize }) => {
  return (
    <View
      style={[
        styles.food,
        {
          width: cellSize,
          height: cellSize,
          left: food.x * cellSize,
          top: food.y * cellSize,
          borderRadius: cellSize / 2, // círculo perfecto
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  food: {
    backgroundColor: '#FFF',
    position: 'absolute',
    shadowColor: '#FFF',
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5, // efecto glow en Android
  },
});

export default Food;