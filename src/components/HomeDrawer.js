
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import { useHistory, useLocation} from 'react-router';
//import Link from "react-router-dom/Link";

import Divider from '@material-ui/core/Divider';

import useStyles from '../styles/layoutStyles';
import {appBarHeight} from '../styles/layoutStyles';

const HomeDrawer = () => {
    const classes = useStyles();
    const menuItems = [

    ];

    return (
        <>
            {/*drawer on the left side */}
            <Drawer 
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                //overrides the defailt elements inside
                classes={{ paper:classes.drawer_plus}}
            >
            <div>
                <Typography
                variant="h5" style={{textAlign:"center", marginTop:appBarHeight/4}}>
                Home
                </Typography>
            </div>

            <Divider style={{marginTop:appBarHeight/4}}/>
            {/*List of menu items */}
            <List>

            </List>

            </Drawer>
        </>
    )
}

export default HomeDrawer;
