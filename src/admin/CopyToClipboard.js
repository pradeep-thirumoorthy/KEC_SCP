import React from 'react';
import ClipboardJS from 'clipboard';
import { Button } from 'antd';
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
        <Button className=' w-100 bg-transparent border border-0 p-0' ref={(btn) => (this.copyButton = btn)}>
        <div className='btn p-0'>Get Link</div>
        </Button>
    );
  }
}

export default CopyToClipboard;
