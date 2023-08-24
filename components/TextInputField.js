import React from "react";
import { Text, View, TextInput } from "react-native";
import styles from '../screens/styles.js';

export default function TextInputField({
    title,
    set,
    value 
}) {
  return (
        <View style={styles.factor}>
            <Text style={styles.factorTitle}>{title}</Text>
            <TextInput 
                style={[styles.input, {
                    width: '20%',
                    fontSize: 20
                }]} 
                keyboardType="numeric"
                inputMode="numeric"
                onChangeText={text => set(text)}
                value={value}
                textAlign="center" 
            />
        </View>
  );
}
  