import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useEffect,useState } from 'react'

import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from '../../styles/statisticsStyles';
const Statistics = () => {
    const classes = useStyles();

    const [generalInfo, setGeneralInfo] = useState({});
    const [fetchedInfo, setFetchedInfo] = useState(false);

    useEffect(()=>{
        //get general info
        //TODO: get attendance info
        //TODO: get tests info and stat
        const fetch_info = async () =>{
            try{
              const info_fetch = await fetch(`http://192.168.206.129:5000/classes/general_info`, {
                method: 'GET',
                headers: {"Content-type": "application/json",
                            "x-auth-token": localStorage.getItem("token"),
                            "x-auth-token-class": localStorage.getItem("token_class")
                            }
            });//
            const data = await info_fetch.json(); 
            console.log(data);
            if(data["code"]==0){
                setGeneralInfo(data["info"]);
                setFetchedInfo(true);
                return;
            }
            } catch(err){
                setGeneralInfo("Error at fetching data");
                setFetchedInfo(true);
            }
        }

        fetch_info();

    }, []);
    return (
        <div
        style={{
            display:"grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            //gridTemplateRows: "" //minmax(150px, auto)
            gridGap:"20px"
        }}
        >

        <Card className={classes.root}>
        <CardContent>
            <Typography variant="h5" component="p" style={{textAlign:"center"}}>
              General information 
            </Typography>
          </CardContent>

          {fetchedInfo ? <></> : <CircularProgress  size={34} className={classes.buttonProgress} />}
            {typeof(generalInfo)==="string" ? 
                <Typography>{generalInfo}</Typography>
                :
                <Typography variant="h6" style={{textAlign:"left", margin:10}}> 
                    {"Name: "}<b>{generalInfo.name}</b><br/>
                    {"Head teacher: "} <b>{generalInfo.head_teacher} </b> <br/>
                    {"No. of members: "} <b>{generalInfo.members} </b><br/>
                    {"students: "}<b>{generalInfo.students}</b><br />
                    {"teachers: "}<b>{generalInfo.teachers}</b><br/>
                    {"Description: "}{generalInfo.description}<br/>
                </Typography>

            }
  
        </Card>
        </div>
    )
}

export default Statistics
