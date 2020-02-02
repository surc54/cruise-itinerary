import React, {Component} from "react";

import {
    Text,
    View,
    StatusBar,
    Button,
    ScrollView,
    ActivityIndicator,
} from "react-native";

import {Link} from "react-router-native";

import styles from "./styles.js";
import UselessTextInput from "./textInput.js";

import Axios from "axios";
import SavedItineraries from "./destination.js";

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
                <StatusBar barStyle="dark-content" backgroundColor="#EEAA53" />
                <View style={styles.homeBackground}>
                    <Text style={styles.homeTitle}>Welcome Message</Text>
                </View>
                <View style={styles.homeButtonBackground}>
                    <Button
                        title="Create A New Iteneraries"
                        onPress={() =>
                            this.props.history.push("/new_itinerary")
                        }
                    />
                </View>
                <View style={styles.homeButtonBackground}>
                    <Button
                        title="View Saved Iteneraries"
                        onPress={() =>
                            this.props.history.push("/select_itinerary")
                        }
                    />
                </View>
                <View style={styles.bodyFiller} />
            </>
        );
    }
}

export class New_itinerary extends Component {
    state = {destination: "", arrivalTime: "", departureTime: ""};

    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" backgroundColor="#AAAAFF" />
                <View>
                    <Text style={styles.newItTitle}>
                        Create A New Itenerary
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
                            <Button
                                title="Search and Create!"
                                onPress={async () => {
                                    val.clear();

                                    this.props.history.push("/destinations");

                                    Axios.get(
                                        "http://10.136.207.24/test/multi",
                                        {
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
                                        },
                                    )
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
                                }}
                            />
                        )}
                    </SavedItineraries.Consumer>
                </View>
                <View style={styles.buttonBackground}>
                    <Button
                        title="Go Back and view Saved Iteneraries"
                        onPress={() => {
                            this.props.history.push("/select_itinerary");
                        }}
                    />
                </View>
                <View style={styles.bodyFiller} />
            </>
        );
    }
}

export class Select_itinerary extends Component {
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" backgroundColor="#AAAAFF" />
                <View>
                    <Text>I am God</Text>

                    <Link to="/">
                        <Text>Bad Dhruv</Text>
                    </Link>
                </View>
            </>
        );
    }
}

let clicked = 0;

export class Destinations extends Component {
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" backgroundColor="#AAAAFF" />

                <ScrollView>
                    <SavedItineraries.Consumer>
                        {val => (
                            <View style={styles.destinationView}>
                                <Text style={styles.newItTitle}>
                                    {" "}
                                    Select a Destination:{" "}
                                </Text>
                                {val.list.length === 0 && (
                                    <View
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                        <ActivityIndicator style={{}} />
                                    </View>
                                )}
                                {(() => {
                                    let arr = [];
                                    for (let i = 0; i < val.list.length; i++) {
                                        if (i == 0)
                                            arr.push(
                                                <Text
                                                    style={
                                                        styles.destinationHeader
                                                    }>
                                                    {" "}
                                                    Food{" "}
                                                </Text>,
                                            );
                                        else if (i == 3)
                                            arr.push(
                                                <Text
                                                    style={
                                                        styles.destinationHeader
                                                    }>
                                                    {" "}
                                                    Entertainment{" "}
                                                </Text>,
                                            );
                                        else if (i == 6)
                                            arr.push(
                                                <Text
                                                    style={
                                                        styles.destinationHeader
                                                    }>
                                                    {" "}
                                                    Shopping{" "}
                                                </Text>,
                                            );
                                        arr.push(
                                            <Text
                                                style={styles.destinationName}
                                                onPress={() => {
                                                    this.props.history.push(
                                                        "/new_event",
                                                    );
                                                    clicked = i;
                                                }}>
                                                {" "}
                                                • {val.list[i].name}{" "}
                                            </Text>,
                                        );
                                        arr.push(
                                            <Text
                                                style={styles.destinationAdd}
                                                onPress={() => {
                                                    this.props.history.push(
                                                        "/new_event",
                                                    );
                                                    clicked = i;
                                                }}>
                                                {" "}
                                                {
                                                    val.list[i]
                                                        .formatted_address
                                                }{" "}
                                            </Text>,
                                        );
                                    }
                                    return arr;
                                })()}
                                <Link to="/">
                                    <Text>Bad Dhruv</Text>
                                </Link>
                            </View>
                        )}
                    </SavedItineraries.Consumer>
                </ScrollView>
            </>
        );
    }
}

export class New_event extends Component {
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" backgroundColor="#AAAAFF" />

                <View style={styles.buttonBackground}>
                    <Text style={styles.WYWG}> When do you want to go to </Text>
                    <SavedItineraries.Consumer>
                        {val => (
                            <Text style={styles.clickerTitle}>
                                {" "}
                                {val.list[clicked].name} ?{" "}
                            </Text>
                        )}
                    </SavedItineraries.Consumer>
                </View>
                <View style={styles.flex}>
                    <Text style={styles.textBoxTitle}>Destination:</Text>
                    <UselessTextInput placeholder="12:00 AM" />
                </View>
                <View style={styles.flex}>
                    <Text style={styles.textBoxTitle}>Arrival Time:</Text>
                    <UselessTextInput placeholder="12:00 PM" />
                </View>
                <View style={styles.buttonBackground}>
                    <Button
                        title="Add to Itinerary"
                        onPress={() =>
                            this.props.history.push("/select_itinerary")
                        }
                    />
                </View>
                <View style={styles.buttonBackground}>
                    <Button
                        title="Pick a different destination"
                        onPress={() => this.props.history.push("/destinations")}
                    />
                </View>
                <View style={styles.bodyFiller}></View>
            </>
        );
    }
}
