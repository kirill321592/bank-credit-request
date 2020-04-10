import { React } from 'core-front/libs';

import { Footer as PageFooter } from 'components';
import Prolongation from 'PrivateArea/shared/Footer/Prolongation';

const Footer = ({ withWave, showLogos, withProlongation }) => (
    <>
        {withProlongation && <Prolongation />}

        <PageFooter
            withWave={withWave}
            showLogos={showLogos}
        />
    </>
);

export default Footer;
