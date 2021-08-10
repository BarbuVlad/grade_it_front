
import { useState, useEffect } from "react";
import { Button, Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route,  useRouteMatch, useHistory} from 'react-router-dom';
import ClassCard from '../components/ClassCard';
import { Divider, Typography } from '@material-ui/core';
import List from "@material-ui/core/List";

import Grid from '@material-ui/core/Grid';
import SingleClass from "./SingleClass";
import NotFound from "./NotFound";

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import GroupIcon from '@material-ui/icons/Group';

const Classes = () => {
    let { path, url } = useRouteMatch();
    const history = useHistory();
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

    const handleDeleteClass = (id) => {
        setClasses(classes.filter(class_ => class_["id_class"]!=id));
    }
    return (
     <Container style={{color:"white"}}>
                <Switch>
                    <Route exact path={path}>
                        <div style={{
                            paddingTop:"25%",
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gridTemplateRows: "200px 200px",
                            
                            //grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line],
                        }}>
                    <Button 
                        variant="outlined"
                        color="primary"
                        size="large"
                        className={classes.button}
                        onClick={()=>{history.push("/app/classes/student")}}
                        startIcon={<GroupIcon style={{fontSize:38}}/>}
                        style={{fontSize:38 ,marginLeft:10}}
                        >
                            As student 
                        </Button>

                        <Button 
                        variant="outlined"
                        color="primary"
                        size="large"
                        className={classes.button}
                        onClick={()=>{history.push("/app/classes/teacher")}}
                        startIcon={<AssignmentIndIcon style={{fontSize:38}}/>}
                        style={{fontSize:38,marginRight:10}}
                        >
                            As teacher
                        </Button>
                        </div>
                    </Route>

                    <Route exact path={`${path}/student`}>
                    
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
                                handleDeleteClass={handleDeleteClass}
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

                    <Route exact path={`${path}/teacher`}>
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
                            _class["role"] === "teacher" || _class["role"] === "owner" ? 
                            
                                <ClassCard
                                item={_class}
                                handleDeleteClass={handleDeleteClass}
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

                    <Route path={`${path}/:id`}>
                        <SingleClass />
                    </Route>

                    <Route path='*' exact={true} component={NotFound} />
                </Switch>

    </Container>
    )
}

export default Classes;