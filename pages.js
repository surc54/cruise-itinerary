import React, {Component} from "react";

import {
    Text,
    View,
    StatusBar,
    Image,
    FlatList,
    TouchableOpacity,
    ImageBackground,
} from "react-native";

import {Link} from "react-router-native";

import styles from "./styles.js";
import UselessTextInput from "./textInput.js";

import axios from "./axios";
import SavedItineraries from "./destination.js";

const debug = false;

var searchTerms = [
    "breakfast",
    "lunch",
    "dinner",
    "art",
    "music",
    "family",
    "shopping",
    "mall",
];

export class Home extends Component {
    render() {
        return (
            <>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#F2001800"
                    translucent
                />
                    <ImageBackground
                        style={ styles.backgroundImage }
                        source={require("./Logo.png")}
                         >
                <View style={styles.homeButtonOne}>
                    <TouchableOpacity
                        style={styles.newButton}
                        onPress={() =>
                            this.props.history.push("/new_itinerary")
                        }>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20,
                                textAlign: "center",
                            }}>
                            Create A New Itinerary
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.homeButtonTwo}>
                    <TouchableOpacity
                        style={styles.newButton}
                        onPress={() => this.props.history.push("/calendar")}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20,
                                textAlign: "center",
                            }}>
                            View Current Itinerary
                        </Text>
                    </TouchableOpacity>
                </View>
                </ImageBackground>
            </>
        );
    }
}

export class New_itinerary extends Component {
    state = {
        destination: debug ? "Miami" : "",
        arrivalTime: debug ? "12:00 am" : "",
        departureTime: debug ? "9:00 pm" : "",
    };
    render() {
        return (
            <>
                <StatusBar barStyle="light-content" backgroundColor="#09367A" />
                <View>
                    <Text style={styles.newItTitle}>
                        Create A New Itinerary
                    </Text>
                </View>
                <View style={styles.flex}>
                    <Text style={styles.textBoxTitle}>Destination:</Text>
                    <UselessTextInput
                        value={this.state.destination}
                        placeholder="City Name"
                        onChangeText={text =>
                            this.setState({destination: text})
                        }
                    />
                </View>
                <View style={styles.flex}>
                    <Text style={styles.textBoxTitle}>Arrival Time:</Text>
                    <UselessTextInput
                        value={this.state.arrivalTime}
                        placeholder="12:00 AM"
                        onChangeText={text =>
                            this.setState({arrivalTime: text})
                        }
                    />
                </View>
                <View style={styles.flex}>
                    <Text style={styles.textBoxTitle}>Departure Time:</Text>
                    <UselessTextInput
                        value={this.state.departureTime}
                        placeholder="12:00 PM"
                        onChangeText={text =>
                            this.setState({departureTime: text})
                        }
                    />
                </View>
                <View style={styles.buttonBackground}>
                    <SavedItineraries.Consumer>
                        {val => (
                            <TouchableOpacity
                                style={styles.newButton}
                                onPress={async () => {
                                    val.clear();

                                    axios
                                        .put("/itinerary", {
                                            destination: this.state.destination,
                                            arrivalTime: this.state.arrivalTime,
                                            departureTime: this.state
                                                .departureTime,
                                        })
                                        .then(res => {
                                            this.props.history.push(
                                                "/destinations",
                                                {iterId: res.data.itinerary.id},
                                            );
                                        });

                                    axios
                                        .get("/test/multi", {
                                            params: {
                                                array: searchTerms
                                                    .map(
                                                        x =>
                                                            x +
                                                            " places in " +
                                                            this.state
                                                                .destination,
                                                    )
                                                    .join(","),
                                            },
                                        })
                                        .then(response => {
                                            if (response.data.status != "ok") {
                                                console.error("error big no");
                                            } else {
                                                // console.log(response.data.data);
                                                response.data.data.forEach(x =>
                                                    val.add(x),
                                                );
                                            }
                                        })
                                        .catch(err => {
                                            console.error(
                                                "error big big no",
                                                err,
                                            );
                                        });
                                }}>
                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: 20,
                                        textAlign: "center",
                                    }}>
                                    Search and Create!
                                </Text>
                            </TouchableOpacity>
                        )}
                    </SavedItineraries.Consumer>
                </View>
                <View style={styles.buttonBackground}>
                    <TouchableOpacity
                        style={styles.newButton}
                        onPress={() =>
                            this.props.history.push("/calendar", {
                                latest: true,
                            })
                        }>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20,
                                textAlign: "center",
                            }}>
                            View Current Itinerary
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bodyFiller} />
            </>
        );
    }
}

