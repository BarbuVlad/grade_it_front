import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      //minWidth:"30em",
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      alignSelf:"flex-start",
      minWidth: "25em",
      maxWidth: "35em",
      backgroundColor:"#3d3d3d",//#3d3d3d #6e6e6e
      color: "#ededed",
      //flexShrink:"3",
      padding:10
    },
    subheader: {
      //color: "#ededed",
    },

    buttonProgress:{
        alignSelf:"center"
    }
  }));

export default useStyles;