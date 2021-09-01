import { Container, makeStyles, Grid, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { useHistory, useLocation} from 'react-router';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ClassesDrawer from './components/ClassesDrawer';
import HomeDrawer from './components/HomeDrawer';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { useSelector, useDispatch } from "react-redux";
import useStyles from './styles/layoutStyles';
import {appBarHeight} from './styles/layoutStyles';

import { useEffect, useState } from "react";
import SingleClassDrawer from './components/SingleClassDrawer';
const Layout = ({children}) => {
    const classes = useStyles();

    const history = useHistory();
    const location = useLocation();

    const menuItems = useSelector((state)=>state.menu);

    const handleLogout = () => {
        // localStorage.setItem("token", null);
        // localStorage.setItem("id", null);
        localStorage.clear();
        history.push("/");
    }

    //menu list of items:
    // const menuItems = [
    //     {
    //         text: "TestText",
    //         icon: <SubjectOutlined color="secondary" />,
    //         path: '/app/home'
    //     },
    //     {
    //         text: "TestText2",
    //         icon: <AddCircleOutlined color="secondary" />,
    //         path: '/'
    //     },
    // ];
    useEffect(() => {

        console.log("----<",location.pathname);
        //dispatch(setJwt({"token":_token, "id":_id}));
    

        // return () => {
          
        // }
      }, []);

    return (

        <Grid className={classes.root}>
           <div className={classes.page}>
               <div className={classes.toolbar}>
                { children }
                </div>
            </div>
            {/*app bar */}
            <AppBar 
            elevation={0}
            position="fixed">
                <Toolbar className={classes.appbar}>
                    <div className={classes.navigation_buttons}>
                        <Button
                        disableElevation
                        color="secondary"
                        variant="outlined"
                        size="large"
                        onClick={()=>{history.push("/app/home")}}
                        style={{marginRight:25}}
                        >
                            <b>Home</b>
                        </Button>

                        <Button
                        disableElevation
                        color="secondary"
                        variant="outlined"
                        size="large"
                        onClick={()=>{history.push("/app/classes")}}
                        style={{marginRight:25}}
                        >
                           <b> Classes</b>
                        </Button>

                        <Button
                        disableElevation
                        color="secondary"
                        variant="outlined"
                        size="large"
                        onClick={()=>{history.push("/app/profile")}}
                        style={{marginRight:25}}
                        >
                           <b> Profile and settings </b>
                        </Button>
                    </div>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={handleLogout}
                        style={{marginRight:25}}
                        className={classes.logout_bnt}
                        >
                            Logout
                    </Button>

                    <Typography className={classes.email}>{localStorage.getItem("email")}</Typography>
                </Toolbar>
            </AppBar>


            {/*drawer on the left side */}
            {location.pathname === "/app/classes" || 
            location.pathname === "/app/classes/student" ||
            location.pathname === "/app/classes/teacher"
             ? <ClassesDrawer /> : <></>}
            {location.pathname === "/app/home" ? <HomeDrawer /> : <></>}
            {location.pathname.match(/^\/app\/classes\/.\d*$/) ? <SingleClassDrawer id={location.pathname.match(/\d*$/)}/> : <></>}
            {location.pathname.match(/^\/app\/classes\/.\d*\/.*$/) ? <SingleClassDrawer id={location.pathname.match(/\d+/gi)}/> : <></>}
            
        </Grid>
    )
}

export default Layout;
