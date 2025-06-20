import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { playHaptic } from '@/utils/haptics';
import { SettingsService } from '@/services/SettingsService';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [secretSequence, setSecretSequence] = useState('');
  const [secretCode, setSecretCode] = useState('12345');

  // Charger le code secret depuis les paramètres
  useEffect(() => {
    loadSecretCode();
  }, []);

  // Vérifier le code secret à chaque changement de séquence
  useEffect(() => {
    console.log('Current sequence:', secretSequence);
    const fullSecretCode = secretCode + '=';
    
    if (secretSequence.includes(fullSecretCode)) {
      console.log('Secret code detected! Activating secret mode...');
      // Naviguer vers l'interface de messagerie (tabs)
      router.replace('/(tabs)/chats');
      // Réinitialiser l'état
      setSecretSequence('');
      setDisplay('0');
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(false);
    }
    
    // Limiter la longueur de la séquence pour éviter les fuites mémoire
    if (secretSequence.length > 20) {
      setSecretSequence(secretSequence.slice(-10));
    }
  }, [secretSequence, secretCode]);

  const loadSecretCode = async () => {
    try {
      const settings = await SettingsService.getSettings();
      setSecretCode(settings.secretCode);
    } catch (error) {
      console.error('Error loading secret code:', error);
    }
  };

  const inputNumber = (num: string) => {
    playHaptic();
    
    // Ajouter le numéro à la séquence secrète
    setSecretSequence(prev => prev + num);
    
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    playHaptic();
    
    // Ajouter l'opération à la séquence secrète
    setSecretSequence(prev => prev + nextOperation);

    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const clear = () => {
    playHaptic();
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    // Réinitialiser la séquence secrète
    setSecretSequence('');
  };

  const percentage = () => {
    playHaptic();
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  };

  const toggleSign = () => {
    playHaptic();
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const Button = ({ 
    text, 
    onPress, 
    style, 
    textStyle 
  }: { 
    text: string; 
    onPress: () => void; 
    style?: any; 
    textStyle?: any; 
  }) => (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={style?.backgroundColor ? [style.backgroundColor, style.backgroundColor] : ['#2a2a2a', '#1a1a1a']}
        style={styles.buttonGradient}
      >
        <Text style={[styles.buttonText, textStyle]}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <View style={styles.displayContainer}>
        <Text style={styles.display} numberOfLines={1} adjustsFontSizeToFit>
          {display}
        </Text>
        {/* Indicateur de débogage (à supprimer en production) */}
        {__DEV__ && (
          <Text style={styles.debugText}>
            Code: {secretCode}= | Séquence: {secretSequence}
          </Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <Button text="C" onPress={clear} style={styles.functionButton} textStyle={styles.functionText} />
          <Button text="±" onPress={toggleSign} style={styles.functionButton} textStyle={styles.functionText} />
          <Button text="%" onPress={percentage} style={styles.functionButton} textStyle={styles.functionText} />
          <Button text="÷" onPress={() => inputOperation('÷')} style={styles.operatorButton} textStyle={styles.operatorText} />
        </View>

        <View style={styles.row}>
          <Button text="7" onPress={() => inputNumber('7')} />
          <Button text="8" onPress={() => inputNumber('8')} />
          <Button text="9" onPress={() => inputNumber('9')} />
          <Button text="×" onPress={() => inputOperation('×')} style={styles.operatorButton} textStyle={styles.operatorText} />
        </View>

        <View style={styles.row}>
          <Button text="4" onPress={() => inputNumber('4')} />
          <Button text="5" onPress={() => inputNumber('5')} />
          <Button text="6" onPress={() => inputNumber('6')} />
          <Button text="-" onPress={() => inputOperation('-')} style={styles.operatorButton} textStyle={styles.operatorText} />
        </View>

        <View style={styles.row}>
          <Button text="1" onPress={() => inputNumber('1')} />
          <Button text="2" onPress={() => inputNumber('2')} />
          <Button text="3" onPress={() => inputNumber('3')} />
          <Button text="+" onPress={() => inputOperation('+')} style={styles.operatorButton} textStyle={styles.operatorText} />
        </View>

        <View style={styles.row}>
          <Button text="0" onPress={() => inputNumber('0')} style={styles.zeroButton} />
          <Button text="." onPress={() => inputNumber('.')} />
          <Button text="=" onPress={() => inputOperation('=')} style={styles.operatorButton} textStyle={styles.operatorText} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  display: {
    fontSize: 70,
    color: '#fff',
    fontWeight: '200',
  },
  debugText: {
    fontSize: 12,
    color: '#666',
    marginTop: 10,
  },
  buttonContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  button: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    overflow: 'hidden',
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 37.5,
  },
  buttonText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '400',
  },
  functionButton: {
    backgroundColor: '#a6a6a6',
  },
  functionText: {
    color: '#000',
    fontWeight: '500',
  },
  operatorButton: {
    backgroundColor: '#ff9500',
  },
  operatorText: {
    color: '#fff',
    fontWeight: '500',
  },
  zeroButton: {
    width: 165,
  },
});