import React, {Component} from "react";

import {Text, View, StatusBar, Button} from "react-native";

import {Link} from "react-router-native";

import styles from "./styles.js";
import UselessTextInput from "./textInput.js";

import Axios from "axios";
import SavedItineraries from "./destination.js";

var searchTerms = ["breakfast", "lunch", "dinner", "art", "music", "family activities", "shopping"];

export class Page1 extends Component {
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" backgroundColor="#EEAA53" />
                <View style={styles.homeBackground}>
                    <Text style={styles.homeTitle}>Welcome Message</Text>
                </View>
                <View style={styles.buttonBackground}>
                    <Button
                        title="Create A New Iteneraries"
                        onPress={() => this.props.history.push("/page2")}
                    />
                </View>
                <View style={styles.buttonBackground}>
                    <Button
                        title="View Saved Iteneraries"
                        onPress={() => this.props.history.push("/page3")}
                    />
                </View>
                <View style={styles.bodyFiller} />
            </>
        );
    }
}

export class Page2 extends Component {
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
                        onChangeText={text =>
                            this.setState({destination: text})
                        }
                    />
                </View>
                <View style={styles.flex}>
                    <Text style={styles.textBoxTitle}>Arrival Time:</Text>
                    <UselessTextInput
                        value={this.state.arrivalTime}
                        onChangeText={text =>
                            this.setState({arrivalTime: text})
                        }
                    />
                </View>
                <View style={styles.flex}>
                    <Text style={styles.textBoxTitle}>Departure Time:</Text>
                    <UselessTextInput
                        value={this.state.departureTime}
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
                                onPress={async() =>  {
                                    val.clear();
                                    for (let i = 0; i < searchTerms.length; i++) {
                                        this.props.history.push("/page4");
                                        await
                                        Axios.get("http://10.136.22.161/test", {
                                            params: {
                                                search:
                                                    searchTerms[i] + " places in " +
                                                    this.state.destination,
                                            },
                                        }).then(response => {
                                            val.add(
                                                response.data.info
                                                    .candidates[0],
                                            );
                                            
                                        });
                                    }
                                }}
                            />
                        )}
                    </SavedItineraries.Consumer>
                </View>
                <View style={styles.buttonBackground}>
                    <Button
                        title="Go Back and view Saved Iteneraries"
                        onPress={() => {
                            this.props.history.push("/page3");
                        }}
                    />
                </View>
                <View style={styles.bodyFiller} />
            </>
        );
    }
}

export class Page3 extends Component {
    render() {
        return (
            <View>
                <Text>I am God</Text>

                <Link to="/">
                    <Text>Bad Dhruv</Text>
                </Link>
            </View>
        );
    }
}

export class Page4 extends Component {
    render() {
        return (
            <SavedItineraries.Consumer>
                {val => (
                    <>
                    <View style = { styles.destinationView }>
                        {(() => {
                            let arr = [];
                            for (let i = 0; i < val.list.length; i++) {
                                if (i == 0)
                                    arr.push(<Text style = { styles.destinationHeader }> Food </Text> )
                                else if (i == 3)
                                    arr.push(<Text style = { styles.destinationHeader }> Entertainment </Text> )
                                else if (i == 6)
                                    arr.push(<Text style = { styles.destinationHeader }> Shopping </Text> )
                                arr.push(<Text style = { styles.destinationName }> • { val.list[i].name } </Text>)
                                arr.push(<Text style = { styles.destinationAdd }> { val.list[i].formatted_address } </Text>)
                            }
                            return arr;
                        }) ()}
                        <Link to="/">
                            <Text>Bad Dhruv</Text>
                        </Link>
                    </View>
                    </>
                )}
            </SavedItineraries.Consumer>
        );
    }
}
