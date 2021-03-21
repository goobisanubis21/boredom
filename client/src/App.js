import React from "react";
import Signup from "./components/Signup/Signup";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Home from "./pages/Home";
import Navbar from "./components/Nav/Navbar";
import Adventure from "./pages/Adventure";
import Recent from "./pages/Recent";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Navbar />
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <PrivateRoutes exact path="/" component={Home} />
            <PrivateRoutes exact path="/adventure" component={Adventure} />
            <PrivateRoutes exact path="/recent" component={Recent} />
            <PrivateRoutes exact path="/profile" component={Profile} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;