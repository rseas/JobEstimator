import React, {useEffect, useState} from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import NumericInput from 'react-native-numeric-input';
import SwitchSelector from "react-native-switch-selector";
import styles from "./styles";

const Addition = () => {

    const [total, setTotal] = useState(0);
    const [sqft, setSQFT] = useState(0);
    const [roof, setRoof] = useState('Gable');
    const [bath, setBath] = useState(0);
    const [closet, setCloset] = useState(0);

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
            <Text style={styles.factorTitle}>Roof Style</Text>
            <SwitchSelector
              options={[
                {label: 'Gable', value: 'Gable'},
                {label: 'Shed', value: 'Shed'}
              ]}
              hasPadding
              style={{width: '40%'}}
              onPress={value => setRoof(value)}
              initial={0}
              buttonColor={'#fff700'}
              selectedColor={'black'}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Bathrooms</Text>
            <NumericInput
              onChange={value => setBath(value)}
              value={bath}
              totalWidth={120}
              totalHeight={60}
              minValue={0}
              maxValue={10}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Closets</Text>
            <NumericInput
              onChange={value => setCloset(value)}
              value={closet}
              totalWidth={120}
              totalHeight={60}
              minValue={0}
              maxValue={10}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Labor (Days)</Text>
            <NumericInput
              onChange={value => setCloset(value)}
              value={closet}
              totalWidth={120}
              totalHeight={60}
              minValue={0}
              maxValue={10}
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

export default Addition;