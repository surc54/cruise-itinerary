import React, {Component} from "react";
import {NativeRouter, Route, Link, Redirect, Switch} from "react-router-native";
import {Page1, Page2, Page3, Page4} from "./pages.js";
import SavedItineraries from "./destination.js";
import Calendar from "./calendar.js";

export default class App extends Component {
    state = {
        savedItineraries: {
            list: [],
            add: e => {
                this.setState({
                    savedItineraries: {
                        ...this.state.savedItineraries,
                        list: [...this.state.savedItineraries.list, e],
                    },
                });
            },
        },
    };

    componentDidMount() {}
    render() {
        return (
            <SavedItineraries.Provider value={this.state.savedItineraries}>
                <NativeRouter>
                    <Switch>
                        <Route exact path="/" component={Page1} />
                        <Route path="/page2" component={Page2} />
                        <Route path="/page3" component={Page3} />
                        <Route path="/page4" component={Page4} />
                        <Route path="/calendar" component={Calendar} />
                        <Route render={e => <Redirect to="/" />} />
                        {/* <Route
                            render={props => {
                                props.history.push("/calendar", {
                                    data: [
                                        {
                                            name: "Publix Sabor",
                                            address:
                                                "6969 Cool St Gainesville, FL",
                                            startTime: new Date(
                                                "2/1/2020 4:30 PM",
                                            ).toISOString(),
                                            endTime: new Date(
                                                "2/1/2020 5:30 PM",
                                            ).toISOString(),
                                        },
                                        {
                                            name: "Walmart",
                                            address:
                                                "6969 Cool St Gainesville, FL",
                                            startTime: new Date(
                                                "2/1/2020 6:30 PM",
                                            ).toISOString(),
                                            endTime: new Date(
                                                "2/1/2020 7:00 PM",
                                            ).toISOString(),
                                        },
                                        {
                                            name: "Costco",
                                            address:
                                                "6969 Cool St Gainesville, FL",
                                            startTime: new Date(
                                                "2/1/2020 8:30 PM",
                                            ).toISOString(),
                                            endTime: new Date(
                                                "2/1/2020 10:30 PM",
                                            ).toISOString(),
                                        },
                                    ],
                                    arriveTime: new Date("2/1/2020 5:00 AM"),
                                    leaveTime: new Date("2/2/2020 12:00 AM"),
                                    itineraryNum: 4,
                                    destination: "Tampa",
                                });
                            }}
                        /> */}
                    </Switch>
                </NativeRouter>
            </SavedItineraries.Provider>
        );
    }
}
