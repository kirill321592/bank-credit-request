import { React, styled } from 'core-front/libs';

export default class MMFileUploader extends React.Component {
    handleChange(e) {
        const reader = new FileReader();
        const self = this;
        let fileInfo = {};

        reader.onload = loadEvent => {
            self.props.onFileSelect(loadEvent.target.result, fileInfo);
        };

        fileInfo = e.target.files[0];
        reader.readAsDataURL(e.target.files[0]);
    }

    render() {
        const { value, onFileSelect, onChange, ...props } = this.props;

        return (
            <StyledFileInput
                {...props}
                onChange={this.handleChange.bind(this)}
            />
        );
    }
}

const StyledFileInput = styled.input`
    &[type="file"] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        opacity: 0;
        font-size: 150px;
        height: 18px;
        z-index: 20;
        cursor: pointer;
    }
`;
