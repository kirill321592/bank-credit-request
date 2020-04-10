import { React, styled } from 'core-front/libs';
import { PRIVATE_AREA_API } from 'api';
import { notify } from 'core-front/api';
import { sendPostRequest } from 'helpers/request';
import { useHistory } from 'react-router-dom';

export default ({ preCredit: { amount, days, periodText }, togglePreOrder }) => {
    const history = useHistory();

    const setPreOrderCancel= async () => {
        try {
            await sendPostRequest(PRIVATE_AREA_API.PRE_ORDER_CANSEL, { isNormalCredit: true });
            togglePreOrder(false);
        } catch (e) {
            notify(e);
        }
    };
    const setPreOrderConfirm = async () => {
        try {
            const { data } = await sendPostRequest(PRIVATE_AREA_API.PRE_ORDER_CONFIRM, { });

            togglePreOrder(false);
            if (!data.exception && data.status === 'OK_REDIRECT') {
                history.push(data.url);
            }
        } catch (e) {
            notify(e);
        }
    };

    return (
        <StyledWrapper>
            <StyledTop>
                <StyledPopOver>
                ¡Préstamo<span>pre-concedido!</span>
                </StyledPopOver>
                <StyledSum>{amount}€</StyledSum>
                <StyledDays>en {days} {periodText}</StyledDays>
            </StyledTop>
            <StyledBottom>
                <h4>Confiamos en ti y te hemos concedido un préstamo de <b>{amount}€</b> a devolver en un plazo de <b>{days} {periodText}</b>.</h4>
                <StyledBtn
                    onClick={setPreOrderConfirm}
                    className="btn btn-lg"
                >ACEPTAR PRÉSTAMO
                </StyledBtn>
                <StyledLink
                    onClick={setPreOrderCancel}
                >Solicitar otra cantidad <span>(sujeto a verificación)</span>
                </StyledLink>
            </StyledBottom>
        </StyledWrapper>
    );
};


const StyledWrapper = styled.div`
    background: url(../img/wave-modal.svg) 50% 205% no-repeat,#fff;
    margin:-15px;
    @media (max-width: 420px) {
        margin: 50px -15px -15px;
        background: url(../img/wave-modal.svg) 50% 125% no-repeat,#fff;
      }
`;
const StyledPopOver = styled.div`
    position: relative;
    display: inline-block;
    box-shadow: 0 3px 5px 0 rgba(0,0,0,.2);
    color: #9edc15;
    line-height: 1.57;
    font-weight: 600;
    font-size: 14px;
    padding: 9px 15px 8px;
    margin: 0 0 30px;
    border-radius: 5px;
    background-color: #fff;
    span {
        display: block;
        text-transform: uppercase;
    }
    :after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        margin-left: -7px;
        bottom: -14px;
        left: 50%;
        box-sizing: border-box;
        border: 7px solid #000;
        border-color: transparent transparent #fff #fff;
        transform-origin: 0 0;
        transform: rotate(-45deg);
        box-shadow: -3px 3px 4px 0 rgba(0,0,0,.2);
    }
`;
const StyledSum = styled.div`
    font-size: 74px;
    font-weight: 600;
    line-height: 0.54;
    color: #8cc906;
    margin: 0 0 15px;
`;
const StyledDays = styled.div`
    font-size: 36px;
    font-weight: 500;
    line-height: 1.11;
    color: #9edc15;
`;
const StyledTop = styled.div`
    text-align: center;
    padding: 0 0 0;
`;
const StyledBottom = styled.div`
    padding: 70px 85px 30px;
    color: #fff;
    text-align: center;
    b {
        border-bottom: 1px solid #fff;
    }
    h4 {
        font-size: 17px;
        font-weight: 700;
        line-height: 1.75;
        margin: 0 0 30px;
    }
    
@media (max-width: 650px) {
      padding: 0 20px 40px;
    }
    @media (max-width: 420px) {
        padding-top: 70px;
      }
`;
const StyledBtn = styled.div`
    margin: 0 0 15px;
    background-color: #ff9d00;
    width:100%;
`;
const StyledLink = styled.button`
    display: inline-block;
    font-size: 16px;
    color: #fff;
    font-weight: 600;
    border-bottom: 1px solid #fff;
    background: none;
    border-top:none;
    border-left:none;
    border-right:none;
    line-height: 1.3;
    span {
        font-weight: 300;
    }
`;

