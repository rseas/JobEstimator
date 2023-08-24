import React, {useState} from "react";
import { TextInputField, NumInputField } from './../components';
import { Text, View, TextInput, TouchableOpacity, Switch, Alert } from "react-native";
import NumericInput from 'react-native-numeric-input';
import SwitchSelector from "react-native-switch-selector";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Bathroom = () => {
  const [total, setTotal] = useState(0.0);
  const [sqft, setSQFT] = useState('0');
  const [lnft, setLNFT] = useState('0');
  const [ceilingHeight, setCeilingHeight] = useState('0');
  const [lvp, setLVP] = useState(false);
  const [tile, setTile] = useState(false);
  const [tubShower, setTubShower] = useState('N/A');
  const [toilets, setToilets] = useState(0);
  const [mirrors, setMirrors] = useState(0);
  const [vanity, setVanity] = useState('N/A');
  const [vLights, setVLights] = useState('N/A');
  const [toiletries, setToiletries] = useState(false);
  const [fan, setFan] = useState(false);
  const [doors, setDoors] = useState(0);
  const [windows, setWindows] = useState(0);
  const [trim, setTrim] = useState('N/A');
  const [casing, setCasing] = useState(0);
  const [labor, setLabor] = useState(0);
  const [showerDoor, setShowerDoor] = useState(false);
  const [electrical, setElectrical] = useState(false);
  const [plumbing, setPlumbing] = useState(false);
  const [painting, setPainting] = useState(false);
  const [misc, setMisc] = useState(0);
  const [resetCounter, setResetCounter] = useState(0);

  const calcTotal = () => {
    let ret = 0;
    squareFeet = parseFloat(sqft);
    linearFeet = parseFloat(lnft);
    ceilingHeightNum = parseFloat(ceilingHeight);

    if(lvp){
      ret += 4.80*squareFeet;
    }

    if(tile){
      ret += 12*squareFeet;
    }

    if(tubShower == 'Tub'){
      ret += 1500;
    } else if (tubShower == 'Shower'){
      ret += 1500;
    }

    if(showerDoor){
      ret += 1500;
    }

    ret += 280*toilets;
    ret += 130*mirrors;

    switch(vanity){
      case '18"':
        ret += 300;
        break;
      case '24"':
        ret += 400;
        break;
      case '32"':
        ret += 500;
        break;
      case '48"':
        ret += 700;
        break;
      case '72"':
        ret += 2000;
        break;
      default:
        
    }

    switch(vLights){
      case '1':
        ret += 70;
        break;
      case '2':
        ret += 100;
        break;
      case '3':
        ret += 120;
        break;
      case '4':
        ret += 160;
        break;
      default:

    }

    if(toiletries){
      ret += 110;
    }
    if(fan){
      ret += 160;
    }
    
    ret += 250*doors;

    ret += 110*windows;

    if(trim == '3 1/4'){
      ret += 1.75*linearFeet;
    } else if(trim == '5 1/4'){
      ret += 3.40*linearFeet;
    }

    ret += 60*casing;

    if(electrical){
      ret += 1500;
    }
    if(plumbing) {
      ret += 2500;
    }
    if(painting){
      ret += 4*ceilingHeight;
    }

    ret += labor*1600;
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
        .grid-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr); /* Three columns with equal width */
          gap: 5px; /* Gap between columns */
        }
        
        .columnCalc {
          padding: 10px;
        }
      </style>
      </head>
        <body>
          <h1 style="font-weight: bold; ">${address}</h1>
          <h1 style="color: #747474; ">${daysOfWeek[date.getDay()]}, ${dateString}</h1>
          <h2>ESTIMATED TOTAL :: $${total}</h2>
          <div class="columns-wrapper">
            <div class="column">
              <h4>Square Footage: ${sqft}</h4>
              <h4>Linear Footage: ${lnft}</h4>
              <h4>Ceiling Height: ${ceilingHeight} in.</h4>
              <h4>LVP: ${yesno(lvp)}</h4>
              <h4>Tile: ${yesno(tile)}</h4>
              <h4>Tub/Shower: ${tubShower}</h4>
              <h4>Shower Door: ${yesno(showerDoor)}</h4>
              <h4>Toilets: ${toilets}</h4>
              <h4>Mirrors: ${mirrors}</h4>
              <h4>Vanity Size: ${vanity}</h4>
              <h4>Vanity Lights: ${vLights}</h4>
            </div>
            <div class="column">
              <h4>Toiletries: ${yesno(toiletries)}</h4>
              <h4>Exhaust Fan: ${yesno(fan)}</h4>
              <h4>Doors: ${doors}</h4>
              <h4>Windows (Retrim): ${windows}</h4>
              <h4>Trim Base: ${trim}</h4>
              <h4>Casing Packs: ${casing}</h4>
              <h4>Electrical: ${yesno(electrical)}$</h4>
              <h4>Plumbing: ${yesno(plumbing)}</h4>
              <h4>Painting: ${yesno(painting)}</h4>
              <h4>Labor: ${labor}</h4>
              <h4>Misc add-ons: $${misc}</h4>
            </div>
          </div>
          <h4 style="border-top: 2px solid #333; margin-top: 10px;">-- CALCULATIONS --</h4>
          <h5>{LVP} + {Tile} + {TubShower} + {ShowerDoor} + (280 * toilets) + (130 * mirrors) + {Vanity} + {VanityLights} +<br>&emsp; {Toiletries} + {Fan} + {Trim} + {Electrical} + {Plumbing} + {Painting} + (250 * doors) + (110 * windows) +<br>&emsp; (60 * casing) + (1600 * labor) + (Misc)</h5>
        <div class="grid-container">
          <div class="columnCalc">
              <h5>
                  &emsp; LVP :: <br>
                  &emsp; &emsp;  True => $4.80 * SQFT<br>
              </h5>
              <h5>
                  &emsp; Tile :: <br>
                  &emsp; &emsp;  True => $12 * SQFT<br>
              </h5>
              <h5>
                  &emsp; TubShower :: <br>
                  &emsp; &emsp;  Tub => + $1500<br>
                  &emsp; &emsp; Shower => + $1500
              </h5>
              <h5>
                  &emsp; ShowerDoor :: <br>
                  &emsp; &emsp;  True => + $1500<br>
              </h5>
              <h5>
                  &emsp; Fan :: <br>
                  &emsp; &emsp;  True => + $160<br>
              </h5>
          </div>
          <div class = "columnCalc">
              <h5>
                  &emsp; Vanity :: <br>
                  &emsp; &emsp;  18" => + $300<br>
                  &emsp; &emsp; 24" => + $400<br>
                  &emsp; &emsp;  32" => + $500<br>
                  &emsp; &emsp; 48" => + $700<br>
                  &emsp; &emsp;  72" => + $2000<br>
                  &emsp; &emsp; N/A => + $0<br>
              </h5>
              <h5>
                  &emsp; Vanity Lights :: <br>
                  &emsp; &emsp;  1 => + $70<br>
                  &emsp; &emsp; 2 => + $100<br>
                  &emsp; &emsp;  3 => + $120<br>
                  &emsp; &emsp; 4 => + $160<br>
                  &emsp; &emsp;  N/A => + $0<br>
              </h5>
          </div>
          <div class="columnCalc">
              <h5>
                  &emsp; Trim :: <br>
                  &emsp; &emsp;  3 1/4 => + $1.75 * LNFT<br>
                  &emsp; &emsp; 5 1/4 => + $3.40 * LNFT
              </h5>
              <h5>
                  &emsp; Toiletries :: <br>
                  &emsp; &emsp;  True => + $110 <br>
              </h5>
              <h5>
                  &emsp; Electrical :: <br>
                  &emsp; &emsp;  True => + $1500<br>
              </h5>
              <h5>
                  &emsp; Plumbing :: <br>
                  &emsp; &emsp;  True => + $2500<br>
              </h5>
              <h5>
                  &emsp; Painting :: <br>
                  &emsp; &emsp;  True => + $4 * CeilingHeight<br>
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
    setTotal(0.0);
    setSQFT('0');
    setLNFT('0');
    setCeilingHeight('0');
    setLVP(false);
    setTile(false);
    setTubShower('N/A');
    setToilets(0);
    setMirrors(0);
    setVanity('N/A');
    setVLights('N/A');
    setToiletries(false);
    setFan(false);
    setDoors(0);
    setWindows(0);
    setTrim('N/A');
    setCasing(0);
    setLabor(0);
    setShowerDoor(false);
    setElectrical(false);
    setPlumbing(false);
    setPainting(false);
    setMisc(0);
  }

  return (
    <KeyboardAwareScrollView key={resetCounter}>
      <View style={styles.screen}>
        <View style={styles.resetContainer}>
          <TouchableOpacity onPress={reset} style={styles.resetButton}>
            <MaterialCommunityIcons name="refresh" size={45} color="#3790F3" />
          </TouchableOpacity>
        </View>
        <View style={styles.factorList}>
          <TextInputField   title="Square Footage" set={setSQFT} value={sqft}  />
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Linear Footage</Text>
            <TextInput
              style={[styles.input, {width: '20%', fontSize: 20}]}
              keyboardType="numeric"
              inputMode="numeric"
              onChangeText={(text) => setLNFT(text)}
              value={lnft}
              textAlign="center"
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Ceiling Height (inches)</Text>
            <TextInput
              style={[styles.input, {width: '20%', fontSize: 20}]}
              keyboardType="numeric"
              inputMode="numeric"
              onChangeText={(text) => setCeilingHeight(text)}
              value={ceilingHeight}
              textAlign="center"
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>LVP</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={lvp ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setLVP}
              value={lvp}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Tile</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={tile ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setTile}
              value={tile}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Tub or Shower</Text>
            <SwitchSelector
              options={[
                {label: 'N/A', value: 'N/A'},
                {label: 'Tub', value: 'Tub'},
                {label: 'Shower', value: 'Shower'}
              ]}
              hasPadding
              style={{width: '30%'}}
              onPress={value => setTubShower(value)}
              initial={0}
              buttonColor={'#fff700'}
              selectedColor={'black'}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Shower Door</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={showerDoor ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setShowerDoor}
              value={showerDoor}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Toilets</Text>
            <NumericInput
              onChange={value => setToilets(value)}
              value={toilets}
              totalWidth={140}
              totalHeight={60}
              minValue={0}
              maxValue={5}
              rounded
              rightButtonBackgroundColor={'#F5f5f5'}
              leftButtonBackgroundColor={'#F5f5f5'}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Mirrors</Text>
            <NumericInput
              onChange={value => setMirrors(value)}
              value={mirrors}
              totalWidth={140}
              totalHeight={60}
              minValue={0}
              maxValue={3}
              rounded
              rightButtonBackgroundColor={'#F5f5f5'}
              leftButtonBackgroundColor={'#F5f5f5'}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Vanity Size</Text>
            <SwitchSelector
              options={[
                {label: 'N/A', value: 'N/A'},
                {label: '18"', value: '18"'},
                {label: '24"', value: '24"'},
                {label: '32"', value: '32"'},
                {label: '48"', value: '48"'},
                {label: '72"', value: '72"'}

              ]}
              hasPadding
              style={{width: '53%'}}
              onPress={value => setVanity(value)}
              initial={0}
              buttonColor={'#fff700'}
              selectedColor={'black'}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Vanity Lights</Text>
            <SwitchSelector
              options={[
                {label: 'N/A', value: 'N/A'},
                {label: '1', value: '1'},
                {label: '2', value: '2'},
                {label: '3', value: '3'},
                {label: '4', value: '4'}

              ]}
              hasPadding
              style={{width: '50%'}}
              onPress={value => setVLights(value)}
              initial={0}
              buttonColor={'#fff700'}
              selectedColor={'black'}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Toiletries</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={toiletries ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setToiletries}
              value={toiletries}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Exhaust Fan</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={fan ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setFan}
              value={fan}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Doors</Text>
            <NumericInput
              onChange={value => setDoors(value)}
              value={doors}
              totalWidth={140}
              totalHeight={60}
              minValue={0}
              maxValue={5}
              rounded
              rightButtonBackgroundColor={'#F5f5f5'}
              leftButtonBackgroundColor={'#F5f5f5'}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Windows (Retrim)</Text>
            <NumericInput
              onChange={value => setWindows(value)}
              value={windows}
              totalWidth={140}
              totalHeight={60}
              minValue={0}
              maxValue={5}
              rounded
              rightButtonBackgroundColor={'#F5f5f5'}
              leftButtonBackgroundColor={'#F5f5f5'}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Trim Base</Text>
            <SwitchSelector
              options={[
                {label: 'N/A', value: 'N/A'},
                {label: '3 1/4', value: '3 1/4'},
                {label: '5 1/4', value: '5 1/4'}
              ]}
              hasPadding
              style={{width: '30%'}}
              onPress={value => setTrim(value)}
              initial={0}
              buttonColor={'#fff700'}
              selectedColor={'black'}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Casing packs</Text>
            <NumericInput
              onChange={value => setCasing(value)}
              value={casing}
              totalWidth={140}
              totalHeight={60}
              minValue={0}
              maxValue={10}
              rounded
              rightButtonBackgroundColor={'#F5f5f5'}
              leftButtonBackgroundColor={'#F5f5f5'}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Electrical</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={electrical ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setElectrical}
              value={electrical}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Plumbing</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={plumbing ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setPlumbing}
              value={plumbing}
            />
          </View>
          <View style={styles.factor}>
            <Text style={styles.factorTitle}>Painting</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={painting ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setPainting}
              value={painting}
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
      <View style={{padding: 100}}></View>
    </KeyboardAwareScrollView>
  );
};


export default Bathroom;