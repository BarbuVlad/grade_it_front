import { Divider, Typography } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import useStyles from "../styles/postStyles";

const Post = ({post}) => {
    const classes = useStyles();

    return (
        <ListItem
        divider
        className={classes.list_item}
        >   
            <Card className={classes.root} variant="outlined">
             <CardContent>

                <div className={classes.header}>
                    <Typography variant="body1" className={classes.header_username}>{post.author}</Typography>
                    <Divider orientation="vertical" flexItem />

                    <Typography variant="body1" className={classes.header_date}>{post.date_time}</Typography>
                    <Divider orientation="vertical" flexItem/>

                    <Typography variant="body1" className={classes.header_class}>{post.title}</Typography>
                </div>

                <Divider className={classes.divider}/>

                <Typography variant="body1">
                    { post.date_time ==="2021-07-16-10-12-11" ? 
                    "In publishing and graphic design, Lorem ipsum is a placeholder text commonng on meaningful content. "
                    :
                    post.body
                    
                }
                </Typography>

             </CardContent>
            </Card>
        </ListItem>
    )
}

export default Post
