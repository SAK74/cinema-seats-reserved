import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Reservation from './features/reservation/reservationStart';
import './CSS/main.css';
import { FetchRequest } from './features/reservation/fetching';
import Summary from './features/reservation/summary';

export function Main(){
    return(
        <>
            <h2 className = 'tittle'>Witamy na naszej stronie!</h2>
            <Router>
                <Switch>
                    <Route exact path = '/'>
                        <Reservation/>
                    </Route>
                    <Route path = '/show/:amount/:near'>
                        <FetchRequest/>
                    </Route>
                    <Route path = '/summary'>
                        <Summary/>
                    </Route>
                </Switch>
            </Router>
        </>
    )
}