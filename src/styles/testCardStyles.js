import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display:"flex",
      flexDirection:"column",
      justifyContent:"flex-end",

      minWidth:"28em",
      maxWidth: "28em",
      backgroundColor:"#3d3d3d",//#3d3d3d #6e6e6e
      color: "#ededed",
      flexShrink:"3",
    //  padding: 0,
      //margin: 20,
      marginLeft: 40,
            '&:hover' : {
        backgroundColor: '#474747',
      },
      
    },

    cardText:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start",
},
    subheader: {
     // height: 0,
      //paddingTop: '56.25%', // 16:9
      color: "#ededed",
    },
    // action_btn:{
    //   color:"#ffc107",
    //   '&:hover' : {
    //     backgroundColor: '#ff8f00',
    //   },
    // },

    button_action_confirm: {
      minWidth:"50%",
      fontSize: 17,
      color:"#ffc107",

      display:"flex",
      flexDirection:"column",
      alignSelf:"flex-end"
    }, 
    button_action_sch: {
      minWidth:"50%",
      fontSize: 17,
      color:"#26a69a",

      display:"flex",
      flexDirection:"column",
      alignSelf:"flex-end"
    }, 
    button_st:{      
      minWidth:"100%",
      fontSize: 17,
  
      display:"flex",
      flexDirection:"column",
      alignSelf:"flex-end"
  },

  container: {
    //display: 'flex',
    //flexWrap: 'wrap',
    marginTop:25
  },
  // textField: {
  //   marginLeft: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  //   width: 200,
  // }
  //Dialog text, textField
  input: {
    color: "white",
  },
  cssLabel: {
    color : '#b5b5b5',//grey
    fontSize:22,
    borderColor:"#b5b5b5",//grey
    '&hover':{
        color:"grey"
    }
  },

  btn:{
    marginTop:25,
    marginBottom:10,
    fontSize:18
  },



  }));

export default useStyles;