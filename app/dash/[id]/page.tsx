import React from "react";

const getDash = async (id: string) => {
  const [nameFetch] = await Promise.all([
    await fetch(`http://localhost:3000/api/boards/${id}/name`),
  ]);
  const name = await nameFetch.json();
  return { name: name.name };
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { name } = await getDash(params.id);
  return (
    <div>
      <h1 className="text-2xl font-medium">{name}</h1>
    </div>
  );
};

export default Page;
