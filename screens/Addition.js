import React, {useEffect, useState} from "react";
import { Text, View, TextInput, TouchableOpacity, Switch } from "react-native";
import NumericInput from 'react-native-numeric-input';
import SwitchSelector from "react-native-switch-selector";
import styles from "./styles";

const Addition = () => {

    const [total, setTotal] = useState(0);
    const [sqft, setSQFT] = useState('0');
    const [bath, setBath] = useState(0);
    const [sp, setSP] = useState('s')
    const [elec, setElec] = useState(false);
    const [bathPlum, setBathPlum] = useState(false)
    const [kitch, setKitch] = useState(false);
    const [miniSplits, setMiniSplits] = useState(0);
    const [labor, setLabor] = useState(0);

    const calcTotal = () => {
      let ret = 0;
      squareFeet = parseFloat(sqft);
      let base = 175;
      if(elec){
        base += 12;
      }
      ret += base*squareFeet;

      if(bath!=0){
        if(sp == 's'){
          ret += bath*13000;
        } else if (sp =='p'){
          ret += bath*17000;
        }
      }

      if(bathPlum){
        ret += 7000;
      }
      if(kitch){
        ret += 3000;
      }

      ret += (miniSplits*7000);

      ret += (labor*1600);

      setTotal(ret)
    }

    return (
      <View style={styles.screen}>
        <View style={styles.factorList}>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Square Footage</Text>
            <TextInput
              style={[styles.input, {width: 140, fontSize: 20}]}
              keyboardType="numeric"
              inputMode="numeric"
              onChangeText={(text) => setSQFT(text)}
              value={sqft}
              textAlign="center"
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Bathrooms</Text>
            <NumericInput
              onChange={value => setBath(value)}
              value={bath}
              totalWidth={140}
              totalHeight={60}
              minValue={0}
              maxValue={10}
              rounded
              rightButtonBackgroundColor={'#F5f5f5'}
              leftButtonBackgroundColor={'#F5f5f5'}
            />
            <SwitchSelector
                options={[
                  {label: 'Standard', value: 's'},
                  {label: 'Premium', value: 'p'}
                ]}
                hasPadding
                style={{width: '30%'}}
                onPress={value => setSP(value)}
                initial={0}
                buttonColor={'#fff700'}
                selectedColor={'black'}
              />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Electrical</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={elec ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setElec}
              value={elec}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Plumbing</Text>
            <Text style={styles.factorSubTitle}>bathroom</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={bathPlum ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setBathPlum}
              value={bathPlum}
            />
            <Text style={styles.factorSubTitle}>kitchen</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={kitch ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setKitch}
              value={kitch}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Mini Splits</Text>
            <NumericInput
              onChange={value => setMiniSplits(value)}
              value={miniSplits}
              totalWidth={140}
              totalHeight={60}
              minValue={0}
              maxValue={6}
              rounded
              rightButtonBackgroundColor={'#F5f5f5'}
              leftButtonBackgroundColor={'#F5f5f5'}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Labor (Days)</Text>
            <NumericInput
              onChange={value => setLabor(value)}
              value={labor}
              totalWidth={140}
              totalHeight={60}
              minValue={0}
              maxValue={70}
              rounded
              rightButtonBackgroundColor={'#F5f5f5'}
              leftButtonBackgroundColor={'#F5f5f5'}
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