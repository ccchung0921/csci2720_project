import './App.css';
import MainPage from './screens/MainPage'
import PlaceDetail from './screens/PlaceDetail'
import NavbarComponent from './components/Navbar';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


function App() {
  return (
    <>
    <NavbarComponent />
    <Router>
    <AppContainer>
      <AccountBox />
    </AppContainer>
      <Switch>
        <Route path='/place/:id' component={PlaceDetail} />
        <Route path='/' component={MainPage} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
