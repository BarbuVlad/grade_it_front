import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth:"20em",
      maxWidth: "50em",
      backgroundColor:"#3d3d3d",//#3d3d3d #6e6e6e
      color: "#ededed",
      padding: 5
      
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
  }));

export default useStyles;