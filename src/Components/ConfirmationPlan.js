import styled from "styled-components"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import { useContext } from "react";

export default function ConfirmationPlan(props) {
    const navigate = useNavigate();
    const {body, membershipId, autentication} = props
    const data = {membershipId, ...body};
    const {setInfoPlan} = useContext(UserContext);

    function subscriptionPlan() {
       const required = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", data, autentication);
       required.then((response) => {
            setInfoPlan(response.data);
            navigate("/home");
       })
       required.catch(()=> alert("erro no servidor!"));
   }
    return props.hiddenScreen === true ? (
        <></>
    ) : (
        <ConfirmationPlanMain>
            <div onClick={()=> props.setHiddenScreen(true) } className="exit-button">x</div>
            <div className="confirmation-box">
                <p>Tem certeza que deseja assinar o plano {props.name} (R${props.price})?</p>
                <button onClick={()=> props.setHiddenScreen(true) }>Não</button>
                <button onClick={subscriptionPlan} >SIM</button>
            </div>
        </ConfirmationPlanMain>
    )
}

const ConfirmationPlanMain = styled.main`
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;

    .exit-button {
        border-radius: 2px;
        line-height: 20px;
        font-weight: 700;
        text-align: center;
        width: 23px;
        height: 21px;
        background-color: white;
        position: fixed;
        z-index: 1;
        top: 24px;
        right: 22px;
        font-size: 22px;
    }

    .confirmation-box {
        position: absolute;
        inset: 229px 64px;
        width: 248px;
        height: 210px;
        background: #FFFFFF;
        border-radius: 12px;
        padding: 33px 22px 11px 22px;

        p {
            font-weight: 700;
            font-size: 18px;
            line-height: 21px;
            text-align: center;
            color: #000000;
        }

        button {
            margin-top: 47px;
            width: 95px;
            height: 52px;
            background: #CECECE;
            border-radius: 8px;
            border: 0;
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;
            color: #FFFFFF;
        }
        button:last-child {
            margin-left: 14px;
            background-color: #FF4791;
            font-size: 14px;
            line-height: 16px;
            color: #FFFFFF;
            font-weight: 700;
        }
    }

`