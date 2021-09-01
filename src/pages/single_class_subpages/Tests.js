import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useEffect, useState } from 'react'
import TestsDrawer from '../../components/TestsDrawer'
import NotFound from '../NotFound';
import CreateTest from './tests_subpages/CreateTest';
import ManageTests from './tests_subpages/ManageTests';
import { List, Typography } from '@material-ui/core';
import ScheduledTestCard from '../../components/ScheduledTestCard';
import SolveTest from './tests_subpages/SolveTest';
import ViewOwnAnswers from '../../components/ViewOwnAnswers';
import ViewAllAnswers from '../../components/ViewAllAnswers';
import ViewSingleResultAsTeacher from '../../components/ViewSingleResultAsTeacher';

const Tests = ({classId}) => {
    let { path } = useRouteMatch();

    const [tests, setTests] = useState();


    useEffect(()=>{
        /*Get all scheduled tests */
        const fetch_scheduled_test = async () =>{
          try{
            const tests_fetch = await fetch(`http://192.168.206.129:5000/classes/scheduled_tests`, {
              method: 'GET',
              headers: {"Content-type": "application/json",
                          "x-auth-token": localStorage.getItem("token"),
                          "x-auth-token-class": localStorage.getItem("token_class")
                          }
          });//
          const data = await tests_fetch.json(); 
          if(data["code"]==0){
            setTests(data["schedules"]);
            console.log(data)
            return;
          }else{
            setTests("No scheduled test...");
            return;
            }
        } catch(err){
            alert("Can't fetch feed. Network error!");
        }
      }
      //while(localStorage.getItem("token_class") === undefined){continue;}
      //console.log("POSTS:",localStorage.getItem("id_class"));
      //console.log("DEBUG: IN POSTS; id_class: ", localStorage.getItem("id_class"));
      fetch_scheduled_test();

    },[]);

    return (
        <div>
    <Switch>
    <Route exact path={`${path}`}>
          <Typography variant="h4" style={{marginBottom:35}}>Scheduled tests</Typography>
          <div
                style={{
                    display:"grid",
                }}
                >
                    { typeof(tests)==="object" ? 
                    <List         
                    style={{
                        display:"grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        //gridTemplateRows: "" //minmax(150px, auto)
                        gridGap:"25px",
                        marginLeft:"-8rem",
                    }}>
                    { tests.map( (test) => (
                        <ScheduledTestCard item={test}  key={test["id"]}/>
                    ))}
                    </List>
                    :
                    <Typography>{tests}</Typography>
                    }
            </div>
        </Route>

      <Route exact path={`${path}/create`}>
          <CreateTest />
        </Route>

        <Route  path={`${path}/manage`}>
          <ManageTests />
        </Route>

        <Route  path={`${path}/solve/:id`}>
          <SolveTest />
        </Route>
        <Route  path={`${path}/view_own/:id`}>
          <ViewOwnAnswers />
        </Route>
        <Route  path={`${path}/view_all/:id`}>
          <ViewAllAnswers />
        </Route>
        <Route  path={`${path}/view_single/:id`}>
          <ViewSingleResultAsTeacher />
        </Route>

        <Route path='*' exact={true} component={NotFound} />
      </Switch>

        { localStorage.getItem("role") !=="student" ? 
        <TestsDrawer classId={classId}/>
        : <></>
        }
        </div>
    )
}

export default Tests
