import { React, styled } from 'core-front/libs';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Iframe from 'react-iframe';

import { setProlongationPayInfo, setIframe } from 'actions/privateArea/prolongation';
import { setBonusInfo } from 'actions/privateArea/products';

import { cards } from 'helpers/cardsImg';

import { Loader, BaseModal } from 'components';
import BackLink from 'PrivateArea/shared/BackLink';

import { PROLONGATION_PAGE } from 'PrivateArea/config';

const { useEffect, useMemo } = React;

const prepareData = (amount, rate) => Math.ceil((+amount) / rate);

export default () => {
    const dispatch = useDispatch();

    const {
        bonusInfo: { bonusRate, totalBonuses }, bonusInfoLoaded,
    } = useSelector(state => (state.privateAreaProducts));

    const { iframeUrl, prolongationPayInfo: { rolloverAmount }} = useSelector(state => (state.privateAreaProlongation));

    const memoizedAmount= useMemo(() => prepareData(rolloverAmount, bonusRate), [rolloverAmount,bonusRate]);

    const actionModal = () => {
        const params = {
            amount: rolloverAmount,
            creditId: '-',
            url: window.location.href,
            date: new Date()
        };

        dispatch(setIframe(params));
    };

    useEffect(() => {
        dispatch(setProlongationPayInfo());
        !bonusInfoLoaded && dispatch(setBonusInfo());
    }, [dispatch, bonusInfoLoaded]);

    return (
        <>
            <StyledHeader className="col-xs-12">
                <BackLink url={PROLONGATION_PAGE.url} name="Métodos de pago" />
            </StyledHeader>
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

                    <p>
                        Los pagos con tarjeta de crédito se realizan a través de los sistemas de pago VISA y MasterCard.
                    </p>

                    <BaseModal
                        actionModal={actionModal}
                        link={`PAGAR CON TARJETA ${rolloverAmount}€`}
                    >
                        {iframeUrl
                            ? (
                                <Iframe
                                    url={iframeUrl}
                                    width="100%"
                                    height="605px"
                                    className=""
                                    display="initial"
                                    position="relative"
                                />
                            )
                            : <Loader />}
                    </BaseModal>
                </StyledBlock>
            </div>
            <div className="col-xs-12">
                <StyledBlock>
                    <div className="payback__title">2. Transferencia bancaria</div>
                    <u className="payback-totalsum">Cantidad total a pagar: <b>{rolloverAmount && <span>{rolloverAmount}</span>}  €</b></u>
                    <p>Realiza el pago a través de una transferencia desde tu banca online en una de las siguientes cuentas:</p>
                    <StyledList>
                        <li>
                            <div className="payback__img">
                                <img src="/img/bankia.png" alt="BANKIA" />
                            </div>
                            <div className="payback__name">BANKIA: <br />
                                    S57 2038 9238 9160 0021 0400
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
            <div className="col-xs-12">
                <StyledBlock>
                    <div className="payback__title">3. Usar puntos</div>
                    <p>Paga la comisión con tus puntos de boni-ficación. Haz click en “Usar mis puntos” para realizar el pago con puntos.</p>
                    <Link to="/prolongation/bonus-pay">
                        <button
                            type="button"
                            className="btn btn-lg"
                            disabled={totalBonuses < memoizedAmount}
                        >
                            USAR MIS PUNTOS
                        </button>
                    </Link>
                </StyledBlock>
            </div>
        </>
    );
};

const StyledHeader = styled.div`
    margin-top: 7px;
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
