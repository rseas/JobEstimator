import React, {useEffect, useState} from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import NumericInput from 'react-native-numeric-input';
import SwitchSelector from "react-native-switch-selector";
import styles from "./styles";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Deck = () => {
    const [total, setTotal] = useState(0.0);
    const [sqft, setSQFT] = useState('0');
    const [mat, setMat] = useState('Wood');
    const [footers, setFooters] = useState(0);
    const [railing, setRailing] = useState('Wood');
    const [numRailing, setNumRailing] = useState(0);
    const [misc, setMisc] = useState(0);
    const [resetCounter, setResetCounter] = useState(0);

    const calcTotal = () => {
      let ret = 0;
      squareFeet = parseFloat(sqft);

      ret += 16.50*squareFeet;
      ret += 275*footers;
      
      if(mat == 'Wood'){
        ret += 10*squareFeet;
      } else if(mat == 'Composite') {
        ret += 24*squareFeet;
      }

      if(numRailing != 0){
        if(railing == 'Wood'){
          ret += numRailing * 310; 
        } else if (railing == 'Composite'){
          ret += numRailing * 490;
        }
      }

      ret += misc;

      setTotal(ret);
    }

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

      let date = new Date();
      let dateString = date.getMonth() + '/' + date.getDate() + '/' +date.getFullYear();
      let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      const html = `
      <html>
      <head>
          <style>
              h1{
                font-size: 23px;
              }
              h2{
                font-size: 16px;
                margin-bottom: 5px;
                border-bottom: 2px solid #333;
              }
              h4 {
                margin-bottom: 0px;
                font-size: 14px;
              }
              h5{
                font-size: 12px;
                margin-bottom: 0px;
              }
              body {
                margin: 40px;
              }
              .columns-wrapper {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
              }
              .column {
                padding: 0px;
              }
          </style>
      </head>
      
      <body>
          <h1 style="font-weight: bold; ">${address}</h1>
          <h1 style="color: #747474; ">${daysOfWeek[date.getDay()]}, ${dateString}</h1>
          <h2>ESTIMATED TOTAL :: $${total}</h2>
          <br>
          <h3>Square Footage: ${sqft}</h3>
          <h3>Number of footers: ${footers}</h3>
          <h3>Material Type: ${mat}</h3>
          <h3>Railings: ${numRailing}, ${railing}</h3>
          <h3>Misc add-ons: $${misc}</h3>
          <br>
          <h4 style="border-top: 2px solid #333; margin-top: 10px;">-- CALCULATIONS --</h4>
                  <h5>(16.50 * SQFT) + (275 * Number of footers) + (Misc) + {Material Type} + {Railings}</h5>
          <div class="column-wrapper">
              <div class="column">
                  <h5>
                      &emsp; Material Type :: <br>
                      &emsp; &emsp;  Wood => 10 * SQFT <br>
                      &emsp; &emsp; Composite => 24 * SQFT
                  </h5>
              </div>
              <div class = "column">
                  <h5>
                      &emsp; Railings :: <br>
                      &emsp; &emsp;  Wood => 310 * numRailings <br>
                      &emsp; &emsp; Composite => 490 * numRailings
                  </h5>
              </div>
          </div>
          
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

    const reset = () => {
      setResetCounter(resetCounter + 1);
      setSQFT('0');
      setFooters(0);
      setMat('Wood');
      setNumRailing(0);
      setRailing('Wood');
      setMisc(0);
      setTotal(0);
    };

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
              totalWidth={140}
              totalHeight={60}
              minValue={0}
              maxValue={50}
              rounded
              rightButtonBackgroundColor={'#F5f5f5'}
              leftButtonBackgroundColor={'#F5f5f5'}
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
            <Text style={styles.factorTitle}>Railing</Text>
            <NumericInput
              onChange={value => setNumRailing(value)}
              value={numRailing}
              totalWidth={160}
              totalHeight={60}
              minValue={0}
              maxValue={20}
              rounded
              rightButtonBackgroundColor={'#F5f5f5'}
              leftButtonBackgroundColor={'#F5f5f5'}
            />
            <SwitchSelector
                options={[
                  {label: 'Wood', value: 'Wood'},
                  {label: 'Composite', value: 'Composite'}
                ]}
                hasPadding
                style={{width: '30%'}}
                onPress={value => setRailing(value)}
                initial={0}
                buttonColor={'#fff700'}
                selectedColor={'black'}
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

export default Deck;