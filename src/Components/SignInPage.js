import HomePage from "../HomePageStyled"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function SignInPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const navigate = useNavigate();
    
    const data = {
        email,
        name,
        cpf,
        password
    }

    function DataSignIn(event) {

        event.preventDefault()
        setLoading(true)

        const required = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up", data);
        required.then(() => navigate("/"));
        required.catch(() => alert("Não foi possível efetuar o cadastro, tente novamente!"));
    }
    return loading === false ? (
        <HomePage>
            <form onSubmit={DataSignIn}>
                <input type="text" placeholder="Nome" value = {name} onChange={(e) => setName(e.target.value)} required/>
                <input type="email" placeholder='E-mail' value = {email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" placeholder='Senha' value = {password} onChange={(e) => setPassword(e.target.value)} required/>
                <input type="number" placeholder="CPF" value = {cpf} onChange={(e) => setCpf(e.target.value)} required/>
                <button type="submit">Entrar</button>
            </form>
            <Link to="/"><p>Já possuí uma conta? Entre</p></Link>
        </HomePage>
    ) : (
        <HomePage>
        <form className="opacity">
            <input type="text" placeholder="Nome" value = {name} onChange={(e) => setName(e.target.value)} disabled />
            <input type="email" placeholder='E-mail' value = {email} onChange={(e) => setEmail(e.target.value)} disabled/>
            <input type="password" placeholder='Senha' value = {password} onChange={(e) => setPassword(e.target.value)} disabled/>
            <input type="number" placeholder="CPF" value = {cpf} onChange={(e) => setCpf(e.target.value)} disabled/>
            <button><ThreeDots color="#FFFFFF" width={298} height={15} /></button>
        </form>
        <p>Já possuí uma conta? Entre</p>
    </HomePage>
    )
}