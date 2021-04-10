import Button from  '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from  '@material-ui/core/Container';

import Popup from 'reactjs-popup';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  header: {
    //width: "50%",
    borderBottom: "1px solid gray",
   // fontSize: "18px",
    textAlign: "center",
    padding: "5px",
    color: "#e6e6e6",
  },
  header_err: {
    //width: "50%",
    borderBottom: "1px solid gray",
   // fontSize: "18px",
    textAlign: "center",
    padding: "5px",
    color: "#eb4949",
  },

  content: {
  //  fontSize: "12px",
    width: "50%",
    textAlign: "center",
    padding: "10px 5px",
    color:"#e6e6e6",
  },

  actions: {
    fontSize: "12px",
    width: "50%",
    padding: "10px 5px",
    margin: "auto",
    textAlign: "center",
    color:"#e6e6e6",
  },

  close: {
    
    cursor: "pointer",
    position: "absolute",
    display: "block",
    padding: "2px 5px",
    lineHeight: "20px",
    right: "-10px",
    top: "-10px",
    fontSize: "24px",
    background: "#ffffff",
    bordeRadius: "18px",
    border: "1px solid #cfcece",
    
  },


  button: {
    //color:"#e6e6e6",
    fontSize: "18px",
    backgroundColor:"#e6e6e6",//"#ffc107",
    '&:hover': {
        backgroundColor: '#ff8f00',
    },
    marginTop:35
},

  container_register: {

    display:"flex",
    flexDirection:"column",
    placeItems:"center",
    alignSelf: "flex-start",

    /*
    flexFlow:"center",
    justifyContent:"center",
    alignItems:"center",
    alignContent:"center",*/
    marginTop:25, 
    
    //padding:50,
    paddingBottom:30, 
    paddingTop:25,
    paddingLeft:50,
    paddingRight:50,

    backgroundColor:"#242424",
    
   // boxShadow:"3px 3px 1px grey",
    
},

  container_top: {
    flexFlow:"flex-start",
    justifyContent:"flex-start",
    alignItems:"flex-start",
    alignContent:"flex-start",
  },


});

const contentStyle = {
  maxWidth: "600px",
  width: "90%",
  height:"100%"
};
// trigger={button_element}
const PopupBox = ({trigger_function, title, body, isError}) => {

  const classes = useStyles();
  return(
<Container className={classes.container_top}>
  <Popup
    trigger={trigger_function}
    modal
    nested
    defaultOpen={false}
    contentStyle={contentStyle}
   // className={classes.container_register}
  >
    {close => (
      <div className={classes.container_register}>

        <Typography variant="h4" className={ isError ? classes.header_err : classes.header}> 
          {title} </Typography>

        <Typography variant="body1" gutterBottom className={classes.content}>
          {' '}
          {body}
        </Typography>
        <div className={classes.actions}>
          <Button
            className={classes.button}
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            close
          </Button>
        </div>
      </div>
    )}
  </Popup>
  </Container>
  );
}

//<Container className={classes.container_top}>
export default PopupBox;
