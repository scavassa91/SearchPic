import React, { Component } from "react";

import Header from "./header";
import PictureList from "../containers/picture_list";

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <PictureList />
            </div>
        );
    }
}
