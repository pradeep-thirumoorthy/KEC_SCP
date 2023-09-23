import React from 'react';
import ClipboardJS from 'clipboard';
import styled from 'styled-components';
const ClipboardContainer = styled.div`
-ms-overflow-style: none;
scrollbar-width: none;
::-webkit-scrollbar {
    display: none;
}
`;
class CopyToClipboard extends React.Component {
  componentDidMount() {
    this.clipboard = new ClipboardJS(this.copyButton, {
      text: () =>this.props.textToCopy,
    });

    this.clipboard.on('success', () => {
      alert('Text copied to clipboard!');
    });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    return (
        <button className=' w-100 bg-transparent border border-0 p-0' ref={(btn) => (this.copyButton = btn)}>
        <ClipboardContainer className='btn p-0'>Get Link</ClipboardContainer>
        </button>
    );
  }
}

export default CopyToClipboard;
