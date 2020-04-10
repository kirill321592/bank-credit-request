import { React, styled } from 'core-front/libs';
import { setFAQInfo } from 'actions/privateArea/faq';
import { useSelector, useDispatch } from 'react-redux';
import { PanelGroup } from 'react-bootstrap';
import FAQItem from './FAQItem/';

const { useEffect, useState } = React;

export default function () {
    const dispatch = useDispatch();

    const { FAQInfo } = useSelector(state => (state.privateAreaFAQ));
    const [activeKey, setKey] = useState(`${0}_${0}`);

    useEffect(() => {
        dispatch(setFAQInfo());
    }, [dispatch]);

    const handleSelect = activeKey => {
        setKey(activeKey);
    };

    return (
        <>
            <div className="col-md-12">
                <h1>Preguntas frecuentes</h1>
            </div>
            <div className="col-xs-12">
                <StyledCont>
                    <PanelGroup
                        accordion
                        id="accordion-controlled"
                        activeKey={activeKey}
                        onSelect={handleSelect}
                    >
                        {FAQInfo && FAQInfo.map(({ title, questions }, index) => (
                            <div key={title}>
                                <Styledh2>{title}</Styledh2>
                                <FAQItem
                                    FAQindex={index}
                                    questions={questions}
                                />
                            </div>
                        ))}
                    </PanelGroup>
                </StyledCont>
            </div>

        </>
    );
}

const StyledCont = styled.div`
    .panel-group .panel{
        margin-bottom: 30px;
        margin-left: 30px;
        border: none;
    }
    .panel{
        background-color:transparent;
        box-shadow: none;
    }
    .panel-body{
        font-size: 1.1em;
        font-weight: 500;
        padding: 20px 0 0;
        line-height: 1.7;
    }
    .panel-heading{
        padding:0;
    }
    .panel-default>.panel-heading{
        color:#4c4c4c;
        border:none;
        background-color:transparent;
    }
    .panel-default>.panel-heading+.panel-collapse>.panel-body{
        border-top:none;
    }
    @media (max-width: 767px){
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 0 6px 0 rgba(0,0,0,.2);
        padding: 30px 18px 10px 17px;
    }
`;
const Styledh2 = styled.h2`
    font-weight: 700;
    margin: 0 0 30px;
    @media (max-width: 575px){
        font-size: 20px;
    }
`;
