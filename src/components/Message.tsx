import { Alert } from '@chakra-ui/react';
import React from 'react';

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};
Message.defaultProps = {
  variant: 'info',
};
export default Message;
