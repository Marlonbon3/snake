import React from 'react';
// --- NUEVO: Importa 'Platform' ---
import { StyleSheet, View, Text, PanResponder, Platform } from 'react-native'; 
import Snake from './Snake';
import Food from './Food';

// --- Constantes del Juego ---
const GRID_SIZE = 15;
const CELL_SIZE = 20;

// --- Funciones de Ayuda ---
const getRandomCoordinates = () => {
  const min = 0;
  const max = GRID_SIZE - 1;
  return {
    x: Math.floor(Math.random() * (max - min + 1)) + min,
    y: Math.floor(Math.random() * (max - min + 1)) + min,
  };
};

const Game = () => {
  // --- Estados del Juego ---
  const [snake, setSnake] = React.useState([{ x: 2, y: 2 }]);
  const [food, setFood] = React.useState(getRandomCoordinates());
  const [direction, setDirection] = React.useState('RIGHT');
  const [score, setScore] = React.useState(0);
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [snakeColor, setSnakeColor] = React.useState('#00FF00');

  // --- Lógica de Reinicio ---
  const resetGame = () => {
    setSnake([{ x: 2, y: 2 }]);
    setFood(getRandomCoordinates());
    setDirection('RIGHT');
    setScore(0);
    setSnakeColor('#00FF00');
    setIsGameOver(false);
  };

  // --- Control de Gestos (Swipes) para móvil ---
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const { dx, dy } = gestureState;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && direction !== 'LEFT') setDirection('RIGHT');
        else if (dx < 0 && direction !== 'RIGHT') setDirection('LEFT');
      } else {
        if (dy > 0 && direction !== 'UP') setDirection('DOWN');
        else if (dy < 0 && direction !== 'DOWN') setDirection('UP');
      }
    },
  });

  // --- NUEVO: Manejo de Teclado para la web ---
  React.useEffect(() => {
    // Solo añade el listener si estamos en la web
    if (Platform.OS !== 'web') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Limpia el listener cuando el componente se desmonte
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction]); // Se vuelve a ejecutar si la dirección cambia


  // --- Game Loop ---
  React.useEffect(() => {
    if (isGameOver) return;
    const gameInterval = setInterval(moveSnake, 200);
    return () => clearInterval(gameInterval);
  }, [snake, isGameOver]);

  // --- Lógica de Movimiento y Colisiones ---
  const moveSnake = () => {
    // ... (El resto de esta función es igual, no necesita cambios)
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'UP': head.y -= 1; break;
      case 'DOWN': head.y += 1; break;
      case 'LEFT': head.x -= 1; break;
      case 'RIGHT': head.x += 1; break;
    }

    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      setIsGameOver(true);
      return;
    }

    for (let i = 1; i < newSnake.length; i++) {
      if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
        setIsGameOver(true);
        return;
      }
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setScore(score + 1);
      setFood(getRandomCoordinates());
      const newColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
      setSnakeColor(newColor);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Text style={styles.scoreText}>Puntaje: {score}</Text>
      
      <View style={[styles.gameArea, { width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }]}>
        <Snake snake={snake} color={snakeColor} cellSize={CELL_SIZE} />
        <Food food={food} cellSize={CELL_SIZE} />
      </View>

      {isGameOver && (
        <View style={styles.gameOverOverlay}>
          <Text style={styles.gameOverText}>¡Juego Terminado!</Text>
          <Text style={styles.finalScoreText}>Puntaje Final: {score}</Text>
          <Text style={styles.resetButton} onPress={resetGame}>Volver a Jugar</Text>
        </View>
      )}
    </View>
  );
};

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    position: 'absolute',
    top: 80,
  },
  gameArea: {
    borderWidth: 2,
    borderColor: '#FFF',
    backgroundColor: '#333',
    position: 'relative',
  },
  gameOverOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    color: 'red',
    fontSize: 40,
    fontWeight: 'bold',
  },
  finalScoreText: {
    color: 'white',
    fontSize: 24,
    marginTop: 10,
  },
  resetButton: {
    color: '#00FF00',
    fontSize: 20,
    marginTop: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: '#00FF00',
    borderRadius: 5,
  },
});

export default Game;