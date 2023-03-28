import Image from "next/image";
export default function Home() {
  return (
    <div className="container">
      <div className="logo">
        <img src="/logo.svg" />
      </div>
      <div className="coming-soon">
        <h1>Coming Soon</h1>
      </div>
    </div>
  );
}
