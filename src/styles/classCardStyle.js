import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      backgroundColor:"#6e6e6e",
      color: "#ededed",
      
    },
    subheader: {
     // height: 0,
      //paddingTop: '56.25%', // 16:9
      color: "#ededed",
    },
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