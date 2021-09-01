import  Typography from '@material-ui/core/Typography';
import Grid  from '@material-ui/core/Grid';
import useStyles from "../styles/startPageStyles";
import logo from "../styles/gradeitLogo.svg"
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
const StartPage = () => {
    const classes = useStyles();
    const history = useHistory();

    //color:"#e67a20", 
    return (
        <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        >
            <Grid item xs={6} className={classes.item_left}>
                <Typography variant="h3" style={{fontWeight:"bold"}}>Welcome,</Typography>
                <br/>
                <Typography variant="body1">
                    <b style={{color:"#e67a20"}}>GradeIt</b> is a Learning Management System (LMS) that helps teachers grade and manage their students. 
                    With a simple UI the platform is intuitive and creates a consistent UX throughout, for students and 
                    teachers alike.
                 </Typography>
                 <br/>
                 <Typography variant="body1">
                    <b style={{color:"#e67a20"}}>Join</b> to learn more.
                 </Typography>

                 <Grid container spacing={2} className={classes.buttons}>
                     <Grid item style={{marginTop:20}}>
                    <Button variant="outlined" className={classes.btn} onClick={ () => {history.push('/')} }>
                        Login
                    </Button>
                    </Grid>

                    <Grid item style={{marginTop:20}}  onClick={ () => {history.push('/register')} } >
                        <Button variant="contained" className={classes.btn}>
                            Register
                        </Button>
                    </Grid>
                 </Grid>
            </Grid>

            <Grid item xs={6} className={classes.item_right}>
                <img width="500" src={logo} alt={"GradeIt logo"} />
            </Grid>


            
        </Grid>
    )
}

export default StartPage;
