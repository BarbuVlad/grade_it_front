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

}
});
export default useStyles;