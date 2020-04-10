import { React, styled } from 'core-front/libs';
import { Panel } from 'react-bootstrap';

export default ({ question, answer, FAQindex, questionIndex }) => (
    <StyledItem eventKey={`${FAQindex}_${questionIndex}`}>
        <Panel.Heading>
            <Panel.Title className="faq__title" toggle>
                <i className="faq__arrow"> </i>
                {question}
            </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible><div dangerouslySetInnerHTML={{ __html: answer }} /></Panel.Body>
    </StyledItem>
);

const StyledItem = styled(Panel)`
    .faq__title{
        cursor: pointer;
        position: relative;
        font-size: 1.3em;
        font-weight: 600;
    }
    .faq__title a{
       text-decoration:none
    }
    .collapsed .faq__arrow{
        transform: rotate(135deg);
    }

    @media (max-width: 767px){
        margin-bottom: 20px;
        .faq__title {
            font-size: 16px;
        }
    }
    .faq__arrow {
        transform: rotate(225deg);
        position: absolute;
        width: 10px;
        height: 10px;
        left: -30px;
        top: 30%;
        transition: transform .3s ease;
    }
    .faq__arrow:before, .faq__arrow:after {
        content: "";
        position: absolute;
        background: #9edc15;
        left: 0;
        top: 0;
    }
    .faq__arrow:before {
        width: 3px;
        height: 10px;
    }
    .faq__arrow:after {
        width: 10px;
        height: 3px;
    }
`;
