import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    homeBackground: {
      backgroundColor: "#EEAA53",
    },
    homeTitle: {
      textAlign: 'center',
      fontSize: 48,
      paddingTop: 120,
      paddingBottom: 110,
      color: "#FFFFFF"
    },
    newItTitle: {
        backgroundColor: "#AAAAFF",
        textAlign: 'center',
        fontSize: 36,
        paddingTop: 30,
    },
    buttonBackground: {
      backgroundColor: "#AAAAFF",
      paddingTop: 55,
    },
    bodyFiller: {
      backgroundColor: "#AAAAFF",
      padding: 200,
    },
    textBoxTitle: {
        backgroundColor: "#AAAAFF",
        fontSize: 18,
        textAlign: 'left',
        paddingLeft: 30,
        paddingTop: 7,
    },
    flex: {
        flexDirection: 'row',
        backgroundColor: "#AAAAFF",
        justifyContent: 'space-between',
        paddingRight: 20,
        paddingVertical: 20
    },
    textBox: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 3.5, 
        width: 200, 
        marginLeft: 30, 
        backgroundColor: "#FFFFFF",
        fontSize: 15,
        paddingTop: 10
    },
    destinationName: {
        fontSize: 26,
        paddingLeft: 20,
    },
    destinationAdd: {
        fontSize: 16,
        paddingLeft: 35,
    },
    destinationHeader: {
        fontSize: 36,
    },
    destinationView: {
        backgroundColor: "#AAAAFF",
        paddingHorizontal: 10,
        paddingVertical: 10
    }
  });