
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import BuildIcon from '@material-ui/icons/Build';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory, useLocation} from 'react-router';
//import Link from "react-router-dom/Link";

import Divider from '@material-ui/core/Divider';

import useStyles from '../styles/layoutStyles';
import {appBarHeight} from '../styles/layoutStyles';

const TestsDrawer = ({classId}) => {
    const classes = useStyles();

    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: "Create",
            icon: <AddCircleOutlineIcon color="primary" />,
            path: `/app/classes/${classId}/tests/create`
        },
        {
            text: "Manage",
            icon: <BuildIcon color="primary" />,
            path: `/app/classes/${classId}/tests/manage`
        },
    ];

    return (
        <>
            {/*drawer on the left side */}
            <Drawer 
                className={classes.drawer}
                variant="permanent"
                anchor="right"
                //overrides the defailt elements inside
                classes={{ paper:classes.drawer_plus}}
            >
            <div>
                <Typography
                variant="h5" style={{textAlign:"center", marginTop:appBarHeight/4}}>
                ----
                </Typography>
            </div>

            <Divider style={{marginTop:appBarHeight/4}}/>
            {/*List of menu items */}
            <List>
            {menuItems.map(item => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={()=>{history.push(item.path);}}
                        className={location.pathname == item.path ?
                        classes.active : classes.inactive}
                    >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text}/>
                    </ListItem>

                ))}
            </List>

            </Drawer>
        </>
    )
}

export default TestsDrawer;
