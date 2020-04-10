import { styled } from 'core-front/libs';
import { Tooltip } from 'react-bootstrap';

export const StyledProducts = styled.div`
    ul {
        padding: 0;
        margin-bottom: 50px;
        
        &.is-opened {
            li {
                display: table;
                
                &::after {
                    content: '';
                }
            }
        }
    }

    li {
        box-sizing: border-box;
        list-style-type: none;
        background-color: #fff;
        border-radius: 100px;
        width: 160px;
        display: none;
        margin: 30px 0;
        font-weight: 500;
        position: relative;
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, .2);
        vertical-align: middle;
        height: 55px;
        transition: .3s;
        cursor: pointer;
        
        &:not(:last-child) {
            &::after {
                width: 5px;
                height: 30px;
                background: #9edc15;
                position: absolute;
                left: 75px;
                bottom: -30px;
                cursor: default;
            }
        }
        
        &:hover {
            width: 100%;
            
            &:not(.product-opened) {
                .product-text {
                    > span {
                        margin-left: 5px;
                    }
                }
            }

            .product-text {
                color: rgba(163, 163, 163, .9);

                > span {
                    opacity: 1;
                }
            }
        }

        &.product-opened {
            display: table;
            width: 100%;
            border: 2px solid #9edc15;
            font-weight: 600;
            color: #9edc15;
            height: 64px;
            
            .product-text {
                color: #9edc15;
                font-size: 18px;
                padding-left: 5px;
                
                > span {
                    display: inline-block;
                    font-size: 18px;
                    opacity: 1;
                }
            }
        }
        
        &.product-closed {
            background: transparent;
            outline: 0;

            &::after {
                background: #ddd;
            }
        }
    }
    
    .product-img {
        display: table-cell;
        width: 65px;
        height: 100%;
        padding-left: 10px;
        text-align: center;
        vertical-align: middle;

        img {
            display: inline-block;
            max-width: 100%;
        }
     }
        
    .product-text {
        display: table-cell;
        height: 100%;
        vertical-align: middle;
        color: rgba(211, 210, 210, .9);
        font-weight: 600;

        > span {
            display: inline-block;
            position: absolute;
            font-weight: 500;
            font-size: 14px;
            opacity: 0;
            transition: .3s;
            white-space: nowrap;
        }

        a {
            text-decoration: underline;

            &:hover {
                text-decoration: none;
            }
        }
        
        .link {
            cursor: pointer;
            text-decoration: underline;

            &:hover {
                text-decoration: none;
            }
        }
    }
    
    .current-product {
        position: absolute;
        width: 100%;
        left: 0;
        right: 0;
        top: 0;
        margin: 0;
        transition: .3s;
        padding: 10px 0;
        overflow: hidden;
        
        &.is-opened {
            li {
                margin-right: 0;
                max-width: calc(100% - 10px);
                width: 100%;
            }
        }

        li {
            border: none;
            margin: 0 -290px 0 0;
            width: 359px;
            max-width: 95%;
            border-radius: 100px 0 0 100px;
            float: right;
            transition: .3s;
        }
        
        .link {
            margin-left: 3px;
        }
    }
`;

export const StyledTooltip = styled(Tooltip)`
    margin-left: 20px;
    font-size: 12px;
    font-weight: 500;
    color: #737373;
    line-height: 1.5;
    border: none;
    border-radius: 3px;
    
    &.current-product-tooltip {
        left: auto !important;
        right: 15px !important;
        
        &.bottom {
            .tooltip-arrow {
                left: auto !important;
                right: 5px !important;
            }
        }
        
        .link {
            margin-left: 3px;
        }
    }

    .tooltip-inner {
        background-color: #fff;
        box-shadow: 0 0 24px rgba(14, 35, 85, .16);
        border-radius: 2px;
        color: inherit;
        padding: 12px 10px 10px 16px;
        text-align: left;
        min-width: 277px;
    }
    
    &.bottom {
        margin-top: 5px;
        padding: 0;
        
        &.in {
            opacity: 1;
        }

        .tooltip-arrow {
            left: 20px !important;
            position: absolute;
            width: 0;
            height: 0;
            margin-top: 0;
            top: -3px !important;
            right: 6px;
            margin-left: 0 !important;
            box-sizing: border-box;
            border: 8px solid black !important;
            border-color: #fff transparent transparent #fff !important;
            transform-origin: 0 0;
            transform: rotate(45deg);
            box-shadow: -3px -3px 4px -1px rgba(0, 0, 0, .1);
    
            &:after {
                display: none;
            }
        }
    }

    .link {
        display: inline-block;
        margin-top: 3px;
        font-size: 12px;
        font-weight: 600;
        color: #737373;
        line-height: 1.4;
        text-decoration: none;
        border-bottom: 1px solid #737373;
        
        &:hover {
            color: #737373;
        }
    }
`;
