import "@mui/material";

declare module "react" {
  interface HTMLAttributes {
    [dataAttribute: `data-${string}`]: unknown;
  }
}
