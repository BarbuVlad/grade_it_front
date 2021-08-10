/* This component "binds" all the elements of the app after a successfull login. 
There are some constants over all pages in the app:
- Visual compoents: the top toolbal, the left menu
- Behaviour: logout in case of lost token...
 */

import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route,  useRouteMatch, useHistory} from 'react-router-dom';

import { useEffect, useState } from "react";

import { useDispatch, useSelector} from 'react-redux';
import { setJwt } from "../redux/jwtSlice";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from  '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';

import Layout from '../Layout';
import Home from './Home';
import Classes from './Classes';
import ProfileAndSettings from './ProfileAndSettings';
import NotFound from './NotFound';


const InsideController = () => {
    let { path, url } = useRouteMatch();
    const history = useHistory();

    //redux states
    const jwt = useSelector((state)=>state.jwt);
    const dispatch = useDispatch();
    //Other states
    const [popupText, setPopupText] = useState('');
    const [popupTitle, setPopupTitle] = useState(`Error`);
    const [openTokenLost, setOpenTokenLost] = useState(false);

    useEffect(() => {

        const _id = localStorage.getItem("id");
        const _token = localStorage.getItem("token");
        if(_id==null || _token==null){
            setOpenTokenLost(true);
            setPopupText("Session expired! Token lost, please login again")
        } 
        //dispatch(setJwt({"token":_token, "id":_id}));
    

        // return () => {
          
        // }
      }, [jwt]);

      const handleCloseTokenLost = () => {
        setOpenTokenLost(false);
        localStorage.clear();
        history.push('/')
    };

    return (
        <>
        {/* style={{display: "grid", placeItems:"center"}} */}
        <Container >
            <Layout>
                <Switch>
                    {/* <Route exact path={path}>
                    <h1>------------------------------------------------------------</h1>
                    </Route> */}

                    <Route path={`${path}/home`}>
                        <Home />
                    </Route>

                    <Route path={`${path}/classes`}>
                        <Classes />
                    </Route>

                    <Route path={`${path}/profile`}>
                        <ProfileAndSettings />
                    </Route>

                    <Route path='*' exact={true} component={NotFound} />
                </Switch>
            </Layout>
            </Container>
{/* ==== Login result dialog ===*/}
    <Dialog
    open={openTokenLost}
    onClose={handleCloseTokenLost}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
  
    <div style={{backgroundColor:"#3d3d3d", color: "#d45559", textAlign:"center"}}>
    <DialogTitle id="alert-dialog-title">{popupTitle}</DialogTitle>
    <DialogContent style={{color:"white"}}>
        {popupText}   
    </DialogContent>
      <div style={{display:"flex", justifyContent:"center", marginTop:10}}>
        <DialogActions>
          <Button onClick={handleCloseTokenLost} color="primary">
            OK
          </Button>
        </DialogActions>
      </div>
    </div>
  </Dialog>
{/* ==== -------------------- ===*/}
</>
    )
}

export default InsideController;
