import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import { Home } from "./components/pages/Home";
import About from "./components/pages/About";
import ContactState from "./context/contact/contactState";
import AuthState from "./context/auth/AuthState";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/layout/Alerts";

function App() {
	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<Router>
						<Fragment>
							<Navbar />
              <div className="container">
                <Alerts />
								<Switch>
									<Route exact path="/">
										<Home />
									</Route>
									<Route path="/about">
										<About />
									</Route>
									<Route path="/register">
										<Register />
									</Route>
									<Route path="/login">
										<Login />
									</Route>
								</Switch>
							</div>
						</Fragment>
					</Router>
				</AlertState>
			</ContactState>
		</AuthState>
	);
}

export default App;
