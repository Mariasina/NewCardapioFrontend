import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import AnimatedTitle from "../../components/AnimatedTitle";
import { useEffect, useState } from "react";
import { api, getAuth } from "../../api/index.ts";
import { AxiosError } from "axios";
import { DefaultResponse } from "../../types";
import Navbar from "../../components/Navbar";
import { JwtPayload } from "../../utils/jwt.utils";
import { DateTime } from "luxon";

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
            try {
                const res = await api.get<MenuResponse>("/menu", getAuth(token));

                if (res && res.data) {
                    // Obter a data de hoje em UTC no formato 'YYYY-MM-DD'
                    const today = DateTime.utc().toISODate();

                    // Encontrar o menu de hoje
                    const todayMenuData = res.data.menus.find((m) =>
                        DateTime.fromISO(m.date.toString(), { zone: "utc" }).toISODate() === today
                    );

                    // Converter todayMenuData para Menu com date no tipo Date para evitar erro de tipo
                    const todayMenu = todayMenuData
                        ? {
                            ...todayMenuData,
                            date: new Date(todayMenuData.date), // Converte date de volta para Date
                        }
                        : null;

                    setMenu(todayMenu); // Ajuste para usar Menu | null com date do tipo Date
                }
            } catch (err) {
                console.log("Erro ao buscar o menu:", err);
                if (err instanceof AxiosError) {
                    alert(err.response?.data?.message || "Erro ao buscar o menu.");
                }
            }
        })();
    }, []);




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
                    <Box sx={{ border: "7px solid #0C482E", height: "600px", width: "100%", borderRadius: "10px" }}>
                        {menu ? (
                            <p>{new Date(menu.date.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                        ) : (
                            <p>Nenhum cardápio disponível para hoje.</p>
                        )}

                    </Box>
                </Stack>
            </Stack>
        </>
    );
}
