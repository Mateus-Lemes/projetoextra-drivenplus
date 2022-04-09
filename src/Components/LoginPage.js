import logo from "../img/logo.png"
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomePage from "../HomePageStyled";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import UserContext from "./UserContext";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const object = useContext(UserContext)

    const data = {
        email,
        password
    }

    function Login(event) {

        event.preventDefault();

        setLoading(true);

        const required = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login", data);
        required.then((response) => {
            const {token, membership} = response.data
            object.setInfoPlanName(response.data.name);
            object.setInfoPlan(response.data);
            object.setToken(token);
            object.setMembership(membership);
            localStorage.setItem("token", token);
            localStorage.setItem("membership", membership);
            if (membership === null ) {
                navigate("/subscriptions");
            } else {
                navigate("/home");
            }
        });

        required.catch(() => {alert("Email e/ou senha inválido(s), tente novamente!"); setLoading(false);});
    }

    return loading === false ? (
        <HomePage>
            <img src={logo} alt=""/>
            <form onSubmit={Login}>
                <input type="email" placeholder='Email' value = {email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" placeholder='Senha' value = {password} onChange={(e) => setPassword(e.target.value)} required/>
                <button>Entrar</button>
            </form>
            <Link to="/sign-up"><p>Não possuí uma conta? Cadastre-se!</p></Link>
        </HomePage>
    ) : (
        <HomePage>
            <img src={logo} alt=""/>
            <form className="opacity">
                <input type="email" placeholder='Email' value = {email} onChange={(e) => setEmail(e.target.value)} disabled/>
                <input type="password" placeholder='Senha' value = {password} onChange={(e) => setPassword(e.target.value)} disabled/>
                <button><ThreeDots color="#FFFFFF" width={298} height={15} /></button>
            </form>
            <p>Não possuí uma conta? Cadastre-se!</p>
        </HomePage> 
    )
}

