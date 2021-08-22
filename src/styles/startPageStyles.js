import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles( (theme) => {
    return {
        item_left:{
            //backgroundColor:"red",
            display:"flex",
            flexDirection:"column",
            backgroundColor:"#d6d6d6",
            minHeight: "100vh",
            alignItems:"felx-start",
            justifyContent:"center",
            paddingLeft:"2em",
            paddingRight:"2em",

        },
        item_right:{
            display:"flex",
            minHeight: "100vh",
            textAlign:"center",
            alignItems:"center",
            justifyContent:"center",
            //alignSelf:"center"
        },

        buttons:{
            
            display:"flex",
            flexDirection:"row",
            padding:"50",
            
        },

        btn:{
            color:"#e67a20",
            borderColor:"#e67a20",
            outlineColor:"#e67a20"

        },
        
}
});
export default useStyles;