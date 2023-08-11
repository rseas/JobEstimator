import React, {useEffect, useState} from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import NumericInput from 'react-native-numeric-input';
import SwitchSelector from "react-native-switch-selector";
import styles from "./styles";

const Deck = () => {
    const [total, setTotal] = useState(0);
    const [sqft, setSQFT] = useState(0);
    const [mat, setMat] = useState('Wood');
    const [footers, setFooters] = useState(0);
    const [size, setSize] = useState('2x8');

    const calcTotal = () => {
        setTotal(100);
    }

    return (
      <View style={styles.screen}>
        <View style={styles.factorList}>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Square Footage</Text>
            <TextInput
              style={[styles.input, {width: '20%', fontSize: 20}]}
              keyboardType="numeric"
              inputMode="numeric"
              onChangeText={(text) => setSQFT(text)}
              value={sqft}
              textAlign="center"
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Number of Footers</Text>
            <NumericInput
              onChange={value => setFooters(value)}
              value={footers}
              totalWidth={120}
              totalHeight={60}
              minValue={0}
              maxValue={50}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Material Type</Text>
            <SwitchSelector
              options={[
                {label: 'Wood', value: 'Wood'},
                {label: 'Composite', value: 'Composite'}
              ]}
              hasPadding
              style={{width: '40%'}}
              onPress={value => setMat(value)}
              initial={0}
              buttonColor={'#fff700'}
              selectedColor={'black'}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Framing Lumber Size</Text>
            <SwitchSelector
              options={[
                {label: '2x8', value: '2x8'},
                {label: '2x10', value: '2x10'}
              ]}
              hasPadding
              style={{width: '40%'}}
              onPress={value => setSize(value)}
              initial={0}
              buttonColor={'#fff700'}
              selectedColor={'black'}
            />
          </View>
        </View>
        <TouchableOpacity onPress={calcTotal} style={styles.calculate}>
          <Text style={styles.calcText}>CALCULATE</Text>
        </TouchableOpacity>
        <View style={styles.totalContainer}>
            <Text style={styles.totalText}>ESTIMATE: </Text>
            <Text style={styles.totalNum}>${total}</Text>
        </View>
      </View>
    );
};

export default Deck;