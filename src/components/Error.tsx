import { Alert, IconButton } from "@mui/material";
import { ErrorBannerPropsInterface } from "../types";

const ErrorBanner = ({message,onClick} : ErrorBannerPropsInterface) => {
    return (
        <Alert
          variant="filled"
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => onClick()}
            >
              X
            </IconButton>
          }
        >
          {message}
        </Alert>
      )
};

export default ErrorBanner;