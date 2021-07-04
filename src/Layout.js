import { Container, makeStyles, Grid } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons';
import { useHistory, useLocation} from 'react-router';
//import Link from "react-router-dom/Link";
import Link from '@material-ui/core/Link';

import Divider from '@material-ui/core/Divider';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const drawerWidth = 240;

const appBarHeight = 65;
const useStyles = makeStyles( (theme) => {
    return {
    page: {
        width: "100%",
    },

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },

    drawerPaper: {
        width: drawerWidth,
        height:"70%"

    },
    root: {
        display:'flex',
    },
    active: {
        background: '#f4f4f4'
    },

    appbar: {
        width: `calc(100% - ${drawerWidth}px)`,
        //width: "100%",
        height: appBarHeight,
        marginLeft: drawerWidth,

        alignItems:"center",
        justifyContent:"center",
    },

    toolbar: {
        marginTop: "75px",
        marginLeft: drawerWidth
    },
    //mixin from theme
    //toolbar: theme.mixins.toolbar
    link: {
        marginLeft:"22px",
        marginRight:"22px",
        fontWeight:"bold",
        fontSize:"15px"
    }
}
});

const Layout = ({children}) => {
    const classes = useStyles();

    const history = useHistory();
    const location = useLocation();

    //menu list of items:
    const menuItems = [
        {
            text: "TestText",
            icon: <SubjectOutlined color="secondary" />,
            path: '/app/home'
        },
        {
            text: "TestText2",
            icon: <AddCircleOutlined color="secondary" />,
            path: '/'
        },
    ];

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
                    <div style={{alignItems:"center",}}>
                        <Link href="/app/home" color="secondary"  className={classes.link}>Home</Link>
                        <Link href="/app/classes" color="secondary" className={classes.link}>Classes</Link>
                        <Link href="/app/profile" color="secondary" className={classes.link}>Profile and settings</Link>
                    </div>
                </Toolbar>
            </AppBar>


            {/*drawer on the left side */}
            <Drawer 
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{paper: classes.drawPaper}}
             //overrides the defailt elements inside

            >
                <div>
                    <Typography
                    variant="h5" style={{textAlign:"center", marginTop:appBarHeight/4}}>
                        Note
                    </Typography>
                    </div>

                    <Divider style={{marginTop:appBarHeight/4}}/>
                    {/*List of menu items */}
                    <List>
                        {menuItems.map(item => (
                            <ListItem
                            button
                            key={item.text}
                            onClick={()=>history.push(item.path)}
                            className={location.pathname == item.path ?
                            classes.active : null}
                            >
                              <ListItemIcon>{item.icon}</ListItemIcon>
                              <ListItemText primary={item.text}/>
                            </ListItem>

                        ))}
                    </List>

            </Drawer>

        </Grid>
    )
}

export default Layout;
