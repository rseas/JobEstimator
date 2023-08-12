import React, {useEffect, useState} from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import NumericInput from 'react-native-numeric-input';
import SwitchSelector from "react-native-switch-selector";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";

const Bathroom = () => {
  const [total, setTotal] = useState(0);
  const [sqft, setSQFT] = useState(0);
  const [lnft, setLNFT] = useState(0);
  const [ceilingHeight, setCeilingHeight] = useState(0);
  const [lvp, setLVP] = useState(0);
  const [tile, setTile] = useState('12x12');
  const [painting, setPainting] = useState(true);
  const [tubShower, setTubShower] = useState('Tub');
  const [toilets, setToilets] = useState(0);
  const [mirrors, setMirrors] = useState(0);
  const [vanity, setVanity] = useState('18"');
  const [vLights, setVLights] = useState(1);
  const [toiletries, setToiletries] = useState(false);
  const [fan, setFan] = useState(false);
  const [doors, setDoors] = useState('');
  const [newDoor, setNewDoor] = useState(false);
  const [windows, setWindows] = useState(0);
  const [trim, setTrim] = useState('3 1/4');
  const [casing, setCasing] = useState(0)

  const calcTotal = () => {
    setTotal(100);
  }
    return (
      <KeyboardAwareScrollView>
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
              <Text style={styles.factorTitle}>Ceiling Height</Text>
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
              <Text style={styles.factorTitle}>LVP Grade</Text>
              <SwitchSelector
                options={[
                  {label: '1', value: '1'},
                  {label: '2', value: '2'},
                  {label: '3', value: '3'}
                ]}
                hasPadding
                style={{width: '50%'}}
                onPress={value => setLVP(value)}
                initial={0}
                buttonColor={'#fff700'}
                selectedColor={'black'}
              />
            </View>
            <View style={styles.factor}>
              <Text style={styles.factorTitle}>Tile</Text>
              <SwitchSelector
                options={[
                  {label: '12x12', value: '12x12'},
                  {label: '24x24', value: '24x24'},
                  {label: '12x24', value: '12x24'},
                  {label: '6x48', value: '6x48'}

                ]}
                hasPadding
                style={{width: '50%'}}
                onPress={value => setTile(value)}
                initial={0}
                buttonColor={'#fff700'}
                selectedColor={'black'}
              />
            </View>
            <View style={styles.factor}>
              <Text style={styles.factorTitle}>Tub or Shower</Text>
              <SwitchSelector
                options={[
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
              <Text style={styles.factorTitle}>Toilets</Text>
              <NumericInput
                onChange={value => setToilets(value)}
                value={toilets}
                totalWidth={120}
                totalHeight={50}
                minValue={0}
                maxValue={5}
              />
            </View>
            <View style={styles.factor}>
              <Text style={styles.factorTitle}>Mirrors</Text>
              <NumericInput
                onChange={value => setMirrors(value)}
                value={mirrors}
                totalWidth={120}
                totalHeight={50}
                minValue={0}
                maxValue={5}
              />
            </View>
            <View style={styles.factor}>
              <Text style={styles.factorTitle}>Vanity Size</Text>
              <SwitchSelector
                options={[
                  {label: '18"', value: '18"'},
                  {label: '24"', value: '24"'},
                  {label: '32"', value: '32"'},
                  {label: '48"', value: '48"'},
                  {label: '72"', value: '72"'}

                ]}
                hasPadding
                style={{width: '50%'}}
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
              
            </View>
            <View style={styles.factor}>
              <Text style={styles.factorTitle}>Exhaust Fan</Text>
              <SwitchSelector
                options={[
                  {label: "No", value: false},
                  {label: 'Yes', value: true}
                ]}
                hasPadding
                style={{width: '30%'}}
                onPress={value => setFan(value)}
                initial={0}
                buttonColor={'#fff700'}
                selectedColor={'black'}
              />
            </View>
            <View style={styles.factor}>
              <Text style={styles.factorTitle}>Doors</Text>
              <NumericInput
                onChange={value => setDoors(value)}
                value={doors}
                totalWidth={120}
                totalHeight={50}
                minValue={0}
                maxValue={5}
              />
              <SwitchSelector
                options={[
                  {label: "Old door", value: false},
                  {label: 'New Door', value: true}
                ]}
                hasPadding
                style={{width: '30%'}}
                onPress={value => setNewDoor(value)}
                initial={0}
                buttonColor={'#fff700'}
                selectedColor={'black'}
              />
            </View>
            <View style={styles.factor}>
              <Text style={styles.factorTitle}>Windows (Retrim)</Text>
              <NumericInput
                onChange={value => setWindows(value)}
                value={windows}
                totalWidth={120}
                totalHeight={50}
                minValue={0}
                maxValue={5}
              />
            </View>
            <View style={styles.factor}>
              <Text style={styles.factorTitle}>Trim Base</Text>
              <SwitchSelector
                options={[
                  {label: "3 1/4", value: false},
                  {label: '5 1/4', value: true}
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
                totalWidth={120}
                totalHeight={50}
                minValue={0}
                maxValue={5}
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
      </KeyboardAwareScrollView>
    );
};


export default Bathroom;