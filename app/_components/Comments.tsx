import axiosInstance from "../_axios/config";
import { FormEvent, useState, useEffect } from "react";
import Image from "next/image";

const Comments = ({ id }: { id: string }) => {
  const [comments, setComments] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const idUser = localStorage.getItem("id");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get(`/tasks/${id}/comments`).then((response) => {
      setComments(response.data);
      setLoading(false);
    });
  }, [id]);

  function handleSubmit(e?: FormEvent) {
    if (e) e.preventDefault();
    axiosInstance
      .post(`/tasks/${id}/comments`, { message, idUser })
      .then((response) => {
        setComments([...comments, response.data]);
        setMessage("");
      });
  }

  function handleEnter(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="w-4/12 h-full border-l-2 border-[#3d3d49] flex flex-col-reverse">
      <form onSubmit={handleSubmit} className="flex gap-2 p-2 w-full">
        <textarea
          value={message}
          onChange={({ target }) => setMessage(target.value)}
          onKeyDown={(e: any) => handleEnter(e)}
          className="w-full bg-primary border-2 border-[#3d3d49] rounded-md outline-none p-2 h-16 resize-none"
        ></textarea>
        <button className="bg-base w-20 text-2xl rounded-md">{">"}</button>
      </form>
      <ul className="p-2 flex flex-col gap-2 overflow-auto">
        {loading
          ? Array.from({ length: 7 }).map((_, index) => (
              <li
                key={index}
                className="bg-secondary animate-pulse w-full h-14 rounded-md"
              ></li>
            ))
          : comments.map((comment: any) => (
              <li
                className="flex bg-secondary p-2 text-white gap-2 rounded-md"
                key={comment.id}
              >
                <Image
                  className="h-9 w-9 rounded-full object-cover"
                  height={100}
                  width={100}
                  src={comment.img}
                  alt="user"
                />
                <div className="relative w-[89%]">
                  <h1 className="text-sm opacity-50">{comment.name}</h1>
                  <span className="break-words opacity-80 w-full">
                    {comment.message}
                  </span>
                  <span className="absolute text-xs bottom-0 right-0 opacity-50">
                    {comment.time?.substring(0, 5)}
                  </span>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Comments;
