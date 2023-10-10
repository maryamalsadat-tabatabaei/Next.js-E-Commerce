import { ReactNode, MouseEventHandler } from "react";
import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onDismiss: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title = "My Modal",
  onDismiss,
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="shadow-md transition ease-in-out fixed w-screen h-screen bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onDismiss}
    >
      <div
        className="min-w-[400px] max-w-full overflow-x-hidden min-h-[200px] bg-white rounded-xl p-4 flex flex-col relative"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-between mb-1 border-b-2 border-b-gray-300">
          <h1 className="text-lg font-bold text-red-700">{title}</h1>
          <AiOutlineCloseCircle
            className=" text-2xl font-bold text-red-700 cursor-pointer"
            onClick={onDismiss}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
