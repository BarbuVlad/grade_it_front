
import { makeStyles } from '@material-ui/core';
const drawerWidth = 240;
const appBarHeight = 65;
const useStyles = makeStyles( (theme) => {
    return {
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        }
        },

    page: {
        width: "100%",
    },

    drawer: {
        width: drawerWidth,
        position: "fixed",
        top: 0,
        left: 0,
        flexShrink: 0,
        //backgroundColor:"blue"
    },

    drawer_plus: {
        backgroundColor:"#3d3d3d"
    },
    root: {
        display:'flex',
        //justifyContent:"flex-start",
        //alignItems:"flex-start",
        padding:10
    },
    active: {
        color: "white",
        background: '#4f4f4f',
        marginTop:15,
        '&:hover': { background: '#474747',},
    },
    inactive: {
        color: "white",
        marginTop:15,

    },

    appbar: {
        width: `calc(100% - ${drawerWidth}px)`,
        //width: "100%",
        height: appBarHeight,
        marginLeft: 150,//drawerWidth
        flexShrink: 3,
        display:'flex',
        alignItems:"space-around",
        justifyContent:"center",
    },
    navigation_buttons:{

    },
    logout_bnt:{
       // alignSelf:"center",
        position: "absolute",
        top: 12,
        left: -215+100,

        color:"#ad2d05",
        borderColor:"#ad2d05",
    },

    toolbar: {
        marginTop: "75px",
        marginLeft: 100,//drawerWidth,
    },
    //mixin from theme
    //toolbar: theme.mixins.toolbar
    link: {
        marginLeft:"22px",
        marginRight:"22px",
        fontWeight:"bold",
        fontSize:"15px"
    },

    //Dialog text, textField
    input: {
        color: "white",
      },
      cssLabel: {
        color : 'grey'
      },
      cssFocused:{
        color : 'blue',
        backgroundColor : 'blue'
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

      dialog_button:{
        //color:"#ff8a65",
        //borderColor:"#ff8a65",
        '&:disabled': {
            color:"#6f7373",
            borderColor:"#6f7373",
         },
      snackbar_success:{
        root:{backgroundColor:"red", color:"red"}
      },
      snackbar_fail:{
          root:{backgroundColor:"red"}
      },
      
    },
}
});
export default useStyles;
export {appBarHeight ,drawerWidth};