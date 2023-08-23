import React, {useEffect, useState} from "react";
import { Text, View, TextInput, TouchableOpacity, Switch, Alert } from "react-native";
import NumericInput from 'react-native-numeric-input';
import SwitchSelector from "react-native-switch-selector";
import styles from "./styles";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Addition = () => {

    const [total, setTotal] = useState(0.0);
    const [sqft, setSQFT] = useState('0');
    const [bath, setBath] = useState(0);
    const [sp, setSP] = useState('s')
    const [elec, setElec] = useState(false);
    const [bathPlum, setBathPlum] = useState(false)
    const [kitch, setKitch] = useState(false);
    const [miniSplits, setMiniSplits] = useState(0);
    const [labor, setLabor] = useState(0);
    const [misc, setMisc] = useState(0);
    const [resetCounter, setResetCounter] = useState(0);

    const prompt = async () => {
      return new Promise((resolve, reject) => {
        let address = '';
        Alert.prompt(
          "Enter Address",
          "Enter the address corresponding to this estimate:",
          [
            {
              text: "Cancel",
              onPress: () => {return;},
            },
            {
              text: "Export",
              onPress: t => {
                address = t;
                exportPdf(address);
              }
            }
          ],
        );
      })
    }

    const exportPdf = async (address) => {
      let bathSP = '';
      if(sp == 's'){
        bathSP = 'Standard';
      } else {
        bathSP = 'Premium';
      }

      const yesno = (input) => {
        if(input){
          return "Yes";
        } else {
          return "No";
        }
      }

      let date = new Date();
      let dateString = date.getMonth() + '/' + date.getDate() + '/' +date.getFullYear();
      let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      const html = `
        <html>
        <head>
        <style>
          body {
            margin: 40px;
          }
        </style>
        </head>
          <body>
            <h1 style="font-weight: bold; ">${address}</h1>
            <h1 style="color: #747474; ">${daysOfWeek[date.getDay()]}, ${dateString}</h1>
            <h2>ESTIMATED TOTAL :: $${total}</h2>
            <br>
            <h3>Square Footage: ${sqft}</h3>
            <h3>Bathrooms: ${bath}, ${bathSP}</h3>
            <h3>Electrical: ${yesno(elec)}</h3>
            <h3>Plumbing::: Bathroom: ${yesno(bathPlum)}  Kitchen: ${yesno(kitch)}</h3>
            <h3>Mini Splits: ${miniSplits}</h3>
            <h3>Labor: ${labor} days</h3>
            <h3>Misc add-ons: $${misc}</h3>
          </body>
        </html>
      
      `;

      const file = await Print.printToFileAsync({
        html: html,
        base64: false
      });

      const pdfName = `${file.uri.slice(
        0,
        file.uri.lastIndexOf('/') + 1
      )}addition-${address.replace(/\s/g, '_' )}.pdf`

      await FileSystem.moveAsync({
          from: file.uri,
          to: pdfName,
      })

      Sharing.shareAsync(pdfName);
    }

    const calcTotal = () => {
      let ret = 0;
      squareFeet = parseFloat(sqft);
      let base = 175;

      if(elec){ base += 12;}
      
      ret += base*squareFeet;

      if(bath!=0){
        if(sp == 's'){
          ret += bath*13000;
        } else if (sp =='p'){
          ret += bath*17000;
        }
      }
      if(bathPlum){ ret += 7000; }
      if(kitch){ ret += 3000; }

      ret += (miniSplits*7000);
      ret += (labor*1600);
      ret+= misc;

      setTotal(ret)
    }

    const reset = () => {
      setResetCounter(resetCounter + 1);
      setTotal(0.0);
      setSQFT('0');
      setBath(0);
      setSP('s')
      setElec(false);
      setBathPlum(false)
      setKitch(false);
      setMiniSplits(0);
      setLabor(0);
      setMisc(0);
    }

    return (
      <View key={resetCounter} style={styles.screen}>
        <View style={styles.resetContainer}>
          <TouchableOpacity onPress={reset} style={styles.resetButton}>
            <MaterialCommunityIcons name="refresh" size={45} color="#3790F3" />
          </TouchableOpacity>
        </View>
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
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Misc Add-Ons ($)</Text>
            <NumericInput
              onChange={value => setMisc(value)}
              value={misc}
              totalWidth={200}
              totalHeight={60}
              minValue={0}
              maxValue={10000}
              step={10}
              rounded
              rightButtonBackgroundColor={'#F5f5f5'}
              leftButtonBackgroundColor={'#F5f5f5'}
            />
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={calcTotal} style={styles.calculate}>
            <Text style={styles.calcText}>CALCULATE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>ESTIMATE: </Text>
          <Text style={styles.totalNum}>${total}</Text>
        </View>
        <View style={styles.exportButtonContainer}>
          <TouchableOpacity onPress={prompt} style={styles.exportButton}>
            <Text style={styles.exportText}>Export to PDF </Text>
            <MaterialCommunityIcons name="export-variant" size={24} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
    );
};

export default Addition;