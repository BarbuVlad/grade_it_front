
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route,  useRouteMatch, useHistory} from 'react-router-dom';
import ClassCard from '../components/ClassCard';

const Classes = () => {
    let { path, url } = useRouteMatch();

    return (
     <Container style={{color:"white", display:"flex", justifyContent:"space-evenly",
     alignItems:"flex-start", alignContent:"space-around"}}>
            

                <Switch>
                    <Route exact path={path}>
                    <ClassCard />
                    </Route>

                    <Route path={`${path}/student`}>
                    <h1>___________Stundet___________</h1>
                    </Route>

                    <Route path={`${path}/teacher`}>
                    <h1>___________Teacher___________</h1>
                    </Route>

                </Switch>

    </Container>
    )
}

export default Classes;