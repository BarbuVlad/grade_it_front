
import { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import TestCard from '../../../components/TestCard';
import { Typography } from '@material-ui/core';
import NotFound from '../../NotFound';
import ViewTestAsTeacher from '../../../components/ViewTestAsTeacher';

const ManageTests = () => {
    const [classTests, setClassTests] = useState();
    let { path } = useRouteMatch();
    useEffect(()=>{
        /*Get all scheduled tests */
        const fetch_class_test = async () =>{
          try{
            const tests_fetch = await fetch(`http://192.168.206.129:5000/classes/view_tests`, {
              method: 'GET',
              headers: {"Content-type": "application/json",
                          "x-auth-token": localStorage.getItem("token"),
                          "x-auth-token-class": localStorage.getItem("token_class")
                          }
          });
          const data = await tests_fetch.json(); 
          if(data["code"]==0){
            setClassTests(data["tests"]);
            //console.log(data["tests"])
            return;
          }
          else{///< not registerd in any classes
            setClassTests(data["message"]);
            return;
          }

          } catch(err){
              alert("Can't fetch tests. Network error!");
              setClassTests("Network error");
          }
      }
      //while(localStorage.getItem("token_class") === undefined){continue;}
      //console.log("POSTS:",localStorage.getItem("id_class"));
      //console.log("DEBUG: IN POSTS; id_class: ", localStorage.getItem("id_class"));
      fetch_class_test();

    },[]);
    return (
        <Switch>
        <Route exact path={`${path}`}>
            <div
                style={{
                    display:"grid",
                }}
                >
                    { typeof(classTests)==="object" ? 
                    <List         
                    style={{
                        display:"grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        //gridTemplateRows: "" //minmax(150px, auto)
                        gridGap:"25px",
                        marginLeft:"-8rem",
                    }}>
                    { classTests.map( (test) => (
                        <TestCard item={test}  key={test["id"]}/>
                    ))}
                    </List>
                    :
                    <Typography>{classTests}</Typography>
                    }
            </div>
        </Route>

        <Route exact path={`${path}/:id`}>
          <ViewTestAsTeacher />
        </Route>

        <Route path='*' exact={true} component={NotFound} />
    </Switch>
    )
}

export default ManageTests