export class Destinations extends Component {
    render() {
        const {iterId} = this.props.location.state;
        return (
            <>
                <View style={{flex: 1, backgroundColor: "#09367A"}}>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor="#09367A"
                    />
                    <SavedItineraries.Consumer>
                        {val => (
                            <View style={styles.destinationView}>
                                <Text style={styles.newItTitle}>
                                    {" "}
                                    Select a Destination:{" "}
                                </Text>
                                <FlatList
                                    data={val.list}
                                    style={{height: 525}}
                                    renderItem={({item: x, index}) => (
                                        <>
                                            {index == 0 && (
                                                <Text
                                                    style={
                                                        styles.destinationHeader
                                                    }>
                                                    {" "}
                                                    Food{" "}
                                                </Text>
                                            )}
                                            {index == 3 && (
                                                <Text
                                                    style={
                                                        styles.destinationHeader
                                                    }>
                                                    {" "}
                                                    Entertainment{" "}
                                                </Text>
                                            )}
                                            {index == 6 && (
                                                <Text
                                                    style={
                                                        styles.destinationHeader
                                                    }>
                                                    {" "}
                                                    Shopping{" "}
                                                </Text>
                                            )}
                                            <Text
                                                style={styles.destinationName}
                                                onPress={() => {
                                                    this.props.history.push(
                                                        "/new_event",
                                                        {
                                                            name: x.name,
                                                            address:
                                                                x.formatted_address,
                                                            iterId,
                                                        },
                                                    );
                                                }}>
                                                {" "}
                                                • {x.name}{" "}
                                            </Text>

                                            <Text
                                                style={styles.destinationAdd}
                                                onPress={() => {
                                                    this.props.history.push(
                                                        "/new_event",
                                                        {
                                                            name: x.name,
                                                            address:
                                                                x.formatted_address,
                                                            iterId,
                                                        },
                                                    );
                                                }}>
                                                {" "}
                                                {x.formatted_address}{" "}
                                            </Text>
                                        </>
                                    )}
                                />

                                <Link to="/New_itinerary">
                                    <Text style={styles.destinationGoBack}>
                                        Pick a new city
                                    </Text>
                                </Link>
                            </View>
                        )}
                    </SavedItineraries.Consumer>
                </View>
            </>
        );
    }
}

export class New_event extends Component {
    state = {
        name: this.props.location.state.name,
        address: this.props.location.state.address,
        startTime: debug ? "3:00 pm" : "",
        endTime: debug ? "4:00 pm" : "",
    };

    render() {
        const {iterId} = this.props.location.state;
        if (!iterId) {
            return <Text>No iteration id.</Text>;
        }
        return (
            <>
                <StatusBar barStyle="light-content" backgroundColor="#09367A" />

                <View style={styles.buttonBackground}>
                    <Text style={styles.WYWG}> When do you want to go to </Text>
                    <Text style={styles.clickerTitle}>{this.state.name}?</Text>
                </View>
                <View style={styles.flex}>
                    <Text style={styles.textBoxTitle}>Arrival:</Text>
                    <UselessTextInput
                        value={this.state.timeStart}
                        placeholder="12:00 AM"
                        onChangeText={text => this.setState({startTime: text})}
                    />
                </View>
                <View style={styles.flex}>
                    <Text style={styles.textBoxTitle}>Departure:</Text>
                    <UselessTextInput
                        value={this.state.endTime}
                        placeholder="12:00 PM"
                        onChangeText={text => this.setState({endTime: text})}
                    />
                </View>
                <View style={styles.buttonBackground}>
                    <TouchableOpacity
                        style={styles.newButton}
                        onPress={() => {
                            this.props.history.push("/calendar", {iterId});
                            axios.put("/stops", {
                                itineraryId: iterId,
                                timeStart: this.state.startTime,
                                timeEnd: this.state.endTime,
                                name: this.state.name,
                                address: this.state.address,
                            });
                        }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20,
                                textAlign: "center",
                            }}>
                            Add to Itinerary
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonBackground}>
                    <TouchableOpacity
                        style={styles.newButton}
                        onPress={() => this.props.history.goBack()}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 20,
                                textAlign: "center",
                            }}>
                            Pick a different destination
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bodyFiller}></View>
            </>
        );
    }
}
