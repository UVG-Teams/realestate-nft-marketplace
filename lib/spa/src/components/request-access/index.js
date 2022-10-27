import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

const RequestAccess = () => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Conecta tu wallet</AlertTitle>
      <AlertDescription>para acceder a la app</AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>
  );
};

export default RequestAccess;
