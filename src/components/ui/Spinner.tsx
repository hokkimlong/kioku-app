import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import SpinnerLoadingOverlay from 'react-native-loading-spinner-overlay';

const initalState = { visible: false };

const SpinnerContext = createContext({
  openSpinner: () => {},
  closeSpinner: () => {},
});

const SpinnerProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState(initalState);

  const openSpinner = () => {
    setState({ visible: true });
  };

  const closeSpinner = () => {
    setState({ visible: false });
  };

  return (
    <SpinnerContext.Provider value={{ openSpinner, closeSpinner }}>
      <SpinnerLoadingOverlay visible={state.visible} />
      {children}
    </SpinnerContext.Provider>
  );
};

export const useSpinner = () => useContext(SpinnerContext);

export default SpinnerProvider;
