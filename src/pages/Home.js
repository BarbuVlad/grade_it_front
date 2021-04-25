import { useSelector } from "react-redux";
import Layout from '../Layout';
import { Container } from '@material-ui/core';

const Home = () => {
    const jwt = useSelector((state)=>state.jwt)

    return (
     <Container style={{color:"white", display:"flex", justifyContent:"space-evenly",
     alignItems:"flex-start", alignContent:"space-around"}}>
           <h2> Home page ------------ <br /> {jwt.id} <br />  {jwt.token} </h2>
    </Container>
    )
}

export default Home;
