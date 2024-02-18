import React from 'react';
import { message, Button } from 'antd';

class CopyToClipboard extends React.Component {
  handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(this.props.textToCopy);
      message.success('Link is Copied');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      message.error('Failed to copy link to clipboard');
    }
  };

  render() {
    return (
      <Button type='link' onClick={this.handleCopyToClipboard}>
        Get Link
      </Button>
    );
  }
}

export default CopyToClipboard;
