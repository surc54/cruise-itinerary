/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from "react";
import {NativeRouter, Route, Link, Redirect, Switch} from "react-router-native";
import {Page1, Page2, Page3, Page4} from "./pages.js";
import SavedItineraries from "./destination.js";

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
                        <Route render={e => <Redirect to="/" />} />
                    </Switch>
                </NativeRouter>
            </SavedItineraries.Provider>
        );
    }
}
