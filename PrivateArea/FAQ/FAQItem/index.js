import { React, } from 'core-front/libs';
import FAQQuestion from '../FAQQuestion';

export default ({ questions, FAQindex }) => (
        <>
            {questions && questions.map(({ question, answer }, index) => (
                <FAQQuestion
                    key={question}
                    question={question}
                    answer={answer}
                    FAQindex={FAQindex}
                    questionIndex={index}
                />
            ))}
        </>
);

