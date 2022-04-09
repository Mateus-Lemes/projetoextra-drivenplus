import UserContext from "./UserContext"
import { useContext } from "react"
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

export default function Home() {
    const {infoPlan, infoPlanName, autentication} = useContext(UserContext);
    const {perks, image} = infoPlan.membership;
    const navigate = useNavigate();
    function deletePlan() {
        const required = axios.delete("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", autentication);
        required.then(()=> navigate("/subscriptions"));
        required.catch(()=> alert("Erro no servidor"))
    }
    return (
        <HomeMain>
            <section>
                <header>
                    <img src={image} alt="" />
                    <ion-icon name="person-circle-sharp"></ion-icon>
                </header>
                <p>Olá, {infoPlanName}</p>
                {perks.map((perk) =>
                    <button key={perk.id}><a target="_blank" rel="noreferrer" href={perk.link}>{perk.title}</a></button>
                )}
                <div className="change-plan">
                    <button><Link to="/subscriptions">Mudar plano</Link></button>
                    <button onClick={deletePlan}>Cancelar plano</button>
                </div>
            </section>
        </HomeMain>
    )
}

const HomeMain = styled.main`
    height: 100vh;
    header {
        padding: 32px 0 12px 0;
        display: flex;
        width: 298px;
        justify-content: space-between;

        img {
            width: 74.52px;
            height: 50.87px;
        }

        ion-icon {
            font-size: 35px;
            color: white;
        }
    }
    section {
        width: 298px;
        margin: auto;
    }

    section p {
        color: white;
        text-align: center;
        margin-bottom: 53px;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
    }

    button {
        width: 298px;
        height: 52px;
        background: #FF4791;
        border-radius: 8px;
        border: 0;
        margin: 0 auto 8px auto;
        a {
            font-weight: 700;
            font-size: 14px;
            line-height: 16px;
            color: #FFFFFF;
            text-decoration: none;
        }
    }

    .change-plan {
        position: fixed;
        bottom: 12px;

        button {
            font-weight: 700;
            font-size: 14px;
            line-height: 16px;
            color: #FFFFFF;
            text-decoration: none;
        }
        
        button:last-child{
            background-color: #FF4747;
        }
    }
`

