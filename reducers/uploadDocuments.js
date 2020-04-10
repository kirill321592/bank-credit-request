const initState = {
    uploading: false,
    bankAccountFiles: [],
    transactionHistoryFiles: [],
    accountStatementFiles: [],
    errors: {}
};

export default (state = initState, action) => {
    switch (action.type) {
    case 'READ_UPLOADED_FILES':
        return {
            ...state,
            bankAccountFiles: [
                ...(action.data.bankAccountFiles && action.data.bankAccountFiles.length ? action.data.bankAccountFiles : [])
            ],
            transactionHistoryFiles: [
                ...(action.data.transactionHistoryFiles && action.data.transactionHistoryFiles.length ? action.data.transactionHistoryFiles : [])
            ],
            accountStatementFiles: [
                ...(action.data.accountStatementFiles && action.data.accountStatementFiles.length ? action.data.accountStatementFiles : [])
            ],
        };
    case 'FILE_UPLOADING':
        return {
            ...state,
            [action.fieldName]: [
                ...state[action.fieldName],
                action.data
            ],
            uploading: true
        };
    case 'UPLOAD_SUCCESS':
        return {
            ...state,
            [action.fieldName]: [
                ...state[action.fieldName].map(fileInfo => !fileInfo.docInfo.id && fileInfo.docInfo.fileName === action.data.docInfo.fileName ? action.data : fileInfo)
            ],
            uploading: false
        };
    case 'UPLOAD_FAILURE':
        return {
            ...state,
            [action.fieldName]: [
                ...state[action.fieldName].filter(fileInfo => !(fileInfo.loading))
            ],
            errors: {
                ...state.errors,
                [action.fieldName]: action.message
            },
            uploading: false
        };
    case 'REMOVE_FILE_SUCCESS':
        return {
            ...state,
            [action.fieldName]: [
                ...state[action.fieldName].filter(fileInfo => !(fileInfo.docInfo.id === action.fileId))
            ]
        };
    case 'REMOVE_ERROR':
        return {
            ...state,
            errors: {}
        };
    default:
        return state;
    }
};
