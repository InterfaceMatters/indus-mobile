import React from 'react';
import QRCode from 'react-native-qrcode-svg';

const GenerateQrCode = ({val, size}) => <QRCode value={val} size={size}  />;

export default GenerateQrCode;
