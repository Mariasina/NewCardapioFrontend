import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import AnimatedTitle from "../../components/AnimatedTitle";
import { useEffect, useState } from "react";
import { api, getAuth } from "../../api";
import { AxiosError } from "axios";
import { DefaultResponse } from "../../types";
import NavBar from "../../components/NavBar";
import { JwtPayload } from "../../utils/jwt.utils";

export type Menu = {
    date: Date;
    restaurants: Restaurant[];
};

export type Restaurant = {
    id: string;
    name: string;
    description: string;
    dishes: Dish[];
};

export type Dish = {
    id: string;
    name: string;
    ingredients: Ingredient[];
};

export type Ingredient = {
    id: string;
    name: string;
    hasGluten: boolean;
    isAnimal: boolean;
    isMeat: boolean;
};

type MenuResponse = {
    message: string;
    menus: Menu[];
};

export default function Home() {
    document.title = "Home";

    const token = localStorage.getItem("token");
    const [menu, setMenu] = useState<Menu | null>(null); // Inicie como null

    const { isExpired } = useJwt<JwtPayload>(token ?? "");
    const navigate = useNavigate();

    if (isExpired || !token) {
        localStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(() => {
        (async () => {
            const res = await api.get<MenuResponse>("/menu/:date", getAuth(token)).catch((err: AxiosError<DefaultResponse>) => {
                alert(err.response?.data.message);
            });

            if (!res) {
                return;
            }

            // Converta as datas e filtre para encontrar o menu de hoje
            const today = new Date();
            const todayString = today.toISOString().split('T')[0]; 
            console.log(today.toISOString())

            const todayMenu = res.data.menus
                .map((m) => ({ ...m, date: new Date(m.date) })) 
                .find((m) => m.date.toISOString().split('T')[0] === todayString); 

            setMenu(todayMenu || null); 
        })();
    },[]);


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
                        <AnimatedTitle title={"Cardápio de hoje"} />
                    </Stack>
                </Stack>
                <Stack flexDirection={"column"} width={"100%"} padding={"30px"}>
                    <Box sx={{ border: "7px solid #0C482E", height: "600px", width: "100%", borderRadius: "10px" }}>
                        {menu ? (
                            <p>{menu.date.toLocaleDateString()}</p> 

                        ) : (
                            <p>Nenhum cardápio disponível para hoje.</p> 
                        )}
                    </Box>
                </Stack>
            </Stack>
        </>
    );
}
