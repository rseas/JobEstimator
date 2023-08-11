import { StyleSheet } from "react-native";

export default StyleSheet.create({
    screen: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25,
      },
      factorList: {
    
      },
      factor: {
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      factorTitle: {
        fontSize: 30,
        fontFamily: 'Copperplate'
      },
      input: {
        height: 50,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        borderColor: '#d3d3d3',
        borderWidth: 1,
      },
      numInput: {
        borderRadius: 5,
      },
      calculate: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#03c04a',
        alignItems: 'center', 
        width: 210,
        height: 60,
        justifyContent: 'center',
        margin: 30
      },
      calcText: {
        fontFamily: 'Copperplate',
        fontSize: 30,
        fontWeight: '900',
        color: 'white'
      },
      totalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60,
        padding: 20
      },
      totalText: {
        fontSize: 40,
        fontFamily: 'Copperplate',
        color: '#808080'
      },
      totalNum: {
        fontSize: 60,
        fontWeight: "bold"
      }
})