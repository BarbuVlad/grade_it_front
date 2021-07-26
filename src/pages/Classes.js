
import { useState, useEffect } from "react";
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route,  useRouteMatch, useHistory} from 'react-router-dom';
import ClassCard from '../components/ClassCard';
import { Divider, Typography } from '@material-ui/core';
import List from "@material-ui/core/List";

import Grid from '@material-ui/core/Grid';

const Classes = () => {
    let { path, url } = useRouteMatch();

    const [classes, setClasses] = useState([]);
    useEffect(()=>{
        const fetch_classes = async () =>{
            try{
                const classes_fetch = await fetch(`http://192.168.206.129:5000/users/classes`, {
                  method: 'GET',
                  headers: {"Content-type": "application/json",
                              "x-auth-token": localStorage.getItem("token")
                            }
              });
              const data = await classes_fetch.json(); 
              if(data["code"]==0){
                setClasses(data["message"]);
                //console.log(data);
                return;
              }
              if(data["code"]==1){///< not registerd in any classes
                setClasses("You are not registered in any classes.");
                return;
              }
              if(data["code"]==2){// DB error
                alert("Can't fetch classes. Network error!");
                setClasses("Error occurred...");
                return;
              }
  
              } catch(err){
                  alert("Can't fetch feed. Network error!");
              }
        }
        fetch_classes();

    },[]);
    return (
     <Container style={{color:"white"}}>
            

                <Switch>
                    <Route exact path={path}>
                    <ClassCard />
                    </Route>

                    <Route path={`${path}/student`}>
                    
                    {
                        (typeof classes === "object") ? 
                        <Grid   
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={2} 
                         >
                        {classes.map((_class)=>(
                            _class["role"] === "student" ? 
                            
                                <ClassCard
                                item={_class}
                                />
                            
                            :
                            <></>
                            
                        ))}
                        </Grid>
                        :
                        <div>
                            <Typography variant="h6"style={{marginTop:200, marginBottom:10}}>{classes}</Typography>
                            <Divider />
                        </div>
                    }
                    </Route>

                    <Route path={`${path}/teacher`}>
                    {
                        (typeof classes === "object") ? 
                        <Grid   
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={2} 
                        >
                        {classes.map((_class)=>(
                            _class["role"] === "teacher" ? 
                            
                                <ClassCard
                                item={_class}
                                />
                            
                            :
                            <></>
                            
                        ))}
                        </Grid>
                        :
                        <div>
                            <Typography variant="h6"style={{marginTop:200, marginBottom:10}}>{classes}</Typography>
                            <Divider />
                        </div>
                    }
                    </Route>

                </Switch>

    </Container>
    )
}

export default Classes;