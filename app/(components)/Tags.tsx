import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import tagIcon from '@/public/tag.png';
import add from '@/public/add_circle.png';
import axiosInstance from '../(axios)/config';
import colors from '../(utils)/colors';

interface Tag {
  id: string;
  name: string;
}

const Tags = ({ id, tag, ids, setIds }: any) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [has, setHas] = useState<any[]>(tag || []);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [tagsDB] = await Promise.all([axiosInstance.get('/tags')]);
      setTags(tagsDB.data);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    setHas(tag || []);
  }, [id, tag]);

  function handleAdd(tag: Tag) {
    if (!has?.find((t) => t === tag.name)) {
      axiosInstance.patch(`/tasks/${id}/tags`, { id: tag.id }).then(() => {
        setHas([...has, tag.name]);
        setIds((ids) => [...ids, tag.id]);
        setShow(false);
      });
    }
  }

  return (
    <div className="relative flex ">
      <ul className="flex items-center gap-2 text-xs font-medium">
        {has &&
          has.map((tag, index) => (
            <li
              className={`${
                ids && colors[(Number(ids[index]) % colors.length) + 1]
              } py-1 px-2 rounded-md opacity-80`}
              key={index}
            >
              {tag}
            </li>
          ))}
        <div onClick={() => setShow(!show)} className="relative cursor-pointer">
          <Image className="h-4 w-4" alt="tag" src={tagIcon} />
          <Image
            className="absolute h-3 w-3 -top-2 -right-2"
            alt="tags"
            src={add}
          />
        </div>
      </ul>
      {show && (
        <ul className="absolute z-20 top-6 gap-2 flex flex-col items-start bg-secondary rounded-md p-2">
          {tags.map((tag, index) => (
            <li
              onClick={() => handleAdd(tag)}
              className={`${
                ids && colors[(Number(ids[index]) % colors.length) + 1]
              } py-1 px-2 rounded-md cursor-pointer ${
                has.find((t) => t === tag.name) && 'opacity-50 cursor-default'
              }`}
              key={tag.id}
            >
              {tag.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tags;
