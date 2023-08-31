"use client";

import axiosInstance from "@/app/(axios)/config";
import Sidebar from "../../(components)/Sidebar";
import { useState } from "react";
import { useQuery } from "react-query";
import Header from "@/app/(components)/Header";
import Section from "@/app/(components)/Section";
import { createContext } from "react";
import ModalSection from "@/app/(components)/ModalSection";
import Loading from "@/app/(components)/Loading";

interface Board {
  _id: string;
  name: string;
  sections: {
    _id: string;
    board_id: string;
    name: string;
    color: string;
    tasks: Object[];
  }[];
}

export const BoardContext = createContext<Board>({
  _id: "",
  name: "",
  sections: [],
});

const Page = ({ params }: { params: { board: string } }) => {
  const [board, setBoard] = useState<any>();
  const [show, setShow] = useState(false);

  const { isLoading, refetch } = useQuery(
    "board",
    () => {
      return axiosInstance.get(`/boards/${params.board}`);
    },
    {
      onSuccess(response: any) {
        setBoard(response.data);
      },
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <BoardContext.Provider value={{ board, refetch } as any}>
      {show && <ModalSection setShow={setShow} />}
      <div className="relative flex min-h-[100vh]">
        <Sidebar />
        {isLoading && <Loading color="white" />}
        {board && (
          <div className="flex flex-col min-w-full">
            <Header
              secs={board?.sections}
              refetch={refetch}
              id={board.id}
              name={board.name}
            />
            <div className="pl-72">
              <section className="w-full h-[85vh] flex p-8 gap-4 overflow-auto">
                {board?.sections.map((sec: any) => (
                  <Section key={sec.id} sec={sec} />
                ))}
                <div
                  onClick={() => setShow(true)}
                  className="bg-primary cursor-pointer px-4 mt-9 rounded flex flex-col items-center justify-center text-5xl text-center opacity-50 hover:opacity-60"
                >
                  <span>+</span>
                  <span className="text-xl font-medium">Nova Seção</span>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </BoardContext.Provider>
  );
};

export default Page;
