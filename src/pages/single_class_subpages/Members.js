import { Divider, Grid, List, Typography } from "@material-ui/core"
import { useEffect, useState } from "react";
import MemberCard from "../../components/MemberCard";

import useStyles from "../../styles/membersStyle"
const Members = () => {
    const classes = useStyles();

    const [members, setMembers] = useState([]);
    const [refresh, setRefresh] = useState(1);

    useEffect(() => {
        const fetch_members = async () =>{
            try{
              const members_fetch = await fetch(`http://192.168.206.129:5000/classes/members?sort=true`, {
                method: 'GET',
                headers: {"Content-type": "application/json",
                            "x-auth-token": localStorage.getItem("token"),
                            "x-auth-token-class": localStorage.getItem("token_class")
                            }
            });//
            const data = await members_fetch.json(); 
            console.log(data);
            if(data["code"]==0){
                setMembers(data["members"]);
                return;
            }
            if(data["code"]==1){///< auth fail
                setMembers(1);
                return;
            }
            if(data["code"]==2){// Empty list
                setMembers(1);
                return;
            }
            } catch(err){
                alert("Can't fetch members. Network error!");
            }
        }

        fetch_members();
    },[refresh])

    const doRefresh = () =>{
        setRefresh(refresh+1);
    }
    return (
        <Grid
        container
        className={classes.root}
        spacing={8}
        >
            <Grid item xs={12} sm={6} style={{ borderRightStyle:"outset", borderWidth:"1px", borderColor:"grey"}}>
            <Typography variant="h4" >
                Students
            </Typography>

            <List>
            { members.map( (member) => (
                member.role==="student" ? 
                <MemberCard item={member} handleRefresh={doRefresh} key={member["id"]}/>

                :
                <></>

            ))}
            </List>

            </Grid>


            <Grid item xs={12} sm={6} >
                <Typography variant="h4" className={classes.titles}>
                    Teachers
                </Typography>

                <List>
                { members.map( (member) => (
                    member.role!=="student" ? 
                    <MemberCard item={member} handleRefresh={doRefresh} key={member["id"]}/>

                    :
                    <></>

                ))}
                </List>
            </Grid>

        </Grid>
    )
}

export default Members
