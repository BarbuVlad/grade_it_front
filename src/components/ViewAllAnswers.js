
import { Button, List, TextField, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import CheckboxElement from './ResultElements/CheckboxElement';
import RadiobuttonElement from './ResultElements/RadiobuttonElement';
import useStyles from '../styles/testCreatorStyles';

import { useHistory, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { setState } from "../redux/testCreator/questionsCreatorSlice";
import { setEditTest } from "../redux/editTestSlice";
import { setTestId } from "../redux/testIdToEditSlice";
import ResultCard from './ResultCard';

const ViewAllAnswers = () => {

    let { id } = useParams();

    const [render, setRender] = useState(false);
    const [results, setResults] = useState([]);
    useEffect(()=>{
        /*Get all results for this test id */
        const fetch_result = async () =>{
          try{
            const results_fetch = await fetch(`http://192.168.206.129:5000/classes/get_all_results?test_id=${id}`, {
              method: 'GET',
              headers: {"Content-type": "application/json",
                          "x-auth-token": localStorage.getItem("token"),
                          "x-auth-token-class": localStorage.getItem("token_class")
                          }
          });
          const data = await results_fetch.json(); 
         console.log(data);
          if(data["code"]==0){
            setResults(data["results"]);
            setRender(true);
            return;
          }
          else{///< no permision or error
            alert("This data does not exist or you have no right to view it");
            setRender(false);
            return;
          }

          } catch(err){
              alert("Can't fetch tests. Network error!");
              //console.log(err);
              setRender(false);
              //setClassTests("Network error");
          }
      }
      fetch_result();

    },[]);

if(!render){
    return (
        <div style={{display:"flex",flexDirection: "column", marginLeft:1, marginTop:1}}>
            <Typography variant="h5" color="primary"> No data</Typography>
    </div>
    )
}else{
    return (
    <div style={{display:"flex",flexDirection: "column", marginLeft:1, marginTop:1}}>
        <Typography variant="h5" color="primary"  style={{marginButtom:22}}> Results</Typography>

        <div
                style={{
                    display:"grid",
                }}
                >
                    { typeof(results)==="object" ? 
                    <List         
                    style={{
                        display:"grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        //gridTemplateRows: "" //minmax(150px, auto)
                        gridGap:"25px",
                        marginLeft:"-8rem",
                    }}>
                    { results.map( (result, i) => (
                        <ResultCard item={result}  key={i}/>
                    ))}
                    </List>
                    :
                    <Typography>{results}</Typography>
                    }
            </div>
         </div>
    )
}
}

export default ViewAllAnswers
