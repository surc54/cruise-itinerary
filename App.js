import React, {Component} from "react";
import {Provider} from "react-redux";
import reduxThunk from "redux-thunk";
import {NativeRouter, Route, Link, Redirect, Switch} from "react-router-native";
import {Home, New_itinerary, Destinations, New_event} from "./pages.js";
import SavedItineraries from "./destination.js";
import Calendar from "./calendar.js";
import {createStore, compose, applyMiddleware} from "redux";
import reducers from "./reducers";

console.disableYellowBox = true;

class RawApp extends Component {
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
            clear: () => {
                this.setState({
                    savedItineraries: {
                        ...this.state.savedItineraries,
                        list: [],
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
                        <Route exact path="/" component={Home} />
                        <Route
                            path="/new_itinerary"
                            component={New_itinerary}
                        />
                        <Route path="/destinations" component={Destinations} />
                        <Route path="/new_event" component={New_event} />
                        <Route path="/calendar" component={Calendar} />
                        <Route render={e => <Redirect to="/" />} />
                    </Switch>
                </NativeRouter>
            </SavedItineraries.Provider>
        );
    }
}

const store = createStore(reducers, compose(applyMiddleware(reduxThunk)));

const App = () => {
    return (
        <Provider store={store}>
            <RawApp />
        </Provider>
    );
};

export default App;
