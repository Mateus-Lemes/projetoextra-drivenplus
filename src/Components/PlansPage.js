import styled from "styled-components"
import axios from "axios"
import { useContext, useState, useEffect } from "react"
import UserContext from "./UserContext"
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function PlansPage() {
    const [loading, setLoading] = useState(false);
    const object = useContext(UserContext);
    const {autentication} = object;
    const [plans, setPlans] = useState([]);

    useEffect(()=> {
        const required = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", autentication);
        required.then((response) => {
                setLoading(true);
                setPlans(response.data)
        })
        required.catch(() => {alert("Erro no servidor!"); setLoading(false);}) // eslint-disable-next-line
    }, [])
    return loading === false ? (
        <PlansPageMain>
            <h1>Escolha seu Plano</h1>
            <section>
                    <p>loading...</p>
                    <ThreeDots color="#FFFFFF" width={298} height={15} />
            </section>
        </PlansPageMain>
    ) : (
        <PlansPageMain>
            <h1>Escolha seu Plano</h1>
            <section>
                {plans.map((plan)=> {
                    const {image, id, price} = plan;
                return <Link key={id} to={`/subscriptions/${id}`}>
                            <article>
                                <img src={image} alt="" />
                                <p>R${price}</p>
                            </article>
                        </Link>
                })}
            </section>
        </PlansPageMain>
    )
}

const PlansPageMain = styled.main`
display: flex;
align-items: center;
justify-content:center;
flex-direction: column;

h1 {
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    color: #FFFFFF;
    margin: 29px 0 24px 0;
}
article {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 290px;
    height: 180px;
    background: #0E0E13;
    border: 3px solid #7E7E7E;
    border-radius: 12px;
    margin-bottom: 10px;

    img {
        width: 139.38px;
        height: 95.13px;
        margin: 0 21.62px 0 16px;
    }

    p {
        width: 97px;
        height: 28px;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: #FFFFFF;
    }
}

section p {
        margin: 0 auto 10px auto;
        width: 97px;
        height: 28px;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: #FFFFFF;
}
a {
    text-decoration: none;
}
`