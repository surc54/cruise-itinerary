import React from "react";
import {
    Alert,
    Button,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View,
} from "react-native";
import axios from "./axios";

const Calendar = props => {
    const [data, setData] = React.useState([]);
    const [arriveTime, setArriveTime] = React.useState(null);
    const [leaveTime, setLeaveTime] = React.useState(null);
    const [destination, setDestination] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    let {
        // data = [],
        // arriveTime = new Date(),
        // leaveTime = new Date(),
        iterId = 0,
        latest = false,
        // destination = "Unknown",
    } = props.location.state;

    React.useEffect(() => {
        if (latest) {
            axios.get("/itinerary/latest").then(res => {
                iterId = res.data.id;

                axios
                    .get("/itinerary/details", {
                        params: {
                            itineraryId: iterId,
                        },
                    })
                    .then(res => {
                        console.log("resr", res.data);
                        setDestination(res.data.destination);
                        setArriveTime(res.data.arrival_time);
                        setLeaveTime(res.data.departure_time);
                    });

                axios
                    .get("/stops", {
                        params: {
                            itineraryId: iterId,
                        },
                    })
                    .then(res => {
                        console.log("data: ", res.data);
                        setData(res.data);
                    });
            });
        } else {
            axios
                .get("/itinerary/details", {
                    params: {
                        itineraryId: iterId,
                    },
                })
                .then(res => {
                    console.log("resr", res.data);
                    setDestination(res.data.destination);
                    setArriveTime(res.data.arrival_time);
                    setLeaveTime(res.data.departure_time);
                });

            axios
                .get("/stops", {
                    params: {
                        itineraryId: iterId,
                    },
                })
                .then(res => {
                    console.log("data: ", res.data);
                    setData(res.data);
                });
        }
    }, [iterId]);

    // const data = [

    // ];

    return (
        <>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.titleText}>Calendar View</Text>
                {/* <Text style={styles.itineraryNum}>Itinerary #{iterId}</Text> */}
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
                        <Text>{arriveTime}</Text>
                    </View>
                </View>
                {data.map(({id, name, address, startTime: s, endTime: e}) => {
                    // const s = new Date(startTime);
                    // const e = new Date(endTime);

                    return (
                        <TouchableNativeFeedback
                            key={name + address + s + e}
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
                                            onPress: () => {
                                                axios
                                                    .delete(`/stops/${id}`)
                                                    .then(() => {
                                                        axios
                                                            .get("/stops", {
                                                                params: {
                                                                    itineraryId: iterId,
                                                                },
                                                            })
                                                            .then(res => {
                                                                console.log(
                                                                    "data: ",
                                                                    res.data,
                                                                );
                                                                setData(
                                                                    res.data,
                                                                );
                                                            });
                                                        props.history.push("/");
                                                    });
                                            },
                                        },
                                    ],
                                )
                            }>
                            <View style={styles.calendarItemContainer}>
                                <View>
                                    <Text style={styles.cicName}>{name}</Text>
                                    <Text style={{fontSize: 10}}>
                                        {address}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.timeString}>{s}</Text>
                                    <Text style={styles.timeString}>{e}</Text>
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
                        <Text>{leaveTime}</Text>
                    </View>
                </View>

                <Button
                    title="Add more"
                    onPress={() => {
                        // props.history.push("/destinations", {iterId: iterId});
                        props.history.goBack();
                        if (props.history.canGo(1)) {
                            props.history.goBack();
                        }
                    }}
                />
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
