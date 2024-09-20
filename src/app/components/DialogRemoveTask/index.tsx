import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import "./style.scss";
import axios from "axios";

interface Props {
  open: boolean;
  handleClose: any;
  data: any;
}

export default function DialogRemoveTask({ open, handleClose, data }: Props) {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  async function handleDeleteTask() {
    await axios.delete(`http://localhost:3001/tasks/${data.id}`);
    handleClose(true);
  }

  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      onClose={handleClose}
    >
      <DialogTitle className="title-dialog">Deletar tarefa</DialogTitle>
      <DialogContent className="dialog-content-remove">
        <p>Tem certeza que você deseja deletar essa tarefa?</p>
      </DialogContent>
      <DialogActions className="content-actions">
          <button className="btn-cancel" onClick={handleClose} autoFocus>
            Cancelar
          </button>
          <button className="btn-remove" onClick={handleDeleteTask} autoFocus>
            Deletar
          </button>
      </DialogActions>
    </Dialog>
  );
}
