import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth:"30em",
      maxWidth: "30em",
      backgroundColor:"#3d3d3d",//#3d3d3d #6e6e6e
      color: "#ededed",
      flexShrink:"3",
    //  padding: 0,
      margin: 20,
            '&:hover' : {
        backgroundColor: '#474747',
      },
      
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
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },

    button_action_confirm: {
      minWidth:"50%",
      fontSize: 17,
      color:"#ffc107",

      '&:disabled' : {
        color:"#8a6907",
      },
    }, 

    button_action_block: {
      minWidth:"50%",
      fontSize: 17,
      color:"#e53935",
      '&:disabled' : {
        color:"#8a2220",
      },
    }, 

    button_action_unblock: {
      minWidth:"50%",
      fontSize: 17,
      color:"#07a8e3",
      '&:disabled' : {
        color:"#046a8f",
      },

    }, 
  }));

export default useStyles;