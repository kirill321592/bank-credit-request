import { React } from 'core-front/libs';

import { useDispatch, useSelector } from 'react-redux';

import { setUserProfile } from 'actions/privateArea/user';

import PersonalInfoChangesNote from 'PrivateArea/shared/PersonalInfoChangesNote';
import PrivacyPolicy from 'PrivateArea/shared/PrivacyPolicy';
import BackLink from 'PrivateArea/shared/BackLink';

import { SETTINGS } from 'PrivateArea/config';

const { useEffect } = React;

const SettingsDetail = ({ children, isPrivacyPolicyVisible, isEditable, title }) => {
    const dispatch = useDispatch();

    const { isProfileDataLoaded } = useSelector(state => state.privateAreaUser);

    useEffect(() => {
        if (!isProfileDataLoaded) {
            dispatch(setUserProfile());
        }
    }, [dispatch, isProfileDataLoaded]);

    return (
        <>
            <BackLink name={title} url={SETTINGS.url} />

            {children}

            {!isEditable && (<PersonalInfoChangesNote />)}

            {isPrivacyPolicyVisible && (<PrivacyPolicy />)}
        </>
    );
};

export default SettingsDetail;
