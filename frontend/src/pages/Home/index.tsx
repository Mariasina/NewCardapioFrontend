import CustomPagination from "../../components/CustomPagination";
import NavBar from "../../components/NavBar";

export default function Home() {
    return (
        <>
            <NavBar/>
            <CustomPagination pages={8}/>
        </>
    )
}