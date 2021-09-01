import { makeStyles } from '@material-ui/core';
const drawerWidth = 240;
const appBarHeight = 65;
const useStyles = makeStyles( (theme) => {
    return {
        list_item:{
            marginTop:10
        },
    root:{
        display:"flex",
        justifyContent:"center",//center
        alignItems:"center",//center
        flexDirection:"column",

        backgroundColor: "#4f4f4f",
        color:"white",
        minWidth: "55%",
        maxWidth: "85%",

    },
    header: {
        display:"flex",
        justifyContent:"flex-start",//center
        alignItems:"flex-start",//center
        alignSelf:"flex-start",//center
        flexDirection:"row",
    },
    header_username:{
        marginRight:10,
        marginLeft:5
    },
    header_date:{
        marginRight:10,
        marginLeft:5
    },
    header_class:{
        marginRight:10,
        marginLeft:5,
        color:"#ffc107"
    },

    divider: {
        marginTop:3,
        marginBottom:10
    }
}
});
export default useStyles;