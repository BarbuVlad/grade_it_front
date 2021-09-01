/**This is a subpage for classes route
 * Can be accessed by logged in users with a valid JWT token
 * The system must determine if user is member of class for further actions
 * If authorization is in order, this subpage offers subpages of it's own:
 *      - Posts
 *      - Tests
 *      - Members
 *      - Statistics 
 */
import { BrowserRouter as Router, Switch, Route,  useRouteMatch, useHistory, useParams} from 'react-router-dom';
import React, { useEffect, useState, useRef, Suspense } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Button from '@material-ui/core/Button';

import Posts from './single_class_subpages/Posts';
import Tests from './single_class_subpages/Tests';
import Members from './single_class_subpages/Members';
import Statistics from './single_class_subpages/Statistics';
import NotFound from './NotFound';
//const Posts = React.lazy(() => import('./single_class_subpages/Posts'));

const SingleClass = () => {
    let { id } = useParams();
    let { path } = useRouteMatch();
    const history = useHistory();

    const [openAuth, setOpenAuth] = useState(false);
    const [authSnackbar, setAuthSnackbar] = useState(false);///< for either join or create (show result)
    const [fetchFinish, setFetchFinish] = useState(false);///< for either join or create (show result)

    /*Side-effect to determine if user is member of class */
    useEffect(()=>{
      //if(isNaN(id)){id = localStorage.getItem("temp_class_id");}
        const fetch_auth = async () => {
            const auth_fetch = await fetch(`http://192.168.206.129:5000/classes/authorization`,{
            method: 'POST',
            headers:{"Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("token")},
            body: JSON.stringify({"class_id":id})
            });
            const data = await auth_fetch.json();

            if(data["code"] == 0){///< success
              //save to LS new details
              console.log("DEBUG: change id_class from: ", localStorage.getItem("id_class"), " to: ", data["data_signUp"]["id_class"]);
              localStorage.setItem("id_class", data["data_signUp"]["id_class"]);
              localStorage.setItem("role", data["data_signUp"]["role"]);
              localStorage.setItem("token_class", data["token"]);
              console.log(data);
              setAuthSnackbar(true);
              setFetchFinish(true);


            } else { ///< failed authorization
              setFetchFinish(true);
              setOpenAuth(true);
            }
            //console.log(data);
            
        }
        //determine authorization 
        fetch_auth();
        //console.log(path, id, "--",  localStorage.getItem("id_class"));
        console.log("DEBUG: after fetch; id_class: ", localStorage.getItem("id_class"));
        // return () => {
        //   // This is its cleanup.
        //   localStorage.setItem("token_class", undefined);
        // };
        
        
    },[]);

    const handleAuthErrorClose = () =>{
      setOpenAuth(false);
      history.push("/app/classes");
    }
     if(!fetchFinish){
       return (<Backdrop  open={true} onClick={()=>{}}>
        <CircularProgress color="inherit" />
      </Backdrop>)
     }
    return (
    <>
    <Switch>
      <Route exact path={`${path}`}>
          <Posts />
        </Route>

        <Route  path={`${path}/tests`}>
          <Tests classId={id}/>
        </Route>

        <Route  exact path={`${path}/members`}>
          <Members />
        </Route>

        <Route exact path={`${path}/statistics`}>
          <Statistics />
        </Route>

        <Route path='*' exact={true} component={NotFound} />
      </Switch>

        {/* Dialog for class authorization */}
            <Dialog
              open={openAuth}
              onClose={handleAuthErrorClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <div style={{backgroundColor:"#3d3d3d", color: "white", textAlign:"center"}}>
              <DialogTitle id="alert-dialog-title">{"Class authorization failed"}</DialogTitle>
              <DialogContent >
                    <DialogContentText id="alert-dialog-description" style={{color:"white"}}>
                        Class authentification failed for one of the reasons: <br/>
                        - You have been blocked (contact class owner)<br />
                        - You are not a member of this class <br />
                        - Class does not exist <br />
                        - Some other server error 
                    </DialogContentText>
              </DialogContent>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <DialogActions>
                    <Button onClick={handleAuthErrorClose} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </div>
              </div>
            </Dialog>
            {/* -------------------------- */}

            {/*Snackbar for class auth success */}
            <Snackbar
              // classes={{root:classes.snackbar_success}}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              open={authSnackbar}
              autoHideDuration={2000}
              onClose={()=>setAuthSnackbar(false)}
              // message={classTextSnackbar}
              action={
                <>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={()=>setAuthSnackbar(false)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              }
            >
              <MuiAlert elevation={3} variant="filled" severity={"success" }
                onClose={()=>setAuthSnackbar(false)}>
                  {"Class authorization successfull"}
                </MuiAlert>
            </Snackbar>
        {/* -------------------------- */}
    </>
            
    )

            
}

export default SingleClass
