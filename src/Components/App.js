import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../Components/LoginPage";
import SignInPage from "../Components/SignInPage";
import PlansPage from "../Components/PlansPage";
import PlanPage from "../Components/PlanPage";
import HomePage from "../Components/HomePage";
import GlobalStyle from "../GlobalStyle";

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignInPage />} />
                <Route path="/subscriptions" element={<PlansPage />} />
                <Route path="/subscriptions/:PlanID" element={<PlanPage />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
}