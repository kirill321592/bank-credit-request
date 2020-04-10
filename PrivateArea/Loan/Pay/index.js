import { React, styled } from 'core-front/libs';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setIframe } from 'actions/privateArea/loan';
import { setLoanPayInfo, changeLoanAmount } from 'actions/privateArea/loan';
import Iframe from 'react-iframe';
import { BaseModal } from 'components';
import { Loader } from 'components';
import { cards } from 'helpers/cardsImg';
import StyledError from 'components/ServerError/';
const { useEffect } = React;
const MIN_AMOUNT = 0.01;

export default () => {
    const dispatch = useDispatch();
    const { loanPayInfo } = useSelector(state => (state.privateAreaLoan));
    const { iframeUrl } = useSelector(state => (state.privateAreaLoan));

    useEffect(() => {
        dispatch(setLoanPayInfo());
    }, [dispatch]);

    if (!loanPayInfo) {
        return (
            <StyledError />
        );
    }

    const { amount, maxAmount } = loanPayInfo;

    const actionModal = () => {
        const params = {
            amount,
            creditId: '-',
            url: window.location.href,
            date: new Date()
        };

        dispatch(setIframe(params));
    };

    const onChange= value => {
        if (value > maxAmount) {
            dispatch(changeLoanAmount(maxAmount));
        } else if (value < MIN_AMOUNT) {
            dispatch(changeLoanAmount(MIN_AMOUNT));
        } else {
            dispatch(changeLoanAmount(value));
        }
    };

    return (
        <>
         <StyledHeader className="col-xs-12">
             <h2>
                 <Link to="/loan-detail" className="back-arrow">Pagar cuota pendiente</Link>
             </h2>
         </StyledHeader>
         <div className="col-xs-12">
             <StyledPaySum>
                 <span>Cantidad total a pagar:</span>
                 <label htmlFor="sum" className="payback-label">
                     <input
                         type="number"
                         value={!isNaN(amount) && amount}
                         onChange={e => onChange(e.target.value)}
                         name="sum"
                     />
                     <div className="popover" role="tooltip">
                         <div className="arrow"></div>
                         <div className="popover-content">Pago pendiente para ponerte al dia</div>
                     </div>
                 </label>
                 <p>Escoge uno de los dos métodos de pago para devolver tu cuota mensual:</p>
             </StyledPaySum>
         </div>
        <div className="col-xs-12">
            <StyledBlock>
                <StyledLogos>
                    {cards.map(({ src }, index) => (
                        <img
                            key={index}
                            src={src}
                            alt=""
                        />
                    ))}
                </StyledLogos>
                <div className="payback__title card-title">1. Tarjeta de débito</div>
                <p>Los pagos con tarjeta de crédito se realizan a través de los sistemas de pago VISA y MasterCard. </p>
                <BaseModal
                    actionModal={actionModal}
                    link={`PAGAR CON TARJETA ${amount}€`}
                >
                    {iframeUrl
                        ? <Iframe
                            url={iframeUrl}
                            width="100%"
                            height="605px"
                            className=""
                            display="initial"
                            position="relative"
                        />
                        : <Loader />}
                </BaseModal>
            </StyledBlock>
        </div>
        <div className="col-xs-12">
            <StyledBlock>
                <div className="payback__title">2. Transferencia bancaria</div>
                <u className="payback-totalsum">Cantidad total a pagar: <b>{amount && <span>{amount}</span>}  €</b></u>
                <p>Realiza el pago a través de una transferencia desde tu banca online en una de las siguientes cuentas:</p>
                <StyledList>
                    <li>
                        <div className="payback__img">
                            <img src="/img/bankia.png" alt="BANKIA" />
                        </div>
                        <div className="payback__name">BANKIA: <br />
                                S57 2038 9238 9160 0021 0400 <br />
                                Código BIC: CAHMESMMXXX
                        </div>
                    </li>
                    <li>
                        <div className="payback__img">
                            <img src="/img/sabadell.png" alt="Sabadell" />
                        </div>
                        <div className="payback__name">Sabadell: <br />
                                ES69 0081 0398 8100 0212 2318 <br />
                                Código BIC: BSABESBBXXX
                        </div>
                    </li>
                    <li>
                        <div className="payback__img">
                            <img src="/img/logo-caixabank.jpg" alt="CaixaBank" />
                        </div>
                        <div className="payback__name">CaixaBank: <br />
                                ES09 2100 1310 6702 0006 1062 <br />
                                Código BIC: CAIXESBBXXX
                        </div>
                    </li>
                </StyledList>
                <StyledReminder>
                    <p>Recuerda indicar en el concepto de la operación tanto tu DNI o NIE como tu número de préstamo.</p>
                    <p>El beneficiario debe ser Finance Spain Financial </p>
                </StyledReminder>
            </StyledBlock>
        </div>
        </>
    );
};
const StyledHeader = styled.div`
    margin-bottom: 10px;
    margin-top: 7px;
    .back-arrow {
        position: relative;
        padding-left: 30px;
        text-decoration: none;
        color: #333;
        font-weight: 700;
    }
    .back-arrow:before {
        width: 10px;
        top: 12px;
        left: 0;
        height: 3px;
    }
    .back-arrow:after {
        width: 3px;
        height: 10px;
        top: 15px;
        left: 4px;
    }
    a:hover {
        color: #ff9d00;
    }
    .back-arrow:hover:before {
        background: #ff9d00;
    }
    .back-arrow:hover:after {
        background: #ff9d00;
    }
    .back-arrow:after, .back-arrow:before {
        content: "";
        position: absolute;
        background: #9edc15;
        transform: rotate(-45deg);
    }
    @media (max-width: 767px){
        h2 {
            font-size: 22px;
        }
    }
    @media (max-width: 575px){
        h2 {
            font-size: 20px;
        }
    }
`;

