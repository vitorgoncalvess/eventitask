'use client';

import axiosInstance from '@/app/(axios)/config';
import Sidebar from '../../(components)/Sidebar';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Header from '@/app/(components)/Header';
import Section from '@/app/(components)/Section';

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

const Page = ({ params }: { params: { board: string } }) => {
  const [board, setBoard] = useState<Board>();

  const { isLoading, refetch } = useQuery(
    'board',
    () => {
      return axiosInstance.get(`/boards/${params.board}`);
    },
    {
      onSuccess(response) {
        setBoard(response.data);
      },
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <div className="relative flex min-h-screen">
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
            <section className="w-full flex p-8 gap-8">
              {board?.sections?.map((sec) => (
                <Section key={sec._id} sec={sec} />
              ))}
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
