import RadiobuttonElement from './RadiobuttonElement';
import CheckboxElement from './CheckboxElement';

import { Typography, Button, TextField} from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useHistory } from 'react-router-dom';
import {useState ,useEffect} from "react"
import useStyles from '../styles/testCreatorStyles';

//Redux-store imports
import {useSelector, useDispatch} from 'react-redux';

//import { removeQuestionFromTest, editQuestionFromTest } from '../actions';
import { removeQuestion, editQuestion, setState} from "../redux/testCreator/questionsCreatorSlice";
import { resetAnswers, setAnswers } from "../redux/testCreator/answersListSlice";
import { changeQuestionText, resetQuestionText } from "../redux/testCreator/questionTextSlice";
import { changeAnswersType } from "../redux/testCreator/answersTypeSlice";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
const ShowTestCreated = () => {
    const classes=useStyles();
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [testId, setTestId] = useState(undefined);

    const history = useHistory();

    const dispatch = useDispatch();
    const testQuestions = useSelector(state=>state.questionsCreator);
    const editTest = useSelector(state=>state.editTest);
    const testIdToEdit = useSelector(state=>state.testIdToEdit);

    const [openEditQuestion, setOpenEditQuestion] = useState(false);
    const [indexEditQuestion, setIndexEditQuestion] = useState(0);

    const [openSaveTest, setOpenSaveTest] = useState(false);
    const [testTitle, setTestTitle] = useState('');
    const [testDescription, setTestDescription] = useState('');
    const [testSnackbar, setTestSnackbar] = useState('');

    const [testSaveSuccessSnackbar, setTestSaveSuccessSnackbar] = useState(false);
    const [saveTextSnackbar, setSaveTextSnackbar] = useState('');

    //Handlers
    const deleteQuestion = (index) => {
        //console.log(`Delete ${index}`);
        dispatch(removeQuestion({'index':index}));
    }

    const editQuestion_ = (index) => {
        /*All values in this question will be passed to the current question in creation.
        The "edited" will hence be removed from state; later to be added again after editing */
        setIndexEditQuestion(index);
        setOpenEditQuestion(true);
        //let x = dispatch(editQuestion({'index':index}));
    }
    const handleEditQuestion = () => {
        //overwrite current question:
        //console.log("--->",testQuestions[indexEditQuestion].answersList);
        dispatch(changeQuestionText(testQuestions[indexEditQuestion].question));
        dispatch(changeAnswersType(testQuestions[indexEditQuestion].type));
        dispatch(resetAnswers());
        dispatch(setAnswers(testQuestions[indexEditQuestion].answersList));
        //remove
        //dispatch(editQuestion(indexEditQuestion));
        dispatch(removeQuestion({'index':indexEditQuestion}));
        setOpenEditQuestion(false);
    }
    
    const handleSaveTest = async () => {
        /*Sends to server a request to save the current test as is;  */
        
        //Validate data:
        if(testQuestions==null){alert("Test can't be empty!");return;}
        if(testQuestions.length === 0){alert("Test can't be empty!");return;}

        setOpen(true);

        const save_result = await fetch('http://192.168.206.129:5000/classes/create_test', {
            method: 'POST',
            headers: {"Content-type": "application/json",
            "x-auth-token":localStorage.getItem("token"),
            "x-auth-token-class": localStorage.getItem("token_class")},
            body: JSON.stringify({"questions": testQuestions, "title":testTitle, "description":testDescription})
        });
        const data = await save_result.json();
        if(data["code"]==0){
            setSaveTextSnackbar(data["message"]);
            setTestSnackbar(true);
            setTestSaveSuccessSnackbar(true);
            setOpenSaveTest(false);
        } else {
            setSaveTextSnackbar(data["message"]);
            setTestSnackbar(true);
            setTestSaveSuccessSnackbar(false);
            setOpenSaveTest(false);
        }
        setOpen(false);
        
    }

    const handleSaveEditedTest = async () =>{
          //Validate data:
          if(testQuestions==null){alert("Test can't be empty!");return;}
          if(testQuestions.length === 0){alert("Test can't be empty!");return;}
          setOpen(true);
          //setTestSnackbar(false);
          
          const save_result = await fetch('http://192.168.206.129:5000/classes/edit_test', {
              method: 'PATCH',
              headers: {"Content-type": "application/json",
              "x-auth-token":localStorage.getItem("token"),
              "x-auth-token-class": localStorage.getItem("token_class")},
              body: JSON.stringify({"questions": testQuestions, "test_id":testIdToEdit})
          });
          const data = await save_result.json();
          console.log(data);
          if(data["code"]==0){
              setSaveTextSnackbar(data["message"]);
              setTestSnackbar(true);
              setTestSaveSuccessSnackbar(true);
              //setOpenSaveTest(false);
          } else {
              setSaveTextSnackbar(data["message"]);
              setTestSnackbar(true);
              setTestSaveSuccessSnackbar(false);
              //setOpenSaveTest(false);
          }
          setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
      };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    useEffect(()=>{
      if(editTest===false){
        dispatch(setState([]));
      }
    },[])

    if(testQuestions.length===0){
      return (<Typography variant="h6" style={{color:"#26a69a"}}><i>Test questions will be displayed here...</i></Typography>)
    } else {
    return (
    <div>
      
        {/* <Typography variant="h5"
        align="left"
        gutterBottom
        className={classes.form_title}>The test looks like this</Typography> */}
{editTest===false ? 
        <Button
        startIcon={<CloudUploadIcon />}
        variant="outlined"
        onClick={()=>{setOpenSaveTest(true)}}
        color="primary"
        style={{
        marginButtom: "30px",
        marginLeft: "1px",
        marginRight:"1px"
        }}
        >
        Save test!
        </Button>
        :
        <Button
        startIcon={<CloudUploadIcon />}
        variant="outlined"
        onClick={handleSaveEditedTest}
        color="secondary"
        style={{
        marginButtom: "30px",
        marginLeft: "1px",
        marginRight:"1px",
        color:"#26a69a",
        borderColor:"#26a69a"
        }}
        >
        Save edited test
        </Button>
        }

    <div style={{flexDirection: "column", marginLeft:"1px", marginTop:"35px"}}>
        {testQuestions.map( (question_entry, index) => {
            switch(question_entry.type){
                case "radiobuttons":
                    return(
                    <div key={index} style={{ marginTop:"20px"}}>
                        <div style={{flexDirection: "row"}}>
                            <Button
                            style={{color:"#bdbdbd"}}
                            startIcon={<DeleteIcon style={{color:"#bdbdbd"}}/>}
                            onClick={()=>deleteQuestion(index)}
                            > Delete
                                </Button>
                                
                            <Button
                            style={{color:"#9e9e9e"}}
                           startIcon={<EditIcon style={{color:"#9e9e9e"}}/>} 
                           onClick={()=>editQuestion_(index)}
                           >Edit
                                </Button>
                        </div>
                        <RadiobuttonElement index={index} question={question_entry.question} answersList={question_entry.answersList}  />
                    </div>
                    )//render
                case "checkboxes":
                    return(
                        <div key={index} style={{ marginTop:"20px"}}>
                            <div style={{flexDirection: "row"}}>
                            <Button
                            style={{color:"#bdbdbd"}}
                            startIcon={<DeleteIcon style={{color:"#bdbdbd"}}/>}
                            onClick={()=>deleteQuestion(index)}
                            > Delete
                                </Button>

                            <Button
                            style={{color:"#9e9e9e"}}
                            startIcon={<EditIcon style={{color:"#9e9e9e"}}/>} 
                           onClick={()=>editQuestion_(index)}
                           >Edit
                                </Button>
                        </div>
                            <CheckboxElement index={index} question={question_entry.question} answersList={question_entry.answersList}  />
                        </div>
                        )//render
                case "text":
                    return(
                        <div key={index} style={{ marginTop:"20px"}}>
                             <div style={{flexDirection: "row"}}>
                            <Button
                            style={{color:"#bdbdbd"}}
                            startIcon={<DeleteIcon style={{color:"#bdbdbd"}}/>}
                            onClick={()=>deleteQuestion(index)}
                            > Delete
                                </Button>

                            <Button
                            style={{color:"#9e9e9e", '&hover':{backgroundColor:"blue"}}}
                            startIcon={<EditIcon style={{color:"#9e9e9e"}}/>} 
                           onClick={()=>editQuestion_(index)}
                           >Edit
                                </Button>
                        </div>
                            <Typography>{index+1}.{question_entry.question}</Typography>
                           <TextField           
                            id="outlined-basic" 
                            label="" 
                            variant="outlined"  
                            color="primary"
                            size="small" 
                            style={{marginBottom:"25px",color:"grey"}}
                            value={"Answer as text"}
                            //disabled
                            InputProps={{
                                className: classes.input_grey,
                                classes: {
                                  focused: classes.notchedOutline,
                                  notchedOutline: classes.notchedOutline,
                                }
                              }}
                            //   InputLabelProps={{
                            //     classes: {
                            //       root: classes.cssLabel,
                            //       focused: classes.cssFocused,
                            //       disabled: classes.cssLabel
                            //     },
                            //   }}
                            //   OutlinedInputProps={{
                            //       classes:{
                            //           root: classes.cssFocused,
                            //       }
                            //   }}
                             />
                        </div>
                        )//render
                default:
                    <div></div>
            }
        } )}
         </div>
         <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={openSnackbar} autoHideDuration={9000} onClose={handleCloseSnackbar}
      message="Note archived"
        action={
        <>
            <Button color="primary" size="small" onClick={handleClose}>
            UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
            </IconButton>
        </>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Test saved successfully!
        </Alert>
      </Snackbar>


        {/* Dialog for creating a class */}
        <Dialog
            open={openEditQuestion}
            onClose={()=>{
            setOpenEditQuestion(false);
        }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={classes.slide}
        >
            <div style={{backgroundColor:"#3d3d3d", color: "white", textAlign:"center"}}>
            <DialogTitle id="alert-dialog-title">{"Edit question?"}</DialogTitle>
            <DialogContent >
                <Typography>Will <b>overwrite</b> current question in edit</Typography>
            </DialogContent>
            <div style={{display:"flex", justifyContent:"center"}}>
                <DialogActions>
                <div>
                    <Button onClick={handleEditQuestion} 
                    color="primary" 
                    className={classes.dialog_button}>
                    <b> {"OK"}</b>
                    </Button>
                </div>

                <Button 
                onClick={()=>{setOpenEditQuestion(false); }} 
                color="primary"
                className={classes.dialog_button}>
                    Cancel
                </Button>
                </DialogActions>
            </div>
            </div>
        </Dialog>
        {/* -------------------------- */}

        {/* Dialog for saving test */}
        <Dialog
              open={openSaveTest}
              onClose={()=>{setOpenSaveTest(false);
                setTestDescription('');
                setTestTitle(''); }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className={classes.slide}
            >
              <div style={{backgroundColor:"#3d3d3d", color: "white", textAlign:"center"}}>
              <DialogTitle id="alert-dialog-title">{"Save test"}</DialogTitle>
              <DialogContent >
                <TextField
                    margin="dense"
                    label="title"
                    placeholder=""
                    fullWidth
                    error={false}
                    onChange={(e) => setTestTitle(e.target.value)}
                    InputProps={{
                        className: classes.input
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.cssLabel,
                         // focused: classes.cssFocused,
                        },
                      }}
                />
                <TextField
                    margin="dense"
                    label="description"
                    placeholder="optional"
                    fullWidth
                    multiline
                    rowsMax={3}
                    error={false}
                    onChange={(e) => setTestDescription(e.target.value)}
                    InputProps={{
                        className: classes.input
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.cssLabel,
                         // focused: classes.cssFocused,
                        },
                      }}
                />
              </DialogContent>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <DialogActions>
                    
                    <div>
                      <Button onClick={handleSaveTest} 
                      color="primary" 
                      disabled={false}
                      className={classes.dialog_button}>
                        <b> {"Save"}</b>
                      </Button>
                    </div>

                    <Button 
                    onClick={()=>{
                      setOpenSaveTest(false);
                      setTestDescription('');
                      setTestTitle(''); }} 
                    color="primary"
                    disabled={false}
                    className={classes.dialog_button}>
                      Cancel
                    </Button>
                  </DialogActions>
                </div>
              </div>
            </Dialog>
            {/* -------------------------- */}
            {/*Snackbar for class creation success / for join class success */}
            <Snackbar
              classes={{root:classes.snackbar_success}}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={testSnackbar}
              autoHideDuration={4500}
              onClose={()=>setTestSnackbar(false)}
              // message={classTextSnackbar}
              action={
                <>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={()=>setTestSnackbar(false)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              }
            >
              <MuiAlert elevation={3} variant="filled" severity={testSaveSuccessSnackbar ? "success" : "error"}
                onClose={()=>setTestSnackbar(false)}>
                  {saveTextSnackbar}
                </MuiAlert>
            </Snackbar>
        {/* -------------------------- */}

    </div>
    )
    }
}

export default ShowTestCreated;
/**
 * 
 * 
            <Snackbar open={openSnackbar} autoHideDuration={9000} onClose={handleCloseSnackbar}
      message="Test saved successfully!"
      styles={{backgroundColor:"red", color:"red"}}
        action={
        <>
            <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
            </IconButton>
        </>
        }
      />
 */