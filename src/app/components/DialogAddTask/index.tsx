"use client";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import "./style.scss";
import axios from "axios";

interface Props {
  open: boolean;
  handleClose: any;
}

export default function DialogAddTask({ open, handleClose }: Props) {
  const [newTask, setNewtask] = useState<string>("");
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  async function addTask() {
    const task = {
      title: newTask,
      finished: false,
    };
    await axios.post("http://localhost:3001/tasks", task);
    handleClose(true);
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle className="title-dialog">Nova tarefa</DialogTitle>
      <DialogContent className="dialog-content">
        <label>Título</label>
        <input
          onChange={(e) => setNewtask(e.target.value)}
          placeholder="Digite"
          type="text"
        />
      </DialogContent>
      <DialogActions className="content-actions">
        <button className="btn-cancel" onClick={handleClose} autoFocus>
          Cancelar
        </button>
        <button className="btn-add" onClick={addTask} autoFocus>
          Adicionar
        </button>
      </DialogActions>
    </Dialog>
  );
}
