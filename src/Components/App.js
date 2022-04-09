import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../Components/LoginPage";
import SignInPage from "../Components/SignInPage";
import PlansPage from "../Components/PlansPage";
import PlanPage from "../Components/PlanPage";
import Home from "../Components/Home";
import GlobalStyle from "../GlobalStyle";
import UserContext from "./UserContext";
import { useState } from "react";


export default function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [membership, setMembership] = useState(localStorage.getItem("membership"))
    const [infoPlan, setInfoPlan] = useState(null);
    const [infoPlanName, setInfoPlanName] = useState(null);
    const autentication = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    
    return (
        <UserContext.Provider value={{token, setToken, membership, setMembership, infoPlan, setInfoPlan, autentication, setInfoPlanName, infoPlanName}}>
            <BrowserRouter>
                <GlobalStyle />
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignInPage />} />
                    <Route path="/subscriptions" element={<PlansPage />} />
                    <Route path="/subscriptions/:PlanID" element={<PlanPage />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}