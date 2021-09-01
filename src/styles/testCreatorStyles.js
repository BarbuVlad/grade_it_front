import { makeStyles } from "@material-ui/core/styles";
/*
1. Create a hook called useStyles
2. useStyles = function call of makeStyles
3. makeStyles has a callback function ()=>{...
4. callback f. returnes an object with all the styles
+ (theme)=>...
is optional, it offers more styling options 
Material UI is using this CSS in JS syntax
 */
const useStyles = makeStyles((theme)=>({
    root: {
        flexGrow: 1,
       // backgroundColor:"green"
      },

      dual_container: {
        justifyContent: "center",
        alignItems: "stretch",
        alignSelf:"stretch",
        flexDirection: "row",
        flexGrow: 1,
        
    },

    q_form_container: {
      //  backgroundColor:"#e6e6e6",
    },

    form: {
        //padding:"10%",
        marginTop: "25px",
        marginLeft:"-3rem"
    },

    form_title:{
        //textDecoration: "underline",
        marginBottom: "5px"
    },

    answer: {
        marginTop: "30px",
        marginButtom: "15px",
        //marginLeft: "15px",
        marginRight:"10px",
        width:"75%",
       // alignSelf:"flex-end"

    },
    //Dialog text, textField
    input: {
        color: "white",
        borderColor:"#b5b5b5",//grey
        '&hover':{
            color:"grey"
        }
    },
    cssLabel: {
        color : '#b5b5b5',//grey
        borderColor:"#b5b5b5",//grey
        '&hover':{
            color:"grey"
        }
    },
    cssFocused:{
        color : '#b5b5b5',
       // backgroundColor : 'blue',
        borderColor:"#b5b5b5",
        '&hover':{
            color:"grey"
        }
    },
    
    input_grey: {
        color: "#b5b5b5",
    },
    answer_checkbox: {
        marginTop: "27px",
        marginButtom: "10px",
        marginRight:"15px",
        //color:"red",
    },
    answerCheck: {
        //color:"red",
    },

    q_show_container: {
       // backgroundColor:"#dbdbdb",
        flexDirection: "row"

    },


    container: {
       // backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(4,0,6) //multiply by 8 -> 64px 0px 48px
    },

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },



})
);

export default useStyles;