import { useSelector ,useDispatch } from "react-redux";
import Layout from '../Layout';
import { Button, Container, Divider, Typography } from '@material-ui/core';

import { useEffect, useState } from "react";
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons';

import List from "@material-ui/core/List";

import { setMenu } from "../redux/menuSlice";
import Post from "../components/Post";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const Home = () => {
    const jwt = useSelector((state)=>state.jwt);

    const [feed, setFeed] = useState("");

    const [openInviteConfirmation, setOpenInviteConfirmation] = useState(false);
    const [inviteConfirmationText, setInviteConfirmationText] = useState("");

    // const dispatch = useDispatch();
    // const menuItems = [
    //     {
    //         text: "TestText",
    //         icon: <SubjectOutlined color="primary" />,
    //         path: '/app/home'
    //     },
    //     {
    //         text: "TestText2",
    //         icon: <AddCircleOutlined color="primary" />,
    //         path: '/'
    //     },
    // ];
    useEffect(() => {

        //dispatch(setMenu(menuItems));

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

        if(localStorage.getItem("invite_token") !== undefined){
          console.log(localStorage.getItem("invite_token"));
        }

        //handle invite (if exists)
        if(localStorage.getItem("invite_token")){
          console.log(localStorage.getItem("invite_token"));
          const fetch_accept_invite = async () =>{
            try{
              const accept_invite_fetch = await fetch(`http://192.168.206.129:5000/emailService/acceptInvite`, {
                  method: 'POST',
                  headers: {"Content-type": "application/json",
                              "x-auth-token": localStorage.getItem("token")
                              },
                  body:JSON.stringify({"token":localStorage.getItem("invite_token")})
              });
              const data = await accept_invite_fetch.json(); 
              if(data["code"]==0){
                setOpenInviteConfirmation(true);
                setInviteConfirmationText(`Successfull! ${data["message"]}`);
                return;
              } else{///< not registerd in any classes
                setOpenInviteConfirmation(true);
                setInviteConfirmationText(`Invitation error! ${data["message"]}`);
                return;
              }
            } catch(err){
                alert("Can't fetch invite confirmation. Network error!");
            }
          }
          fetch_accept_invite();
        }

        //console.log("\nFEED: ", feed, "\ntype: ", typeof feed);

        //console.log("Chaneg item")

         return () => {
          localStorage.removeItem("invite_token");
         }
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

      <Dialog
        open={openInviteConfirmation}
        onClose={()=>{setOpenInviteConfirmation(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{backgroundColor:"#3d3d3d", color: "white", textAlign:"center"}}>
        <DialogTitle id="alert-dialog-title">{"Invite confirmation"}</DialogTitle>
        <DialogContent >
              <DialogContentText id="alert-dialog-description" style={{color:"white"}}>
                  {inviteConfirmationText}

              </DialogContentText>
        </DialogContent>
          <div style={{display:"flex", justifyContent:"center"}}>
            <DialogActions>
              <Button onClick={()=>{setOpenInviteConfirmation(false)}} color="primary">
                {"OK"}
              </Button>
            </DialogActions>
          </div>
        </div>
      </Dialog>

    </Container>
    )
}

export default Home;
