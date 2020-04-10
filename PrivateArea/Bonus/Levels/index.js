import { React, styled } from 'core-front/libs';

import { useSelector, useDispatch } from 'react-redux';

import { setProducts } from 'actions/privateArea/products';

import BackLink from 'PrivateArea/shared/BackLink';

import { LOAN_BONUS } from 'PrivateArea/config';

const { useEffect } = React;

export default () => {
    const dispatch = useDispatch();
    const levels = useSelector(state => (state.privateAreaProducts.products));

    useEffect(() => {
        !levels.length && dispatch(setProducts());
    }, [dispatch, levels.length]);

    return (
        <>
            <div className="col-xs-12">
                <BackLink url={LOAN_BONUS.url} name="Niveles de préstamo" />
            </div>

            <div className="col-xs-12">
                {levels && levels.map(({
                    id, name, minAmount, maxAmount, minDays, maxDays, percentPerDay, imageName, description, available,
                }, index) => (
                    <StyledItem
                        key={id}
                        available={available}
                        index={index}
                    >
                        <StyledImgCont >
                            <StyledImg src={`/img/${imageName}`} alt={name} />
                        </StyledImgCont>
                        <StyledTitleCont>
                            <StyledTtitle>{name}:</StyledTtitle>
                            <ul>
                                <li>Préstamo de <b>{minAmount} a {maxAmount} €</b></li>
                                <li>Plazo de <b>{minDays} a {maxDays} días</b></li>
                            </ul>
                        </StyledTitleCont>
                        <StyledDsc>{description}</StyledDsc>
                        <StyledPrecent>
                            <div>Tasa de interés:</div>
                            <span>{percentPerDay}<small>%</small></span>
                        </StyledPrecent>
                    </StyledItem>
                ))}
            </div>
        </>
    );
};

const StyledItem = styled.div`
    display: table;
    width: 100%;
    max-width: 890px;
    margin: 50px 0 0;
    position: relative;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    border-radius: 79.5px;
    padding: 30px 40px;
    z-index: 20;
    :before {
        content: '';
        display: block;
        position: absolute;
        height: 50px;
        width: 5px;
        background-color: #e4e4e4;
        top: -50px;
        left: 88px;
    }
    ${({ available }) => available && `
        :before {
            background-color: #9edc15;
        }
    `}
    ${({ index }) => index === 0 && `
        margin-top: 0;
        :before {
            display: none;
        }
    `}
    @media (max-width: 767px){
        border-radius: 10px;
        padding: 25px 20px;
        overflow: hidden;
        display: block;
    
    }
    @media (max-width: 991px){
        margin: 0 0 30px;
    }
`;
const StyledImg = styled.img`
    max-width: 80px;
    max-height: 80px;
`;
const StyledImgCont = styled.div`
    width: 91px;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    @media (max-width: 767px) {
        float: left;
        display: block;
        width: 30%;
    }
`;
const StyledTitleCont = styled.div`
    display: table-cell;
    vertical-align: middle;
    padding: 0 16px;
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    ul > li {
        display: block;
        margin: 0 0 5px;
        color: #9edc15;
        font-weight: 500;
        font-size: 18px;
        line-height: 1.17;
        padding: 0;
        white-space: nowrap;
    }
    @media (max-width: 767px) {
        float: left;
        display: block;
        width: 70%;
        padding: 0 0 0 12px;
    }
`;
const StyledDsc = styled.div`
    display: table-cell;
    vertical-align: top;
    padding: 0 20px;
    border-left: 1px solid #d8d8d8;
    border-right: 1px solid #d8d8d8;
    font-size: 14px;
    color: #737373;
    line-height: 1.57;
    font-weight: 400;
    @media (max-width: 767px){
        display: block;
        width: 100%;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid #d8d8d8;
        padding: 20px 0;
        float: left;
    }
`;
const StyledTtitle = styled.div`
    color: #9edc15;
    font-weight: 600;
    font-size: 26px;
    line-height: .81;
    margin: 0 0 10px;
    text-transform: uppercase;
    @media (max-width: 991px) {
        font-size: 21px;
    }
`;
const StyledPrecent = styled.div`
    display: table-cell;
    vertical-align: top;
    white-space: nowrap;
    padding: 0 20px;
    > div {
        font-size: 16px;
        color: #4c4c4c;
        line-height: 1.1;
        font-weight: 600;
        margin: 0 0 10px;
    }
    span {
        display: block;
        color: #4c4c4c;
        font-size: 30px;
        font-weight: 600;
        line-height: .59;
    }
    @media (max-width: 767px) {
        padding: 20px 0 0;
        display: block;
        width: 100%;
        float: left;
    }
`;

