
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';

import ForumIcon from '@material-ui/icons/Forum';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AssignmentIcon from '@material-ui/icons/Assignment';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory, useLocation, useParams} from 'react-router';
//import Link from "react-router-dom/Link";

import Divider from '@material-ui/core/Divider';

import useStyles from '../styles/layoutStyles';
import {appBarHeight} from '../styles/layoutStyles';

const SingleClassDrawer = ({id}) => {
    const classes = useStyles();

    //let { id } = useParams();
    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: "posts",
            icon: <ForumIcon color="primary" />,
            path: `/app/classes/${id[0]}`
        },
        {
            text: "tests",
            icon: <AssignmentIcon color="primary" />,
            path: `/app/classes/${id[0]}/tests`
        },
        {
            text: "members",
            icon: <PeopleOutlineIcon color="primary" />,
            path: `/app/classes/${id[0]}/members`
        },
        {
            text: "statistics",
            icon: <EqualizerIcon color="primary" />,
            path: `/app/classes/${id[0]}/statistics`
        },
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

export default SingleClassDrawer;
