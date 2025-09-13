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
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  food: {
    backgroundColor: 'red',
    borderRadius: 5,
    position: 'absolute',
  },
});

export default Food;