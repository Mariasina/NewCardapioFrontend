import { useJwt } from "react-jwt";
import { useNavigate, useParams } from "react-router-dom"; // Importando useParams
import { Box, Stack, Typography } from "@mui/material";
import AnimatedTitle from "../../components/AnimatedTitle";
import { useEffect, useState } from "react";
import { api, getAuth } from "../../api/index.ts";
import { AxiosError } from "axios";
import Navbar from "../../components/Navbar";
import { JwtPayload } from "../../utils/jwt.utils";
import { DateTime } from "luxon";
import { FoodIcon, Title, TitleContainer } from "./styles.tsx";
import glutenGreen from "../../assets/img/GlutenIconGreen.png";
import animalGreen from "../../assets/img/CowIconGreen.png";
import meatGreen from "../../assets/img/MeatIconGreen.png";
import glutenWhite from "../../assets/img/GlutenIconWhite.png";
import animalWhite from "../../assets/img/CowIconWhite.png";
import meatWhite from "../../assets/img/MeatIconWhite.png";
import IngredientTooltip from "./components/IngredientTooltip/index.tsx";
import { useLanguage } from "../../languageContext/LanguageContext.tsx";

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

export default function ViewMenu() {
    document.title = "Cardápio";

    const token = localStorage.getItem("token");
    const [menu, setMenu] = useState<Menu | null>(null); // Inicie como null

    const { isExpired } = useJwt<JwtPayload>(token ?? "");
    const navigate = useNavigate();

    const { languageData } = useLanguage();

    const { date } = useParams<{ date: string }>(); // Pega a data da URL
    const formattedDate = date?.split("-").reverse().join("-"); // Formata para "yyyy-mm-dd" para a API

    const getDishInfos = (ingredients: Ingredient[]) => {
        let hasGluten = false, isMeat = false, isAnimal = false;

        ingredients.forEach((x) => {
            if (x.hasGluten) hasGluten = true;
            if (x.isAnimal) isMeat = true;
            if (x.isAnimal) isAnimal = true;
        });

        return { hasGluten, isMeat, isAnimal };
    };

    if (isExpired || !token) {
        localStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(() => {
        (async () => {
            try {
                // Usar a data recebida como parâmetro na URL (formattedDate)
                if (!formattedDate) return;

                // Fazer a requisição para a rota /menuInfo/:date
                const res = await api.get<MenuResponse>(`/menuInfo/${formattedDate}`, getAuth(token));

                if (res && res.data) {
                    const todayMenu = res.data.menu;
                    setMenu(todayMenu); // Ajuste para usar Menu | null com date do tipo Date
                }
            } catch (err) {
                console.log("Erro ao buscar o menu:", err);
            }
        })();
    }, [token, formattedDate]); // Dependência de formattedDate

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
                            gap: "30px",
                        }
                    }}>
                        <AnimatedTitle title={languageData.menu} />
                    </Stack>
                </Stack>
                <Stack flexDirection={"column"} width={"100%"} padding={"30px"}>
                    {menu ? (
                        <>
                            <Box sx={{ border: "7px solid #115437", height: "", width: "100%", borderRadius: "10px", justifyContent: "space-between" }}>
                                <Stack justifyContent={"space-between"} flexDirection={"row"} flexWrap={"wrap"} gap={"70px"} width={"100%"} padding={"20px 40px"}>
                                    {menu.restaurants.map((menuItem, index) =>
                                        <Stack key={index} width={"400px"} alignItems={"center"}>
                                            <TitleContainer>
                                                <Title>{menuItem.name}</Title>
                                            </TitleContainer>
                                            <p>{menuItem.description}</p>
                                            <Stack>
                                                {menuItem.dishes.map((dishItem, index) =>
                                                    <IngredientTooltip ingredients={dishItem.ingredients} key={index}>
                                                        <Stack flexDirection={"row"} alignItems={"center"} gap={"5px"} key={index}>
                                                            <Stack flexDirection={"row"} gap={"3px"} key={index} width={"70px"}>
                                                                {(() => {
                                                                    const { hasGluten, isAnimal, isMeat } = getDishInfos(dishItem.ingredients);
                                                                    return <>
                                                                        {hasGluten && <FoodIcon src={glutenGreen}></FoodIcon>}
                                                                        {isAnimal && <FoodIcon src={animalGreen}></FoodIcon>}
                                                                        {isMeat && <FoodIcon src={meatGreen}></FoodIcon>}
                                                                    </>
                                                                })()}
                                                            </Stack>
                                                            <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>{dishItem.name}</Typography>
                                                        </Stack>
                                                    </IngredientTooltip>
                                                )}
                                            </Stack>
                                        </Stack>
                                    )}
                                </Stack>
                                <Stack alignItems={"flex-end"} justifyContent={"space-between"} flexDirection={"row"}>
                                    <Box sx={{ backgroundColor: "#115437", border: "7px solid #115437", borderRadius: "0px 30px 0px 0px", width: "200px", display: "flex", justifyContent: "center" }}>
                                        <Typography fontFamily={"Margarine"} fontSize={"1.3rem"} color="white">
                                            {DateTime.fromJSDate(new Date(menu.date))
                                                .plus({ days: 1 })
                                                .setZone('America/Sao_Paulo')
                                                .toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ backgroundColor: "#115437", border: "7px solid #115437", borderRadius: "30px 0px 0px 0px", width: "540px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", padding: "5px 15px" }}>
                                        <Stack gap={"4px"} flexDirection={"row"} alignItems={"center"}>
                                            <FoodIcon src={glutenWhite}></FoodIcon>
                                            <Typography fontFamily={"Marcellus"} fontSize={"1rem"} color="white">Contém Gluten</Typography>
                                        </Stack>
                                        <Stack gap={"4px"} flexDirection={"row"} alignItems={"center"} >
                                            <FoodIcon src={animalWhite}></FoodIcon>
                                            <Typography fontFamily={"Marcellus"} fontSize={"1rem"} color="white">Derivados de Animais</Typography>
                                        </Stack>
                                        <Stack gap={"4px"} flexDirection={"row"} alignItems={"center"} >
                                            <FoodIcon src={meatWhite}></FoodIcon>
                                            <Typography fontFamily={"Marcellus"} fontSize={"1rem"} color="white">Contém Carne</Typography>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Box>
                        </>
                    ) : (
                        <p>{languageData.menu_unavailable}</p>
                    )}
                </Stack>
            </Stack>
        </>
    );
}
