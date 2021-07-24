import { useSelector ,useDispatch } from "react-redux";
import Layout from '../Layout';
import { Container, Divider, Typography } from '@material-ui/core';

import { useEffect, useState } from "react";
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons';

import List from "@material-ui/core/List";

import { setMenu } from "../redux/menuSlice";
import Post from "../components/Post";
const Home = () => {
    const jwt = useSelector((state)=>state.jwt);

    const [feed, setFeed] = useState("");
    const dispatch = useDispatch();
    const menuItems = [
        {
            text: "TestText",
            icon: <SubjectOutlined color="primary" />,
            path: '/app/home'
        },
        {
            text: "TestText2",
            icon: <AddCircleOutlined color="primary" />,
            path: '/'
        },
    ];
    useEffect(() => {

        dispatch(setMenu(menuItems));

        const fetch_feed = async () =>{
            try{
              const feed_fetch = await fetch(`http://192.168.206.129:5000/users/feed`, {
                method: 'GET',
                headers: {"Content-type": "application/json",
                            "x-auth-token": localStorage.getItem("token")
                            }
            });
            const data = await feed_fetch.json(); 
            if(data["code"]==0){
              setFeed(data["feed"]);
              return;
            }
            if(data["code"]==1){///< not registerd in any classes
              setFeed("You are not registered in any classes. Empty feed");
              return;
            }
            if(data["code"]==2){// DB error
              alert("Can't fetch feed. Network error!");
              return;
            }
            if(data["code"]==3){// No feed 
              setFeed("No activity from your classes...");
              return;
            }

            } catch(err){
                alert("Can't fetch feed. Network error!");
            }
        }
        fetch_feed();
        //console.log("\nFEED: ", feed, "\ntype: ", typeof feed);

        //console.log("Chaneg item")

        // return () => {
          
        // }
      }, []);
    
    return (
     <Container style={{color:"white", display:"flex", justifyContent:"space-evenly",
     alignItems:"flex-start", alignContent:"space-around"}}>
        {
           (typeof feed === "object") ? 
           <List>
           {feed.map((post)=>(
               <Post
               post={post}
               />
           ))}
           </List>
           :
           <div>
               <Typography variant="h6"style={{marginTop:200, marginBottom:10}}>{feed}</Typography>
                <Divider />
           </div>
        }
    </Container>
    )
}

export default Home;
