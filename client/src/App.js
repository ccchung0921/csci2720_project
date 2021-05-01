import './App.css';
import MainPage from './screens/MainPage'
import PlaceDetail from './screens/PlaceDetail'
import NavbarComponent from './components/Navbar';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import PrivateRoute from './routes/PrivateRoute';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AuthComponenet = () =>{
  return(
    <AppContainer>
      <AccountBox />
    </AppContainer>
  )
}


function App() {
  return (
    <>
    <NavbarComponent />
    <Router>
      <Switch>
        <Route path='/login' component={AuthComponenet} />
        <Route path='/place/:id' component={PlaceDetail} />
        <PrivateRoute exact path='/' comp={MainPage} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
