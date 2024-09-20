import "./style.scss";
import logo from "../../assets/img/logo.png";
import Image from "next/image";

export default function Header() {
  return (
      <div className="header">
        <Image src={logo} alt="Logo Focal Point" />
        <h1 className="title">Bem-vindo de volta, Marcus</h1>
        <p className="sub-title">Segunda, 01 de dezembro de 2025</p>
      </div>
     
  );
}
