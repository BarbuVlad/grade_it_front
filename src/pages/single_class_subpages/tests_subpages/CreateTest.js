//import Header from "../Header";
import ShowTestCreated from '../../../components/ShowTestCreated';
import CreateQuestion from '../../../components/CreateQuestion';

import { CssBaseline, Container, Grid, Divider} from "@material-ui/core";

import useStyles from '../../../styles/testCreatorStyles';

import {useDispatch} from 'react-redux';
import { setEditTest } from "../../../redux/editTestSlice";
import { useEffect } from 'react';
const CreateTest = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(setEditTest(false));
    }
  },[])
    const classes=useStyles();
    return (
        <div >
        <CssBaseline />
        <Container maxWidth="xl" >
    
          {/* <Header /> */}
          
            <Grid container spacing={2} className={classes.dual_container} >
    
                <Grid item xs={6} md={6} className={classes.q_form_container}>
                  <CreateQuestion />
                </Grid>
    
                {/* <Grid item xs={0.1}>  
                <Divider orientation="vertical" />
                </Grid> */}
    
    {/* ----------Second element in grid----------*/}
    
                <Grid item xs={6} md={6} className={classes.q_show_container}>
                  <ShowTestCreated />
                </Grid>
    
            </Grid>
    
         </Container>
      </div>
    );
}

export default CreateTest
