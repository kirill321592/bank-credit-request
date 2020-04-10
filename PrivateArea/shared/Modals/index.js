import { React, styled } from 'core-front/libs';
import { useSelector, useDispatch } from 'react-redux';
import  UploadDoc from './UploadDoc';
import PreApproval from './PreApproval';
import { BaseModal } from 'components';

import { setDocList, setPreCredit } from 'actions/privateArea/user';

const { useEffect, useState } = React;

export default () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setDocList());
        dispatch(setPreCredit());
    }, [dispatch]);

    const { fileTypes, preCredit } = useSelector(state => (state.privateAreaUser));
    const [showedUploadDoc, toggleUploadDoc] = useState(true);
    const [showedPreOrder, togglePreOrder] = useState(true);

    return (
        <>
        {showedUploadDoc && fileTypes[0] && (
            <StyledModal
                showed={showedUploadDoc}
            >
                <UploadDoc
                    handleShow={toggleUploadDoc}
                    documents={fileTypes}
                />
            </StyledModal>
        )}
            {showedPreOrder && preCredit && preCredit.status === 'WAIT_FOR_APPROVE' && (
                <StyledModal
                    showed={showedPreOrder}
                >
                    <PreApproval
                        preCredit={preCredit}
                        togglePreOrder={togglePreOrder}
                    />
                </StyledModal>
            )}
        </>
    );
};
const StyledModal = styled(BaseModal)`
    .modal-content {
        border: none
    }
    .modal-header {
        border-bottom: none;
    }
`;

