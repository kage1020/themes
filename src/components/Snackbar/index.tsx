import Close from "@mui/icons-material/Close";
import type { AlertColor } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import {
  closeSnackbar,
  SnackbarProvider,
  useSnackbar as useNotistackbar,
} from "notistack";
import { useCallback } from "react";

export type SnackType = {
  message: string;
  type: AlertColor;
};

export const useSnackbar = () => {
  const { enqueueSnackbar } = useNotistackbar();

  const setSnack = useCallback(
    (message: string, type: AlertColor = "info") => {
      enqueueSnackbar(message, { variant: type, autoHideDuration: 5000 });
    },
    [enqueueSnackbar],
  );

  return { setSnack };
};

export type SnackProviderProps = {
  children: React.ReactNode;
};

export function SnackProvider({ children }: SnackProviderProps) {
  return (
    <>
      <style>
        {`
          .notistack-MuiContent {
            flex-wrap: nowrap;
          }
          #notistack-snackbar {
            word-break: break-word;
          }
        `}
      </style>
      <SnackbarProvider
        style={{ maxWidth: "300px" }}
        maxSnack={5}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        action={(id) => (
          <Button
            sx={{ minWidth: 0 }}
            color="inherit"
            variant="text"
            onClick={() => closeSnackbar(id)}
          >
            <Close />
          </Button>
        )}
      >
        {children}
      </SnackbarProvider>
    </>
  );
}
