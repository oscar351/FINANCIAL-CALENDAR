import React, {Component} from "react";
import {Navbar} from "react-bootstrap";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import MainComponent from '../main/MainComponent'
import DashboardComponent from '../dashboard/DashBoardComponent'
import ApiComponent from '../api/ApiComponent'

class TopMenuComponent extends Component {
    
    render() {
        return (
            <Router>
                <Navbar
                    bg="white"
                    variant="light"
                    className="mb-4" >
                    <Navbar.Brand href="/">
                        Home
                    </Navbar.Brand>
                    <Navbar.Brand href="/main">
                        Main
                    </Navbar.Brand>
                    <Navbar.Brand href="/dashboard">
                        Dashboard
                    </Navbar.Brand>
                    <Navbar.Brand href="/api">
                        Dashboard
                    </Navbar.Brand>
                </Navbar>
                <Routes>
                    <Route path="/main" element={<MainComponent/>} />
                    <Route path="/dashboard" element={<DashboardComponent/>} />
                    <Route path="/api" element={<ApiComponent/>} />
                </Routes>
            </Router>
        )
    }
}

export default TopMenuComponent;