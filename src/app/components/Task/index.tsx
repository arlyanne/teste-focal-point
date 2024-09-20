import "./style.scss";
import iconTrash from "../../assets/img/trash.svg";
import Image from "next/image";
interface Props {
  handleOpenDialogRemove?: any;
  data:any;
  handleUpdateTask:any
}
export default function Task({handleOpenDialogRemove, data, handleUpdateTask}:Props) {

  return (
    <div className="task">
      <div className="field">
        <input type="checkbox" checked={data.finished} onChange={() => handleUpdateTask(data)}/>
        <p className={data.finished == true ? "finished" : ""}>{data?.title}</p>
      </div>
      <button onClick={()=> handleOpenDialogRemove(data)}>
        <Image src={iconTrash} alt="Deletar" />
      </button>
    </div>
  );
}
