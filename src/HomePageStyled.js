import styled from 'styled-components'

const HomePage = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

img {
    
    margin-bottom: 100.93px;
}

form {
    width:303px;


    input {
        width: 299px;
        height: 52px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 8px;
        margin-bottom: 16px;
        font-size: 19px;
        font-weight: 400;
        padding-left: 11px;

        &::placeholder {
            width: 54px;
            height: 25px;
            font-weight: 400;
            font-size: 14px;
            line-height: 25px;
            color: #7E7E7E;
        }
    }

    button{
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

p {
    width: 226px;
    height: 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    text-decoration-line: underline;
    color: #FFFFFF;
}

.opacity {
    opacity: 0.7;

    input {
        background: #f2f2f2;
        color: #AFAFAF;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
    }
}
`

export default HomePage