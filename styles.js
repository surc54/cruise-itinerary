import {StyleSheet} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";

export default StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    homeBackground: {
        backgroundColor: "#F20018",
    },
    homeTitle: {
        textAlign: "center",
        fontSize: 48,
        paddingTop: 120,
        paddingBottom: 110,
        color: "#000000",
    },
    newItTitle: {
        backgroundColor: "#09367A",
        textAlign: "center",
        fontSize: 36,
        paddingTop: 20,
        paddingBottom: 20,
        color: '#FFFFFF',
        textDecorationLine: 'underline',
    },
    destinationTitle: {
        backgroundColor: "#09367A",
        textAlign: "center",
        fontSize: 36,
        paddingTop: 20,
        textDecorationLine: "underline",
    },
    buttonBackground: {
        backgroundColor: "#09367A",
        paddingTop: 35,
    },
    homeButtonBackground: {
        backgroundColor: "#09367A",
        paddingTop: 55,
    },
    bodyFiller: {
        backgroundColor: "#09367A",
        padding: 500,
    },
    textBoxTitle: {
        backgroundColor: "#09367A",
        fontSize: 18,
        textAlign: "left",
        paddingLeft: 30,
        paddingTop: 7,
        color: "#FFFFFF",
    },
    flex: {
        flexDirection: "row",
        backgroundColor: "#09367A",
        justifyContent: "space-between",
        paddingRight: 20,
        paddingVertical: 20,
    },
    textBox: {
        height: 40,
        borderColor: "gray",
        borderWidth: 3.5,
        width: 200,
        marginLeft: 30,
        backgroundColor: "#FFFFFF",
        fontSize: 15,
        paddingTop: 10,
        paddingLeft: 15,
    },
    destinationName: {
        fontSize: 26,
        paddingLeft: 10,
        backgroundColor: "#09367A",
        marginHorizontal: 5,
        color: "#FFFFFF",
    },
    destinationAdd: {
        fontSize: 16,
        paddingLeft: 5,
        backgroundColor: "#09367A",
        marginHorizontal: 5,
        paddingBottom: 5,
        color: "#FFFFFF",
    },
    destinationHeader: {
        fontSize: 36,
        color: "black",
        backgroundColor: "#F20018",
        borderRadius: 10,
        display: "flex",
        marginTop: 5,
    },
    destinationView: {
        backgroundColor: "#09367A",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    WYWG: {
        fontSize: 36,
        textAlign: "center",
        color: "#FFFFFF",
    },
    clickerTitle: {
        paddingBottom: 45,
        fontSize: 36,
        textAlign: "center",
        color: "#FFFFFF",
    },
    destinationGoBack: {
        backgroundColor: "#F20018",
        fontSize: 16,
        marginRight: 230,
        marginTop: 7,
        marginLeft: 15,
        textAlign: 'center',
        borderRadius: 10
    },
    newButton: {
        backgroundColor: "#F20018",
        textAlign: "center",
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: "center",
        height: 50,
        borderRadius: 6,
        marginHorizontal: 70,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: "100%",
        height: "100%"
    },
    homeButtonOne: {
        backgroundColor: "#09367A",
        position: 'absolute',
        top: 400,
        width: "100%"
    },
    homeButtonTwo: {
        backgroundColor: "#09367A",
        position: 'absolute',
        top: 500,
        width: "100%"
    }
});
