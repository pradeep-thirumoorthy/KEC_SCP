import React from 'react';
import ClipboardJS from 'clipboard';
import { message,Button } from 'antd';
class CopyToClipboard extends React.Component {
  componentDidMount() {
    this.clipboard = new ClipboardJS(this.copyButton, {
      text: () =>this.props.textToCopy,
    });

    this.clipboard.on('success', () => {
      message.success('Link is Copied');
    });
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    return (
        <Button type='link' ref={(btn) => (this.copyButton = btn)}>
        Get Link
        </Button>
    );
  }
}

export default CopyToClipboard;
