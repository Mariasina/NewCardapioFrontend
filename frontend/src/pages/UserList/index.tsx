import { Fab, Stack, Typography } from "@mui/material";
import NavBar from "../../components/NavBar";
import UserCard from "./components/UserCard";
import AnimatedTitle from "../../components/AnimatedTitle";
import { CardContainer } from "./styles";
import CustomPagination from "../../components/CustomPagination";

function UserList() {
    return (
        <>
            <NavBar />
            <Stack alignItems={"center"} justifyContent={"center"} width={"100%"} pt={10}>
                <Stack bgcolor="#F8F4EB" sx={{ width: "90%", maxWidth: "1000px" }}>
                    <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{
                        "@media screen and (max-width: 425px)": {
                            flexDirection: "column-reverse",
                            gap: "30px"
                        }
                    }}>
                        <AnimatedTitle title={"Registered Users"} />
                        <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"center"} gap={2}>
                            <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>Add new User</Typography>
                            <Fab color="inherit" sx={{
                                backgroundColor: "#CCA67F",

                                ":hover": {
                                    backgroundColor: "#dec4ab",
                                }

                            }} aria-label="add">
                                <span className="material-symbols-outlined">add</span>
                            </Fab>
                        </Stack>
                    </Stack>
                    <Stack alignItems={"center"} justifyContent={"center"}>
                        <CardContainer>
                            <UserCard />
                        </CardContainer>
                    </Stack>
                </Stack>
            </Stack>
            <Stack alignItems={"center"}>

                <CustomPagination pages={2} />
            </Stack>
        </>
    )
}

export default UserList;