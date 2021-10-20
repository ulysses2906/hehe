// import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AddContact } from "./components/AddContact";
import { View } from "./components/ViewContact";
import { Delete } from "./components/DeleteContact";
import { Update } from "./components/UpdateContact";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={AddContact} />
          <Route path="/View/:id" exact component={View} />
          <Route path="/Update/:id" exact component={Update} />
          <Route path="/Delete/:id" exact component={Delete} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
