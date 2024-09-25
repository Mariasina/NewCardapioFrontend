import { useJwt } from "react-jwt";
import CustomPagination from "../../components/CustomPagination";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()
    const {decodedToken, isExpired} = useJwt<any>(localStorage.getItem("token")!)

    if(isExpired || !localStorage.getItem("token")){
        localStorage.removeItem("token")
        navigate("/login")
    }


    if (decodedToken)
        alert(decodedToken.sub)

    return (
        <>
            <NavBar/>
            <CustomPagination pages={8}/>
        </>
    )
}