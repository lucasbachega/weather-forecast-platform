// components/ErrorModal.tsx
"use client";

import {
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { theme } from "../../theme";

type ErrorModalProps = {
  title?: string;
  message: string;
  onClose?: () => void;
};

class ErrorModal extends React.Component<ErrorModalProps, { open: boolean }> {
  constructor(props: ErrorModalProps) {
    super(props);
    this.state = { open: true };
  }

  static open(params: ErrorModalProps) {
    const containerId = "global-error-modal-container";
    let container = document.getElementById(containerId);

    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      document.body.appendChild(container);
    }

    const root = ReactDOM.createRoot(container);

    // Envolvendo o unmount no setTimeout para evitar erro
    const handleClose = () => {
      setTimeout(() => {
        root.unmount();
        if (params.onClose) params.onClose();
      }, 0);
    };

    root.render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorModal {...params} onClose={handleClose} />
      </ThemeProvider>
    );
  }

  handleClose = () => {
    this.setState({ open: false }, () => {
      this.props.onClose?.();
    });
  };

  render() {
    const { title = "Erro", message } = this.props;

    return (
      <Dialog open={this.state.open} onClose={this.handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ErrorModal;
