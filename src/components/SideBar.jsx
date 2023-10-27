import { useState } from "react";
import { FaHome, FaHeart, FaUser, FaEnvelope } from "react-icons/fa"; // Example generic icons
import '../App.css';

const SideBar = () => {
  const [selected, setSelected] = useState(0);

  const navItems = [
    { icon: <FaHome />, id: 0 },
    { icon: <FaHeart />, id: 2 },
    { icon: <FaUser />, id: 3 },
    { icon: <FaEnvelope />, id: 4 },
  ];

  return (
    <div className="bg-slate-900 text-slate-100 flex">
      <SideNav selected={selected} setSelected={setSelected} items={navItems} />
      <div className="w-full">{/* Your website content here */}</div>
    </div>
  );
};

const SideNav = ({ selected, setSelected, items }) => {
  return (
    <nav className="fixed h-screen w-16 bg-slate-950 p-4 flex flex-col items-center gap-2">
      {/* Your logo here */}
      <svg
        width="40"
        height="28"
        viewBox="0 0 40 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4"
      >
        {/* Your logo SVG here */}
      </svg>
      {items.map((item) => (
        <NavItem
          key={item.id}
          selected={selected === item.id}
          item={item}
          setSelected={setSelected}
        />
      ))}
    </nav>
  );
};

const NavItem = ({ selected, item, setSelected }) => {
  return (
    <button
      className={`p-3 text-xl ${
        selected ? "bg-indigo-600" : "bg-slate-800 hover:bg-slate-700"
      } rounded-md transition-colors relative`}
      onClick={() => setSelected(item.id)}
    >
      {item.icon}
    </button>
  );
};

export default SideBar;
