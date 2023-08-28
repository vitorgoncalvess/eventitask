'use client';

import axiosInstance from '@/app/(axios)/config';
import Sidebar from '../../(components)/Sidebar';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Header from '@/app/(components)/Header';
import Section from '@/app/(components)/Section';
import { createContext } from 'react';

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
  _id: '',
  name: '',
  sections: [],
});

const Page = ({ params }: { params: { board: string } }) => {
  const [board, setBoard] = useState<any>();

  const { isLoading, refetch } = useQuery(
    'board',
    () => {
      return axiosInstance.get(`/boards/${params.board}`);
    },
    {
      onSuccess(response: any) {
        setBoard(response.data);
      },
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <BoardContext.Provider value={board}>
      <div className="relative flex min-h-[150vh]">
        <Sidebar />
        {isLoading && <>Carregando...</>}
        {board && (
          <div className="flex flex-col min-w-full">
            <Header
              secs={board?.sections}
              refetch={refetch}
              id={board._id}
              name={board.name}
            />
            <div className="pl-72">
              <section className="w-full flex p-8 gap-4">
                {board?.sections?.map((sec: any) => (
                  <Section key={sec._id} sec={sec} />
                ))}
              </section>
            </div>
          </div>
        )}
      </div>
    </BoardContext.Provider>
  );
};

export default Page;
