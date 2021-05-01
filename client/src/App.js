import './App.css';
import MainPage from './screens/MainPage'
import PlaceDetail from './screens/PlaceDetail'
import NavbarComponent from './components/Navbar';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';

function App() {
  return (
    <>
    <NavbarComponent />
    <Router>
      <Switch>
        <Route path='/place/:id' component={PlaceDetail} />
        <Route path='/' component={MainPage} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
