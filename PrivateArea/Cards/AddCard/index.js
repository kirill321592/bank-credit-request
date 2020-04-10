import { React } from 'core-front/libs';

import { Row } from 'react-bootstrap';

import BackLink from 'PrivateArea/shared/BackLink';

import { CARDS } from 'PrivateArea/config';

const AddCard = () => (
    <Row>
        <section className="col-xs-12 sub-page step-header">
            <BackLink url={CARDS.url} name="Nueva tarjeta de débito" />
        </section>
    </Row>
);

export default AddCard;
