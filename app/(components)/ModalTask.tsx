import React from "react";

const ModalTask = ({ setShow }: any) => {
  function handleOut(e: any) {
    if (e.currentTarget === e.target) {
      setShow(false);
    }
  }

  return (
    <div
      onClick={handleOut}
      className="min-h-screen bg-[rgb(0,0,0,0.3)] fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center p-10"
    >
      <div className="relative min-h-[90vh] bg-primary w-full rounded-md">
        <span
          onClick={() => setShow(false)}
          className="absolute top-2 right-4 font-semibold cursor-pointer"
        >
          X
        </span>
      </div>
    </div>
  );
};

export default ModalTask;
