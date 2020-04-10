import { React, styled } from 'core-front/libs';
import { Button } from 'react-bootstrap';
import { ga } from 'core-front';

const convertIban = iban => {
    const string =  iban || '';
    const result = string.match(/(ES)(\d{2})(.*)(\d{4}$)/) || [];

    if (result.length) {
        return `${result[1]} ${result[2]} ${result[3].replace(/\d/g, '*')}${result[4]}`;
    }
};

const convertDebitCard = card => {
    const string =  card || '';
    const result = string.match(/(.*)(\d{4}$)/) || [];

    if (result.length) {
        return `${result[1].replace(/[\d\w-]/g, '*')}${result[2]}`;
    }
};

export default ({ submitting, initialValues, changeData, CATEGORY }) => {
    const { bankAccount={}, paylands={}} = initialValues;

    return (
            <>
                <UserInfoAddon>
                    <label>IBAN</label>
                    <span className="value">{convertIban(bankAccount.iban)}</span>
                    <StyledButton
                        disabled={submitting}
                        type="button"
                        className="edit-btn"
                        onClick={() => {
                            ga.sendEvent(CATEGORY, 'iban');
                            changeData();
                        }}
                    />
                </UserInfoAddon>
                <UserInfoAddon>
                    <label>Tarjeta</label>
                    <span className="value">{convertDebitCard(paylands.card)}</span>
                    <StyledButton
                        disabled={submitting}
                        type="button"
                        className="edit-btn"
                        onClick={() => {
                            ga.sendEvent(CATEGORY, 'dd');
                            changeData();
                        }}
                    />
                </UserInfoAddon>
            </>
    );
};

const UserInfoAddon = styled.div`
  background: white;
  padding: 24px 20px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 17px;
  border-radius: 4px;
  position: relative;

  @media (max-width: 991px) {  
    padding: 16px 20px;
  }

  label, .value {
      font-size: 19px;
      font-weight: bold; 
  }

  label {
      color: #4c4c4c;
      min-width: 70px;
      margin-right: 15px;
      margin-bottom: 0;
      @media (max-width: 991px) {  
        font-size: 18px;
      }
  }

  .value {
    color: #9b9b9b;
    @media (max-width: 991px) {  
        font-size: 15px;
    }
  }
`;

const StyledButton = styled(Button)`
    &.edit-btn {
        width: 26px;
        height: 26px;
        padding: 0;
        position: absolute;
        top: calc(50% - 13px);
        right: 20px;
        transition: .1s;
        background-color: transparent;
        background-image: url(./img/ico-edit-green.svg);
        background-repeat: no-repeat;
        background-size: 26px 26px;
        background-position: 50%;
        opacity: .8;
        margin-bottom: 0;
        &:focus {
          outline: 0;
        }
        &:hover {
            opacity: 1;
            background-color: transparent;
            border-color: transparent;
        }
    }
`;
