import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route,  useRouteMatch} from 'react-router-dom';

import Layout from '../Layout';
import Home from './Home';
const InsideController = () => {
    let { path, url } = useRouteMatch();
    return (
        <Container style={{display: "grid", placeItems:"center"}}>
            <Layout>
                <Switch>
                    {/* <Route exact path={path}>
                    <h1>------------------------------------------------------------</h1>
                    </Route> */}

                    <Route path={`${path}/home`}>
                        <Home />
                    </Route>

                </Switch>
            </Layout>
            </Container>

    )
}

export default InsideController;
