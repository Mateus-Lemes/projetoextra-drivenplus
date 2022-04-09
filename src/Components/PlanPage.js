import { useParams, Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import UserContext from "./UserContext";
import axios from "axios";
import styled from "styled-components";
import ConfirmationPlan from "./ConfirmationPlan";

export default function PlanPage() {
    const [loading, setLoading] = useState(false);
    const {PlanID} = useParams();
    const [plan, setPlan] = useState("");
    const [info, setInfo] = useState([]);
    const object = useContext(UserContext);
    const {autentication} = object;
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [securityNumber, setSecurityNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [hiddenScreen, setHiddenScreen] = useState(true);
    const membershipId = PlanID;
    const body = {
         cardName,
         cardNumber,
         securityNumber,
        expirationDate,
    }

    useEffect(()=> {
        const required = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${PlanID}`, autentication);
        required.then((response) => {
            setLoading(true); 
            setPlan(response.data);
            setInfo(response.data.perks);
        })
        required.catch(() => {alert("Erro no servidor, tela do plano!"); setLoading(false);}) // eslint-disable-next-line
    }, [])

    function changeState(event) {
        event.preventDefault();
        setHiddenScreen(false);
    }

    return loading === false ? (
        <PlanPageMain>
            <section>
                    <p className="p">loading...</p>
                    <ThreeDots color="#FFFFFF" width={298} height={15} />
            </section>
        </PlanPageMain>
    ) : (
        <PlanPageMain>
            <ConfirmationPlan membershipId ={membershipId} body ={body} hiddenScreen={hiddenScreen} name={plan.name} price={plan.price} setHiddenScreen={setHiddenScreen} autentication={autentication}/>
            <section>
                <Link to="/subscriptions"><ion-icon name="arrow-back-sharp"></ion-icon></Link>
                <div className="name-plan">
                    <img src={plan.image} alt="" />
                    <h1>{plan.name}</h1>
                </div>
                <div className="plan-information">
                    <h3>Benefícios:</h3>
                    <ol>
                        {info.map((perk) => {
                            const {title, id} = perk;
                            return  <li key={id}>{title}</li>
                        })}
                    </ol>
                </div>
                <div className="plan-information">
                    <h3>Preço:</h3>
                    <p>R${plan.price} cobrados mensalmente</p>
                </div>
                <form onSubmit={changeState}>
                    <input type="text" placeholder='Nome impresso no cartão' value = {cardName} onChange={(e) => setCardName(e.target.value)} required/>
                    <input type="number" placeholder='Dígitos do cartão' value = {cardNumber} onChange={(e) => setCardNumber(e.target.value)} required/>
                    <input type="number" placeholder='Código de segurança' value = {securityNumber} onChange={(e) => setSecurityNumber(e.target.value)} required/>
                    <input type="text" placeholder='Validade (mm/aa)' value = {expirationDate} onChange={(e) => setExpirationDate(e.target.value)} required/>
                    <button type="submit">ASSINAR</button>
                </form>
            </section>
        </PlanPageMain>
    )
}

const PlanPageMain = styled.main`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    section {
        width: 300px;
    }

    section .p {
            margin: 0 auto 10px auto;
            width: 97px;
            height: 28px;
            font-weight: 700;
            font-size: 24px;
            line-height: 28px;
            color: #FFFFFF;
    }

    .name-plan {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
        height: 95px;
        width: 139.38px; 
        }
        h1 {
            height: 38px;
            font-weight: 700;
            font-size: 32px;
            line-height: 38px;
            color: #FFFFFF;
        }
    }

    .plan-information {
        h3 {
            height: 17px;
            width: 100px;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            color: #FFFFFF;
            margin:23px 0 10px 0;
        }
        ol {
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;
            color: #FFFFFF;
        }
        p {
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;
            color: #FFFFFF;
        }
    }
    form {
        margin-top: 34px;
        input {
            width: 299px;
            height: 52px;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 8px;
            margin-bottom: 8px;
            font-size: 19px;
            font-weight: 400;
            padding-left: 11px;

            &::placeholder {
                width: 100%;
                height: 20px;
                font-weight: 400;
                font-size: 14px;
                line-height: 25px;
                color: #7E7E7E;
            }
        }
        input:nth-last-child(2)  {
            width: 145px;
            height: 52px;
        }
        input:nth-last-child(3) {
            width: 145px;
            height: 52px;
            margin-right: 9px;
            padding-left: 6px;
        }

        button {
            width: 298px;
            height: 52px;
            background: #FF4791;
            border-radius: 8px;
            border: 0;
            font-weight: 700;
            font-size: 14px;
            line-height: 16px;
            color: #FFFFFF;
            margin: 8px 0 25px 0;
        }
    }
    ion-icon {
        color: #FFFFFF;
        font-size: 35px;
    }
`