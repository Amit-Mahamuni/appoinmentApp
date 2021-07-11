import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route, Switch
} from 'react-router-dom';
import { Container, Navbar, Nav } from "react-bootstrap";
import Login from './Components/Login';
import Appoinment from './Components/Appoinment';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <Navbar bg="light" className="bg-white shadow mb-3 sticky-top border" >
            <Container>
              <Navbar.Brand href="#"><strong>Appoinment | </strong></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link ><Link to="/">Profile</Link></Nav.Link>
                  <Nav.Link ><Link to="/appoinment">Appoinment</Link></Nav.Link>
                  <Nav.Link ><Link to="/dashboard">Dashboard</Link></Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/appoinment" >
              <Appoinment />
            </Route>
            <Route path="/dashboard" >
              <Dashboard />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
