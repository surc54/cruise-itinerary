import React, {Component} from "react";

import {Text, View, StatusBar, Button, FlatList} from "react-native";

import {Link} from "react-router-native";

import styles from "./styles.js";
import UselessTextInput from "./textInput.js";

import axios from "./axios";
import SavedItineraries from "./destination.js";

const debug = true;

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
                <StatusBar barStyle="light-content" backgroundColor="#F20018" />
                <View style={styles.homeBackground}>
                    <Text style={styles.homeTitle}>Welcome Message</Text>
                </View>
                <View style={styles.homeButtonBackground}>
                    <Button
                        title="Create A New Itineraries"
                        onPress={() =>
                            this.props.history.push("/new_itinerary")
                        }
                    />
                </View>
                <View style={styles.homeButtonBackground}>
                    <Button
                        title="View Saved Itineraries"
                        onPress={() =>
                            this.props.history.push("/calendar", {latest: true})
                        }
                    />
                </View>
                <View style={styles.bodyFiller} />
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
                            <Button
                                title="Search and Create!"
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
                                }}
                            />
                        )}
                    </SavedItineraries.Consumer>
                </View>
                <View style={styles.buttonBackground}>
                    <Button
                        title="Go Back and view Saved Itineraries"
                        onPress={() => {
                            this.props.history.push("/calendar", {
                                latest: true,
                            });
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
                    <Text>Soon to be Itinerary</Text>

                    <Link to="/">
                        <Text>Bad Dhruv</Text>
                    </Link>
                </View>
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
                                    style={{height: 510}}
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

                                <Link to="/">
                                    <Text>Bad Dhruv</Text>
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
                    <Text style={styles.textBoxTitle}>Destination:</Text>
                    <UselessTextInput
                        value={this.state.startTime}
                        placeholder="12:00 AM"
                        onChangeText={text => this.setState({startTime: text})}
                    />
                </View>
                <View style={styles.flex}>
                    <Text style={styles.textBoxTitle}>Arrival Time:</Text>
                    <UselessTextInput
                        value={this.state.endTime}
                        placeholder="12:00 PM"
                        onChangeText={text => this.setState({endTime: text})}
                    />
                </View>
                <View style={styles.buttonBackground}>
                    <Button
                        title="Add to Itinerary"
                        onPress={() => {
                            this.props.history.push("/calendar", {iterId});
                            axios.put("/stops", {
                                itineraryId: iterId,
                                timeStart: this.state.startTime,
                                timeEnd: this.state.endTime,
                                name: this.state.name,
                                address: this.state.address,
                            });
                        }}
                    />
                </View>
                <View style={styles.buttonBackground}>
                    <Button
                        title="Pick a different destination"
                        onPress={() => this.props.history.goBack()}
                    />
                </View>
                <View style={styles.bodyFiller}></View>
            </>
        );
    }
}
