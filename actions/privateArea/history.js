import { api } from 'core-front';
import { PRIVATE_AREA_API } from 'api';
import  download from 'downloadjs';

export const fetchHistory = () => async dispatch => {
    const res = await fetch(PRIVATE_AREA_API['LOAN_HISTORY'], {
        ...api.headers.get
    });

    if (res.ok) {
        const result = await res.json();

        dispatch({ type: 'SET_LOAN_HISTORY_ITEMS', result: result.loanHistoryObjects });
    }
};

export const downloadItem = loanNumber => async () => {
    const res = await fetch(`${PRIVATE_AREA_API['LOAN_HISTORY_DOWNLOAD']}?creditId=${loanNumber}`, {
        ...api.headers.get
    });

    if (res.ok) {
        const result = await res.blob();

        download(result,  'contrato.pdf', 'text/pdf');
    }
};

