import { React } from 'core-front/libs';
import BaseLayout from '../Base';
import Contacts from 'PrivateArea/shared/Contacts';

const TwoColumnLayout = ({ children, options = {}, aside, beforeContent, title }) => {
    return (
        <BaseLayout options={options} beforeContent={beforeContent}>
            {title && (
                <section className="col-md-12">
                    <h1>{title}</h1>
                </section>
            )}

            <section className="col-md-6">
                {children}
            </section>

            <aside className="hidden-xs hidden-sm col-md-5 col-md-offset-1">
                {aside}
                <Contacts />
            </aside>
        </BaseLayout>
    );
};

export default TwoColumnLayout;
