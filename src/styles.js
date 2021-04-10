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


const useStyles = makeStyles({
    btn: {
        fontSize: 23,
       // backgroundColor:"#ffc107",
        '&:hover' : {
            backgroundColor: '#ff8f00',
        },
        marginTop:35
    },

    popup_box: {
        marginBottom: 20,
        marginTop: 20,
        flexFlow:"center",
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center",
        backgroundColor:"#fffffff",

    },

    text: {
        fontWeight: 'bold',
        marginBottom: 1,
        align: "center"
    },

    text_second: {
        fontStyle: 'italic',
        marginBottom: 15,
        align: "center"
    },

    text_account: {
        fontWeight: 'bold',
        marginBottom: 1,
        align: "center",
        color:"#eeeeee"
    },
    
    field: {
        marginBottom: 20,
        marginTop: 20,
        textAlign:"center"

    },

    container: {
        flexFlow:"center",
        justifyContent:"center",
        alignItems:"stretch",
        alignContent:"center",

        textAlign:"center",
        marginTop:100, 

        //padding:50,
        paddingBottom:50, 
        paddingTop:25,
        paddingLeft:50,
        paddingRight:50,

        backgroundColor:"#eeeeee",
        boxShadow:"3px 3px 1px black"
    },

    container_create_account: {
        flexFlow:"center",
        justifyContent:"center",
        alignItems:"stretch",
        alignContent:"center",

        textAlign:"center",
        marginTop:100, 

        //padding:50,
        paddingBottom:50, 
        paddingTop:25,
        paddingLeft:50,
        paddingRight:50,

        backgroundColor:"#1c1c1c",
        boxShadow:"3px 3px 1px black"
    },

    container_register: {

        display:"grid",
        placeItems:"center",
        /*
        flexFlow:"center",
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center",*/

        textAlign:"center",
        marginTop:100, 

        //padding:50,
        paddingBottom:50, 
        paddingTop:25,
        paddingLeft:50,
        paddingRight:50,

        backgroundColor:"#eeeeee",
        boxShadow:"4px 4px 1px black"
    },
    
});
export default useStyles;