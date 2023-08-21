import { StyleSheet } from "react-native";

export default StyleSheet.create({
    screen: {
        backgroundColor: '#fff',
        alignItems: 'center',
      },
      factorList: {
        width: '90%',
        justifyContent: 'space-between',
        marginLeft: '5%',
        marginRight: '5%'
      },
      factor: {
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      factorHeader: {
        
      },
      factorTitle: {
        fontSize: 30,
        fontFamily: 'Copperplate',
        textTransform: 'uppercase',
      },
      factorSubTitle: {
        fontSize: 30,
        fontFamily: 'Copperplate',
        color: '#565656',
        textTransform: 'lowercase'
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
        borderRadius: 10,
        backgroundColor: '#03c04a',
        alignItems: 'center', 
        width: '40%',
        height: 60,
        justifyContent: 'center',
        margin: 30,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 2, width: 1 }, 
        shadowOpacity: 1, 
        shadowRadius: 1
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
        marginBottom: 40
      },
      totalText: {
        fontSize: 40,
        fontFamily: 'Helvetica-Bold',
        color: '#808080'
      },
      totalNum: {
        fontSize: 60,
        fontWeight: "bold"
      }
})