const StyledBlock = styled.div`
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    padding: 20px;
    margin-bottom: 30px;
    .payback__title {
        font-size: 1.5em;
        font-weight: 700;
        margin-bottom: 20px;
    }
    p {
    margin: 0 0 30px;
    }    
    .btn {
        font-size: 17px;
        padding: 20px;
        text-transform: uppercase;
        background-color: #ff9d00;
        font-weight: 700;
        letter-spacing: .2pt;
        transition: all ease .3s;
        margin-bottom: 10px;
        border-radius: 4px;
        white-space: normal;
        width:100%;
    }
    .payback-totalsum{
        display: inline-block;
        margin: 0 0 15px;
        font-size: 16px;
        line-height: 1.38;
        letter-spacing: -0.1px;
        color: rgba(76, 76, 76, 0.9);
        font-weight: 500;
    }
`;
const StyledList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    li {
        border-bottom: 1px solid #ddd;
        overflow: auto;
        padding: 15px 0;
    }
    li:nth-child(1) {
        padding: 0 0 15px;
    }
    li:last-child {
        border: none;
    }
    .payback__img {
        float: left;
    }
    .payback__img img {
        max-height: 44px;
        width: auto;
        display: block;
        padding-right: 30px;
    }
    .payback__name {
        display: inline-block;
        font-weight: 500;
    }
`;
const StyledReminder= styled.div`
    border-radius: 4px;
    border: 2px solid #aaee16;
    padding: 20px;
    font-size: .8em;
    margin-top: 10px;
     p {
        margin: 0 0 10px;
    }
`;
const StyledLogos= styled.div`
    position: absolute;
    top: 25px;
    right: 30px;
    @media (max-width: 767px) {
    position: relative;
    top: inherit;
    right: inherit;
    float: right;
    margin-left: 10px;
    margin-top: 5px;
}
`;
const StyledPaySum= styled.div`
    margin-bottom: 40px;
    p{
        margin:10px 0;
    }
    span {
        display: inline-block;
        vertical-align: middle;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.4;
        color: #737373;
        margin-right: 10px;
    }
    label {
        width: 110px;
        height: 44px;
        display: inline-block;
        vertical-align: middle;
        margin: 0;
        position: relative;
    } 
    label:after {
        content: "€";
        display: block;
        position: absolute;
        font-size: 22px;
        font-weight: 500;
        line-height: 1.45;
        color: rgba(211, 210, 210, 0.9);
        right: 10px;
        top: 8px;
    } 
     input {
        display: block;
        width: 100%;
        height: 100%;
        background-color: #fff;
        box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        padding: 0 30px 0 10px;
        font-size: 22px;
        color: #737373;
        font-weight: 500;
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        border: none;
        -moz-appearance:textfield;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }

    input[type=number] {
        -moz-appearance:textfield; /* Firefox */
    }
    .popover{
        z-index:2;
        position: absolute;
        top: 9px;
        left: 120px;
        width:216px;
        display:block;
        font-size: 12px;
        font-weight: 500;
        padding: 0;
        color: #737373;
        line-height: 1.5;
        border: none;
        border-radius: 3px;
        box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
    }
    .popover>.arrow{
        border-right-color: transparent;
        left: -32px;
        top: 15px;
        margin-top: -11px;
        border-left-width: 0;
        border-width: 11px;
    }
     .popover>.arrow:after {
        content: " ";
        left: 1px;
        bottom: -10px;
        border-left-width: 0;
        border-right-color: #fff;
        border-width: 10px;
    }
    @media (max-width: 767px) {
        .popover{
            display:none;
        }
    }
`;