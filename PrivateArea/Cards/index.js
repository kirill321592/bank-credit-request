import { React, styled } from 'core-front/libs';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { sendGetRequest } from 'helpers/request';
import { PRIVATE_AREA_API } from '../../api';

import visaImg from './assets/card-visa.png';
import marterCardImg from './assets/card-mastercard.png';

const { useState, useEffect } = React;

const Cards = () => {
    const [lastCard, setLastCard] = useState(null);

    useEffect(() => {
        sendGetRequest(PRIVATE_AREA_API.GET_LAST_CARD)
            .then(({ data }) => {
                setLastCard(data);
            })
            .catch(() => {});
    }, []);

    const lastCardInfo = () => {
        if (lastCard.valid) {
            return (<span>Caduca el {lastCard.expirationDate}</span>);
        } else {
            return (
                <span className="card-error-message">Hemos detectado un error en esta tarjeta. Incluye una nueva.</span>
            );
        }
    };

    return (
        <StyledCardsWrapper>
            {lastCard && (
                <div className={`white-block card-block ${!lastCard.valid && 'card-error'}`}>
                    <div className="card-body">
                        <h3>Tarjeta de débito</h3>
                        <div className="card-data">
                            <img src={visaImg} alt="visa"  />
                            <img src={marterCardImg} alt="mastercard" />
                        </div>
                    </div>
                    <div className="card-body">
                        <h4>
                            <span className="hidden-xs">{lastCard.number}</span>
                            <span className="visible-xs">{lastCard.numberShort}</span>
                        </h4>
                        <div className="card-data">
                            {lastCardInfo()}
                        </div>
                    </div>
                </div>
            )}
            <Row>
                <section className="col-xs-12">
                    <Link
                        to="/cards/add"
                        className="card-link"
                    >
                        <div className="white-block card-block">
                            <div className="card-body card-add">
                                <h3>Incluye una nueva tarjeta</h3>
                                <div className="card-data"><i /></div>
                            </div>
                        </div>
                    </Link>
                </section>
                <section className="col-xs-12">
                    <p className="cards-information">
                        Ten en cuenta que solo puedes incluir una única tarjeta por lo que los datos de la anterior se
                        sobreescribirán.
                    </p>
                </section>
            </Row>
        </StyledCardsWrapper>
    );
};

export default Cards;

const StyledCardsWrapper = styled.div`  
  .card-link {
    text-decoration: none;
    &:hover > .card-block {
      background: #fefefe;
    }
  }

  .white-block {
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,.2);
    box-sizing: border-box;
    border-radius: 4px;
  }
  
  .card-block {
    padding: 30px;
    margin-bottom: 40px;
    @media (max-width: 767px) {
      padding: 15px;
      margin-bottom: 20px;
    }
    &.card-error {
      .card-body:last-child {
        display: block;
        .card-data {
          display: block;
          text-align: left;
        }
      }
    }
  }
  
  .card-body {
    display:table;
    width:100%;
    margin-bottom: 10px;
    @media (max-width: 767px) {
      & > h3 {
        font-size: 16px;
        span {
          font-size: 12px;
          margin-top: 5px;
        }
      }
    }
    
    &:last-child {
      margin-bottom: 0;
    }
    
    & > h3, & > h4, & > div {
      display:table-cell;
      vertical-align: middle;
    }
    
    & > h3, & > h4 {
      color: #555;
      font-weight: 700;
      white-space: nowrap;
    }
    
    & > h3 {
      font-size: 22px;
    }
    
    & > h4 {
      font-size: 14px;
      padding-right:10px;
      vertical-align: top;
    }
    
    & > div {
      text-align: right;
    }
    
    &.card-add {
      & > div {
        width:1%;
      }
    }
  }
  
  .card-data {
    @media (max-width: 767px) {
      & > i {
        width: 21px;
        height: 21px;
        &::before, &::after {
          width: 11px;
          height: 2px;
          top: 10px;
          left: 5px;
        }
      }
      & > span {
        font-size: 13px;
        text-align:left;
      }
      & > img {
        max-width: 70px;
        height: auto;
      }
    }
    & > i {
      display: block;
      width: 31px;
      height: 31px;
      background: #9edc15;
      border-radius: 50%;
      position: relative;
      &::before, &::after {
        content:'';
        display:block;
        position:absolute;
        width: 17px;
        height: 3px;
        background: #fff;
        top: 14px;
        left: 7px;
      }
      &::after {
        transform:rotate(90deg);
      }
    }
    & > span {
      color: #999;
      display: inline-block;
      position: relative;
      font-weight: 600;
    }
  }
  
  .card-error {
    border: 2px solid rgba(255, 0, 0, 0.4);
    &-message {
      font-size: 15px;
      color: #999;
      font-weight: 600;
      padding-left: 17px;
      margin-top: 10px;
      &::before {
        content:'';
        width:14px;
        height:13px;
        display: inline-block;
        background-repeat: no-repeat;
        background-image: url('../img/card-error.png');
        position: absolute;
        left: 0;
        top: 2px;
      }
    }
    @media (max-width: 767px) {
      &.card-block .card-body:last-child {
        display: table;
        .card-data {
          display: table-cell;
          text-align: right;
        }
      }
      &-message {
        font-size: 13px;
        margin-top: 0;
      }
    }
  }
  
  .cards-information {
    font-weight: 600;
    font-size: 16px;
  }
`;