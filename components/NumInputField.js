import React from "react";
import { Text, View } from "react-native";
import NumericInput from "react-native-numeric-input";
import styles from '../screens/styles.js';

export default function NumInputField({
  title,
  set,
  value
}) {
    return (
        <View style={styles.factor}>
            <Text style={styles.factorTitle}>{title}</Text>
            <NumericInput 
                onChange={value => set(value)}
                value={value}
                totalWidth={180}
                totalHeight={60} 
                minValue={0}
                maxValue={50}
                rounded
                rightButtonBackgroundColor={'#F5f5f5'}
                leftButtonBackgroundColor={'#F5f5f5'}
            />
        </View>
    );
}
  