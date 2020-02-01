import React from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
    Alert,
} from "react-native";

const Calendar = props => {
    const {
        data = [],
        arriveTime = new Date(),
        leaveTime = new Date(),
        itineraryNum = 0,
        destination = "Unknown",
    } = props.location.state;
    console.log(props);

    // const data = [

    // ];

    return (
        <>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.titleText}>Calendar View</Text>
                <Text style={styles.itineraryNum}>
                    Itinerary #{itineraryNum}
                </Text>
            </View>
            <ScrollView style={styles.mainView}>
                <View
                    style={{
                        ...styles.calendarItemContainer,
                        ...styles.calendarHeaderItemContainer,
                    }}>
                    <View>
                        <Text style={styles.cicName}>
                            Arrive at {destination}
                        </Text>
                    </View>
                    <View>
                        <Text>{getTimeString(arriveTime)}</Text>
                    </View>
                </View>
                {data.map(({name, address, startTime, endTime}) => {
                    const s = new Date(startTime);
                    const e = new Date(endTime);

                    return (
                        <TouchableNativeFeedback
                            key={name + address + startTime + endTime}
                            style={styles.calendarItemContainerWrapper}
                            onPress={() =>
                                Alert.alert(
                                    "Delete event",
                                    "Are you sure you want to delete this event?",
                                    [
                                        {
                                            text: "No",
                                            onPress: () =>
                                                console.log("nevermind!!"),
                                            style: "cancel",
                                        },
                                        {
                                            text: "Yes",
                                            onPress: () =>
                                                console.log("deleted!!"),
                                        },
                                    ],
                                )
                            }>
                            <View style={styles.calendarItemContainer}>
                                <View>
                                    <Text style={styles.cicName}>{name}</Text>
                                    <Text>{address}</Text>
                                </View>
                                <View>
                                    <Text style={styles.timeString}>
                                        {getTimeString(s)}
                                    </Text>
                                    <Text style={styles.timeString}>
                                        {getTimeString(e)}
                                    </Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    );
                })}

                <View
                    style={{
                        ...styles.calendarItemContainer,
                        ...styles.calendarHeaderItemContainer,
                    }}>
                    <View>
                        <Text style={styles.cicName}>
                            Leaving {destination}
                        </Text>
                    </View>
                    <View>
                        <Text>{getTimeString(leaveTime)}</Text>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

const getTimeString = (/** @type {Date} */ input) => {
    let h;
    if (input.getHours() > 12) {
        h = input.getHours() - 12;
    } else if (input.getHours() == 0) {
        h = 12;
    } else {
        h = input.getHours();
    }

    return (
        String(h).padStart(2, "0") +
        ":" +
        String(input.getMinutes()).padStart(2, "0") +
        " " +
        (input.getHours() >= 12 ? "PM" : "AM")
    );
};

const styles = StyleSheet.create({
    mainView: {
        height: "100%",
        paddingHorizontal: 14,
        paddingVertical: 12,
        backgroundColor: "#f2f2f2",
    },
    header: {
        paddingHorizontal: 14,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 64,
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 24,
    },
    itineraryNum: {
        fontSize: 16,
        fontWeight: "300",
    },
    calendarItemContainer: {
        backgroundColor: "#d4e0fa",
        paddingHorizontal: 14,
        paddingVertical: 16,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
        overflow: "hidden",
    },
    calendarItemContainerWrapper: {
        borderRadius: 5,
        overflow: "hidden",
    },
    cicName: {
        fontWeight: "700",
        fontSize: 18,
    },
    calendarHeaderItemContainer: {
        backgroundColor: "#cfcfcf",
        marginBottom: 12,
    },
    timeString: {
        color: "#888888",
    },
});

export default Calendar;
