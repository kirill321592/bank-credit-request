import { React, styled } from 'core-front/libs';
import { ProgressBar } from 'react-bootstrap';
import { ga } from 'core-front';
import { API } from 'api';

import { uploadFile } from '../../actions/documents.js';
import { BaseModal } from '../';

import averseImg from './assets/front-photo.png';
import reverseImg from './assets/back-photo.png';
import bankStatementImg from './assets/middle-photo.png';
import averseLgImg from './assets/front-photo3x.png';
import reverseLgImg from './assets/back-photo3x.png';
import bankStatementLgImg from './assets/middle-photo3x.png';
import photoImg from './assets/photo.svg';
import checkedImg from './assets/checked.svg';

const styleButton = {
    backgroundColor: 'transparent',
    letterSpacing: '0',
    marginBottom: '0',
    fontWeight: '400',
    outlineWidth: '0',
    color: '#9edc15',
    fontSize: '1em',
    padding: '0',
    marginLeft: '10px'
};

const FILES = {
    AVERSE_ID: {
        alt: 'averse',
        img: averseImg,
        imgLg: averseLgImg,
        title: <>DNI / NIE Parte frontal</>
    },
    REVERSE_ID: {
        alt: 'reverse',
        img: reverseImg,
        imgLg: reverseLgImg,
        title: <>DNI / NIE Parte posterior</>
    },
    ACCOUNT_PROOF: {
        alt: 'bankStatement',
        img: bankStatementImg,
        imgLg: bankStatementLgImg,
        title: <>Justificante bancario</>
    },
};

const initialState = {
    uploadProgress: 30,
    status: null,
    files: [],
    uuid: ''
};

const MAX_FILE_SIZE = 10000000;

const renderIconBox = (files, FILE, status)  => {
    if (status === 'ERROR' || !files) {
        return (
            <div className="center-circle">
                <img src={photoImg} alt={`upload document ${FILE.alt}`} />
                <p>Subir foto</p>
            </div>
        );
    } else {
        return (
            <div className="center-circle loaded">
                <img src={checkedImg} className="checked" alt={`upload document ${FILE.alt}`} />
            </div>
        );
    }
};

export default class FileUploader extends React.Component {
    state = initialState;

    onChangeWrapper = ({ target: { files }}) => {
        if (!files[0]) return;

        const { name, onChange } = this.props;


        if (!(/\.(pdf|jpg|jpeg|tiff|png)$/i).test(files[0].name) || files[0].size > MAX_FILE_SIZE) {
            this.setState({
                uploadProgress: 100,
                status: 'ERROR',
                files: [files[0]]
            });
        } else {
            this.setState({ files: [files[0]]});
            const upLoadUrl = this.props.url || API.UPLOAD_DOCUMENT;

            uploadFile(files[0], upLoadUrl)
                .then(({ data }) => {
                    ga.sendEvent('doc-upload', name, 'success');

                    this.setState({
                        uuid: data,
                        uploadProgress: 100
                    });
                    onChange(data);
                })
                .catch(() => {
                    ga.sendEvent('doc-upload', name, 'fail');
                });
        }
    };

    onRemove = e => {
        e.preventDefault();

        const { onChange } = this.props;

        this.setState({ ...initialState });

        onChange(null);
    };

    render() {
        const { name } = this.props;
        const { uuid, uploadProgress, files, status } = this.state;
        const FILE = FILES[name];

        return (
            <StyledContainer status={status}>
                <StyledUploadItemHeader>
                    <BaseModal
                        styleBtn={styleButton}
                        link={FILE.title}
                    >
                        <ImageWrapper>
                            <img src={FILE.imgLg} alt={`upload document ${FILE.alt}`} />
                        </ImageWrapper>
                    </BaseModal>
                </StyledUploadItemHeader>

                {!uuid && (
                    <input {...this.props} value={uuid} onChange={this.onChangeWrapper} />
                )}

                <PhotoWrap>
                    <img className="photo-example" src={FILE.img} alt={`upload document ${FILE.alt}`} />

                    {renderIconBox(files[0], FILE, status)}
                </PhotoWrap>

                {files[0] && (
                    <StyledFileInfo>
                        <div>
                            <p className="clearfix">
                                <span className="name">{files[0].name}</span>
                                <span className="size">{(files[0].size/1024).toFixed(0)} KB</span>
                            </p>

                            <ProgressBar now={uploadProgress} />
                        </div>

                        <button
                            onClick={this.onRemove}
                            name="removeFile"
                            type="button"
                        >
                            <span className="glyphicon glyphicon-trash" />
                        </button>
                    </StyledFileInfo>
                )}
            </StyledContainer>
        );
    }
}

const StyledContainer = styled.div`
    position: relative;
    margin-top: -20px;
    margin-bottom: 30px;
    input {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        opacity: 0;
    }
    > img {
        cursor: pointer;
        width: 100%;
        border-radius: 4px;
        border: solid 1px #d3d2d2;
    }
    .progress {
        height: 6px;
        margin-bottom: 0;
    }
    .progress-bar {
       background-color: ${props => props.status === 'ERROR' ? '#ff4b4b' : '#9edc15'};
       box-shadow: none;
    }
    
    .glyphicon {
      color: ${props => props.status === 'ERROR' ? '#ff4b4b' : '#4c4c4c'};
    }

    .center-circle {
        text-align: center;
        font-size: 8px;
        width: 60px;
        height: 60px;
        top: 50%;
        margin-left: -30px;
        margin-top: -30px;
        left: 50%;
        box-shadow: 0 0 6px 0 rgba(0,0,0,0.3);
        background-color: #ffffff;
        border-radius: 50%;
        position: absolute;
        cursor: pointer;
        &.loaded {
            margin-top: -46px;
        }
        img {
            width: 100%;
            padding: 12px 16px 2px;
        }
        img.checked {
            padding: 15px 10px;
        }
    }
`;

const PhotoWrap = styled.div`
  position: relative;

  .photo-example {
    width: 100%;
  }
`;

const StyledUploadItemHeader = styled.h4`
    font-weight: 600;
    color: #9edc15;
    font-size: 16px;
    span {
        background-color: #9edc15;
        border-radius: 50%;
        height: 18px;
        width: 18px;
        display: inline-block;
        text-align: center;
        font-size: 11px;
        vertical-align: bottom;
        line-height: 18px;
        color: #fff;
    }
`;

const StyledFileInfo = styled.div`
    margin-top: 10px;
    padding: 10px;
    border-radius: 2px;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
    > div {
        width: 80%;
        display: inline-block;
    }
    button {
        background: none;
        display: inline-block;
        width: 20%;
        border: none;
    }
    p {
        font-size: 10px;
        color: #737373;
        .name,
        .size {
            display: inline-block;
        }
        .name {
            width: 70%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            vertical-align: bottom;
        }
        .size {
            width: 30%;
            text-align: right;
        }
    }
`;

const ImageWrapper = styled.div`
    text-align: center;
    img {
      display: inline-block;
      max-width: 100%;
    }
`;
