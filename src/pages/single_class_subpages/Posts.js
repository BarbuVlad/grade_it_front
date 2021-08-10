import { useSelector, useDispatch } from "react-redux";
import { Container, Divider, Typography } from '@material-ui/core';
import { useEffect, useState } from "react";

import List from "@material-ui/core/List";
import Post from "../../components/Post";
import PostsDrawer from "../../components/PostsDrawer";
const Posts = () => {
    const [posts, setPosts] = useState("");
    const [refreshCounter, setRefreshCounter] = useState(0);

    useEffect(() => {
        const fetch_posts = async () =>{
            try{
              const posts_fetch = await fetch(`http://192.168.206.129:5000/classes/posts`, {
                method: 'GET',
                headers: {"Content-type": "application/json",
                            "x-auth-token": localStorage.getItem("token"),
                            "x-auth-token-class": localStorage.getItem("token_class")
                            }
            });//
            const data = await posts_fetch.json(); 
            if(data["code"]==0){
                setPosts(data["posts"]);
                console.log(data["posts"])
              return;
            }
            if(data["code"]==1){///< not registerd in any classes
                setPosts("You are not registered in any classes. Empty feed");
              return;
            }
            if(data["code"]==2){// DB error
              alert("Can't fetch feed. Network error!");
              return;
            }
            if(data["code"]==3){// No feed 
                setPosts("No activity from this class...");
              return;
            }

            } catch(err){
                alert("Can't fetch feed. Network error!");
            }
        }
        while(localStorage.getItem("token_class") === undefined){continue;}
        //console.log("POSTS:",localStorage.getItem("id_class"));
        console.log("DEBUG: IN POSTS; id_class: ", localStorage.getItem("id_class"));
        fetch_posts();
      }, [refreshCounter]);

    
      const handleRefresh = () => {
        setRefreshCounter(refreshCounter+1);
      }
    return (
     <Container style={{color:"white", display:"flex", justifyContent:"space-evenly",
     alignItems:"flex-start", alignContent:"space-around"}}>
        {
           (typeof posts === "object") ? 
           <List>
           {posts.map((post)=>(
               <Post
               post={post}
               inClassPost={true}
               handleRefresh={handleRefresh}
               />
           ))}
           </List>
           :
           <div>
               <Typography variant="h6"style={{marginTop:200, marginBottom:10}}>{posts}</Typography>
                <Divider />
           </div>
        }
        
        <PostsDrawer handleRefresh={handleRefresh}/>
    </Container>
    )
}

export default Posts;
