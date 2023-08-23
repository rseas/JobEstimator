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
            <h3>Number of footers: ${footers}</h3>
            <h3>Material Type: ${mat}</h3>
            <h3>Railings: ${numRailing}, ${railing}</h3>
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
        <TouchableOpacity onPress={calcTotal} style={styles.calculate}>
          <Text style={styles.calcText}>CALCULATE</Text>
        </TouchableOpacity>
        <View style={styles.totalContainer}>
            <Text style={styles.totalText}>ESTIMATE: </Text>
            <Text style={styles.totalNum}>${total}</Text>
        </View>
        <TouchableOpacity onPress={prompt} style={styles.exportButton}>
          <Text style={styles.exportText}>Export to PDF </Text>
          <MaterialCommunityIcons name="export-variant" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    );
};

export default Deck;