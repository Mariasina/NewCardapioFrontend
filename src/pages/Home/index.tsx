import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import AnimatedTitle from "../../components/AnimatedTitle";
import { useEffect, useState } from "react";
import { api, getAuth } from "../../api/index.ts";
import { AxiosError } from "axios";
import Navbar from "../../components/Navbar";
import { JwtPayload } from "../../utils/jwt.utils";
import { DateTime } from "luxon";
import { Title, TitleContainer } from "./styles.tsx";
import gluten from "../../assets/img/GlutenIconGreen.png"
import animal from "../../assets/img/CowIconGreen.png"
import meat from "../../assets/img/MeatIconGreen.png"

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
    menu: Menu;
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
            try {
                // Obter a data de hoje em UTC no formato 'YYYY-MM-DD'
                const today = DateTime.utc().toISODate();

                // Fazer a requisição para a rota /menuInfo/:date
                const res = await api.get<MenuResponse>(`/menuInfo/${today}`, getAuth(token));

                if (res && res.data) {
                    const todayMenu = res.data.menu;

                    setMenu(todayMenu); // Ajuste para usar Menu | null com date do tipo Date
                }
            } catch (err) {
                console.log("Erro ao buscar o menu:", err);
            }
        })();
    }, [token]); // Dependência de token

    // Logar o valor de menu após ser atualizado
    useEffect(() => {
        console.log("Menu atual:", menu);
    }, [menu]);

    return (
        <>
            <Navbar />
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
                        {menu ? (
                            <>
                                <Box sx={{ border: "7px solid #115437", height: "", width: "100%", borderRadius: "10px", justifyContent: "space-between"}}>
                                    <Stack justifyContent={"space-between"} flexDirection={"row"} flexWrap={"wrap"} gap={"70px"} width={"100%"} padding={"20px 40px"}>
                                        {menu.restaurants.map((menuItem, index) => 
                                            <Stack key={index} width={"400px"} alignItems={"center"}>
                                                <TitleContainer>
                                                    <Title>{menuItem.name}</Title>
                                                </TitleContainer>
                                                <p>{menuItem.description}</p>
                                                <Stack>
                                                {menuItem.dishes.map((dishItem, index) => 
                                                    <Stack flexDirection={"row"} alignItems={"center"} gap={"5px"}  key={index}>
                                                        {dishItem.ingredients.map((ingredientItem, index) => 
                                                            <Stack key={index}>
                                                                {ingredientItem.hasGluten ? <img src={gluten}></img> : null}
                                                                {ingredientItem.isAnimal ? <img src={animal}></img> : null}
                                                                {ingredientItem.isMeat ? <img src={meat}></img> : null}
                                                            </Stack>
                                                        )}
                                                        <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>{dishItem.name}</Typography>
                                                    </Stack>
                                                )}
                                                </Stack>
                                            </Stack>
                                        )}
                                    </Stack>
                                    <Stack alignItems={"center"} justifyContent={"space-between"} flexDirection={"row"}>
                                        <Box sx={{backgroundColor: "#115437", width: "500px"}}>
                                        </Box>
                                        <Box sx={{backgroundColor: "#115437", border: "7px solid #115437", borderRadius: "50px 50px 0px 0px", width: "200px", display: "flex", justifyContent: "center"}}>
                                            <Typography fontFamily={"Margarine"} fontSize={"1.3rem"} color="white">{(new Date(new Date(menu.date).setDate(new Date(menu.date).getDate() + 1))).toLocaleDateString()}</Typography>
                                        </Box>
                                        <Box sx={{backgroundColor: "#115437", border: "7px solid #115437", borderRadius: "50px 0px 0px 0px", width: "500px", display: "flex", justifyContent: "center"}}>
                                            <Typography fontFamily={"Margarine"} fontSize={"1.3rem"} color="white">{(new Date(new Date(menu.date).setDate(new Date(menu.date).getDate() + 1))).toLocaleDateString()}</Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            </>
                        ) : (
                            <p>Nenhum cardápio disponível para hoje.</p>
                        )}
                </Stack>
            </Stack>
        </>
    );
}
