import React from 'react';
import { Text as RNText } from 'react-native-paper';
import styles from './styles';

const Heading = ({ children, style }) => (
  <RNText style={{ ...styles.heading, ...style }}>{children}</RNText>
);

const SubHeading = ({ children, style }) => (
  <RNText style={{ ...styles.subHeading, ...style }}>{children}</RNText>
);

const Text = ({ children, style }) => (
  <RNText style={{ ...styles.regular, ...style }}>{children}</RNText>
);

export { Text, Heading, SubHeading };
