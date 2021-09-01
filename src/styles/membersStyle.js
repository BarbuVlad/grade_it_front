import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles( (theme) => {
    return {
    root:{
        display:"flex",
        justifyContent:"center",//center
        alignItems:"flex-start",//center
        flexDirection:"row",
        //paddingLeft:"10em",
        textAlign:"center",

        //backgroundColor: "#4f4f4f",
        //color:"grey",
        //minWidth: "55%",
        //maxWidth: "85%",
    },
    titles:{
        //textAlign:"center",
        //color:"blue"
        alignSelf:"flex-start",
        justifyContent:"flex-start",//center
        alignItems:"flex-start",//center
    },
    input: {
        color: "white",
      },
      cssLabel: {
        color : 'grey'
      },

      //progress at creating class
      buttonProgress: {
        color: "#08d126",
        position: 'absolute',
        top: '55%',
        left: '47%',
        marginTop: -12,
        //marginLeft: -12,
      },

}
});
export default useStyles;