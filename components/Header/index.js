import { React, ReactDOM, styled } from 'core-front/libs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import STEPS from '../../steps';
import { LOGIN_PAGE } from 'PrivateArea/config';

const STEP_CRUMBS = [{
    step: 1,
    name: 'Datos personales'
}, {
    step: 2,
    name: 'Vivienda'
}, {
    step: 3,
    name: 'Trabajo'
}, {
    step: 4,
    name: 'Cuenta bancaria'
}, {
    step: 5,
    name: 'Banca online'
}, {
    step: 6,
    name: 'Tarjeta de débito'
}, {
    step: 7,
    name: 'Confirmación'
}];

class Header extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        const height = ReactDOM.findDOMNode(this).offsetHeight;

        dispatch({ type: 'SET_HEADER_RECTANGLE', height });
    }

    render() {
        const {
            stepName,
            registration,
            step,
            status,
            formValid,
            calcIsOpen,
            options: { SHOW_CALC }
        } = this.props;
        const LAYOUT_TYPE = SHOW_CALC ? 'CALCULATOR': 'BASE';

        return (
            <HeaderStyled withShadow={!registration} calcIsOpen={calcIsOpen}>
                <div className="container">
                    <nav className="navbar">
                        <div className="navbar-header">
                            <span className="navbar-brand">
                                <img src="./img/logo.svg" alt="brand logo" />
                            </span>
                        </div>

                        {stepName === 'STEP_USER_ACCOUNT' && (
                            <ul className="nav navbar-nav navbar-right login">
                                <li>
                                    <Link to={LOGIN_PAGE.url}>
                                        ¿Ya eres cliente?
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </nav>
                </div>

                <Breadcrumbs calcIsOpen={calcIsOpen}
                    status={status && status.status}
                    layout={LAYOUT_TYPE}
                >
                    {STEP_CRUMBS && STEP_CRUMBS.map((item, i) => {
                        let classNames = step >= item.step ? 'passed' : '';

                        if (!formValid && step === item.step) {
                            classNames = 'error';
                        }

                        switch (status) {
                        case 'CANCELLED':
                            classNames = 'error';
                            break;
                        case 'ACTIVE':
                        case 'PROCESSING':
                        case 'DRAFT':
                        case 'PENDING':
                            classNames = 'success';
                            break;
                        default:
                            break;
                        }

                        return (
                            <li className={classNames} key={i}><span>{item.name}</span></li>
                        );
                    })}
                </Breadcrumbs>
            </HeaderStyled>
        );
    }
}

export default compose(
    connect(({ user, step, calc }) => ({
        status: step.data.status,
        formValid: step.formValid,
        calcIsOpen: calc.isOpen,
        stepName: step.name,
        options: step.name ? STEPS[step.name].OPTIONS : {},
        user
    })),
)(Header);

const HeaderStyled = styled.header`
    background-color: #fff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);

    @media screen and (max-width: 991px) {
        position: fixed;
        width: 100%;
        z-index: 99;
        box-shadow: 0 3px 3px 0 rgba(0,0,0,.1);
    }
    .navbar {
        margin: 35px 0;
        text-align: center;

        @media screen and (max-width: 991px) {
            min-height: 5px;
            margin: 13px 0 9px;
        }
        
        .navbar-brand {
            height: auto;
            @media (max-width: 991px) {
              padding: 0;
            }
        }
    }

    .navbar-header {
        @media (min-width: 768px) {
            float: none;
        }

        @media (min-width: 991px) {
            float: left;
        }

        .navbar-toggle {
            width: auto;

            @media (max-width: 991px) {
                display: initial;
            }

            .icon-bar {
                background: #9edc15;
            }
        }
    }

    .nav.navbar-nav {
        float: none;
        display: inline-block;
        margin-right: 0;

        @media (max-width: 991px) {
            display: none !important;
        }

        a {
            border: 2px solid #aaa;
            border-radius: 4px;
            text-decoration: none;
            font-size: 14px;
            color: #5f5f5f;
            padding: 10px 12px;
        }
    }
`;

const Breadcrumbs = styled.ul`
      display: table;
      white-space: nowrap;
      table-layout: fixed;
      margin: 0;
      padding: 0;
      width: 100%;
      transition: margin-top ease .3s, opacity ease .3s;
      opacity: 1;

      @media screen and (max-width: 991px) {
        margin-top: ${props => props.layout === 'BASE' ? '0' : '60px'};
        display: ${props => props.calcIsOpen ? 'none' : 'table'};
      }

    li {
      list-style: none;
      display: table-cell;
      text-align: center;
      text-transform: uppercase;
      
      &.success span {
          border-bottom-color: #c1f54d;
      }
      
      &.passed span {
          border-bottom-color: #707070;
      }
    
      &.error span {
          border-bottom-color: #ff4b4b;
      }
      
       span {
          display: block;
          margin: 2px;
          font-weight: 700;
          font-size: .9em;
          color: #707070;
          padding: 10px 0;
          border-bottom: 10px solid #d8d8d8;
          
          @media screen and (max-width: 991px) {
            font-size: 0;
            padding: 0;
            margin: 1px;
            border-bottom-width: 3px;
          }        
       }
    }
`;
