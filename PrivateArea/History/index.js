import { React, styled } from 'core-front/libs';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHistory, downloadItem } from 'actions/privateArea/history';
import HistoryItem from './HistoryItem';

const { useEffect } = React;

export default () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHistory());
    }, [dispatch]);

    const { historyItems } = useSelector(state => (state.privateAreaHistory));

    const downLoadFile = loanNumber => {
        dispatch(downloadItem(loanNumber));
    };

    return (
        <div>
            <StyledH1>Historial de préstamos</StyledH1>
            <div className="loan-history-list">
                {historyItems && historyItems.map((item, index) => (
                    <HistoryItem
                        index={index}
                        key={item.loanNumber}
                        item={item}
                        downLoadFile={downLoadFile}
                    />
                ))}
            </div>
        </div>
    );
};
const StyledH1 = styled.h1`
    margin-right:-20px;
`;
