import { IoCopy } from "react-icons/io5";
import toast from "react-hot-toast";

export default function CopyField({ value }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success("Copied!");
  };

  return (
    <div className="bg-[#56ACBD]/70 w-90 shadow-lg font-bold p-3 flex justify-between items-center">
      <input
        value={value}
        disabled
        className="bg-transparent outline-none"
      />
      <button
        onClick={handleCopy}
        className="cursor-pointer">
        <IoCopy size={20} />
      </button>
    </div>
  );
}
