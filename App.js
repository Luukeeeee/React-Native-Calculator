import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
	const keys = [
		{ hardKey: 'C', value: 'clear', number: false, key: '1' },
		{ hardKey: '÷', value: '/', number: false, key: '2' },
		{ hardKey: '×', value: '*', number: false, key: '3' },
		{ hardKey: '←', value: 'back', number: false, key: '4' },
		{ hardKey: '7', value: '7', number: true, key: '5' },
		{ hardKey: '8', value: '8', number: true, key: '6' },
		{ hardKey: '9', value: '9', number: true, key: '7' },
		{ hardKey: '﹣', value: '-', number: false, key: '8' },
		{ hardKey: '4', value: '4', number: true, key: '9' },
		{ hardKey: '5', value: '5', number: true, key: '10' },
		{ hardKey: '6', value: '6', number: true, key: '11' },
		{ hardKey: '﹢', value: '+', number: false, key: '12' },
		{ hardKey: '1', value: '1', number: true, key: '13' },
		{ hardKey: '2', value: '2', number: true, key: '14' },
		{ hardKey: '3', value: '3', number: true, key: '15' },
		{ hardKey: '＝', value: '=', number: false, key: '16' },
		{ hardKey: '0', value: '0', number: true, key: '17' },
		{ hardKey: '(', value: '(', number: false, key: '18' },
		{ hardKey: ')', value: ')', number: false, key: '19' },
		{ hardKey: '·', value: '.', number: false, key: '20' }
	];
	const [ display, setDisplay ] = useState('');
	const [ calc, setCalc ] = useState('');
	const [ result, setResult ] = useState(0);

	const handleCalc = (hardKey, value) => {
		switch (value) {
			case 'clear':
				setDisplay('');
				setCalc('');
				break;
			case 'back':
				setDisplay((preDisplay) => {
					let array = preDisplay.split('');
					array.pop();
					return array.join('');
				});
				setCalc((preCalc) => {
					let array = preCalc.split('');
					array.pop();
					return array.join('');
				});
				break;
			case '=':
				setResult(eval(calc).toString());
				setDisplay(eval(calc).toString());
				setCalc(eval(calc).toString());
				if (eval(calc) == 0) {
					setCalc('');
					setDisplay('');
				}
				break;
			default:
				const str = '1234567890';
				if (display === '0' && str.indexOf(hardKey) >= 0) {
					setDisplay('');
				}
				setDisplay((preDisplay) => {
					return preDisplay + hardKey;
				});
				setCalc((preCalc) => {
					return preCalc + value;
				});
				break;
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.display}>
				<Text style={styles.displayText}>{display === '' ? 0 : display}</Text>
			</View>
			<View style={styles.keyboard}>
				<FlatList
					data={keys}
					horizontal={false}
					numColumns={4}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={item.number ? styles.buttonNum : styles.buttonSym}
							onPress={() => {
								handleCalc(item.hardKey, item.value);
							}}
						>
							<Text style={styles.keyText}>{item.hardKey}</Text>
						</TouchableOpacity>
					)}
				/>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonNum: {
		width: '24.8%',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 30,
		// backgroundColor: "green",
		borderWidth: 2,
		borderColor: 'lightblue'
	},
	buttonSym: {
		width: '24.8%',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 30,
		backgroundColor: 'lightgrey',
		borderWidth: 2,
		borderColor: 'lightblue'
	},
	display: {
		height: '35%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	displayText: {
		fontWeight: 'bold',
		fontSize: 35,
		color: '#888'
	},
	keyText: {
		fontSize: 20,
		color: 'grey'
	},
	keyboard: {
		height: "65%"
	}
});
