"use client";

import { useEffect, useState } from "react";
import DialogAddTask from "./components/DialogAddTask";
import Header from "./components/Header";
import Task from "./components/Task";
import "./styles/page.scss";
import DialogRemoveTask from "./components/DialogRemoveTask";
import axios from "axios";

export default function Home() {
  const [openDialogAdd, setOpenDialogAdd] = useState<boolean>(false);
  const [openDialogRemove, setOpenDialogRemove] = useState<boolean>(false);
  const [listTask, setListTask] = useState<Array<any>>([]);
  const [listTaskFinished, setListTaskFinished] = useState<Array<any>>([]);
  const [taskDelete, setTaskDelete] = useState<any>();
  function handleOpenDialogAdd() {
    setOpenDialogAdd(true);
  }

  function handleCloseDialogAdd(refresh?: boolean) {
    setOpenDialogAdd(false);
    if(refresh) handleListTask()
  }

  function handleOpenDialogRemove(task:any) {
    setOpenDialogRemove(true);
    setTaskDelete(task)
  }

  function handleCloseDialogRemove(refresh?: boolean) {
    setOpenDialogRemove(false);
    if(refresh) handleListTask()

  }

  async function handleListTask() {
    const resp = await axios.get("http://localhost:3001/tasks");
    setListTask(resp.data.filter((e:any)=> e.finished == false));
    setListTaskFinished(resp.data.filter((e:any)=> e.finished == true))
  }

  async function handleUpdateTask(task:any) {
    task.finished = !task.finished
    await axios.put(`http://localhost:3001/tasks/${task.id}`, task)
    handleListTask()
  }

  useEffect(() => {
    handleListTask();
  }, []);

  return (
    <div>
      <Header />
      <div className="content">
        <div className="card">
          <p className="title-card">Suas tarefas de hoje</p>
          {listTask.map((e: any) => (
            <div key={e.id}>
              <Task handleUpdateTask={handleUpdateTask} data={e} handleOpenDialogRemove={handleOpenDialogRemove} />
            </div>
          ))}
          <p className="title-card">Tarefas finalizadas</p>
          {listTaskFinished.map((e:any) =>
          <div key={e.id}>
              <Task handleUpdateTask={handleUpdateTask} data={e} handleOpenDialogRemove={handleOpenDialogRemove} />
          </div>
          )}
        </div>
        <button onClick={handleOpenDialogAdd} className="btn">
          Adicionar nova tarefa
        </button>
      </div>
      <DialogAddTask open={openDialogAdd} handleClose={handleCloseDialogAdd} />
      <DialogRemoveTask 
        open={openDialogRemove}
        data={taskDelete}
        handleClose={handleCloseDialogRemove}
      />
    </div>
  );
}
