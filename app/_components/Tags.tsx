import Image from "next/image";
import React, { useEffect, useState } from "react";
import tagIcon from "@/public/tag.png";
import add from "@/public/add_circle.png";
import axiosInstance from "../_axios/config";
import colors from "../_utils/colors";
import {
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import tagWhite from "@/public/tag_white.png";

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
      const [tagsDB] = await Promise.all([axiosInstance.get("/tags")]);
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

  function handleDelete(tag, index) {
    axiosInstance.put(`/tasks/${id}/tags`, { id: index }).then(() => {
      setHas(has.filter((tg) => tg !== tag));
      setIds(ids.filter((i) => i !== index));
    });
  }

  return (
    <div className="relative flex ">
      <ul className="flex items-center gap-2 text-xs font-medium">
        {has &&
          has.map((tag, index) => (
            <Chip
              radius="sm"
              onClose={() => handleDelete(tag, ids[index])}
              classNames={{
                base: `${
                  colors[Number(ids[index]) % colors.length]
                } opacity-70 text-white`,
              }}
              key={index}
            >
              {tag}
            </Chip>
          ))}
        <Dropdown
          classNames={{
            base: "bg-primary",
          }}
        >
          <DropdownTrigger>
            <div className="relative">
              <Image className="h-4 w-4" alt="tag" src={tagIcon} />
              <Image
                className="absolute h-3 w-3 -top-2 -right-2"
                alt="tags"
                src={add}
              />
            </div>
          </DropdownTrigger>
          {/*@ts-ignore*/}
          <DropdownMenu color="">
            {tags?.map((tag, index) => (
              <DropdownItem
                onClick={() => handleAdd(tag)}
                className={`${colors[(index % colors.length) + 1]} ${
                  has.find((t) => t === tag.name) && "opacity-30 cursor-default"
                }`}
                key={tag.id}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{tag.name}</span>
                  <Image className="h-4 w-4" alt="tag" src={tagWhite} />
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </ul>
      {show && (
        <ul className="absolute z-20 top-6 gap-2 flex flex-col items-start bg-secondary rounded-md p-2 min-w-[110px]">
          {tags &&
            tags.map((tag, index) => (
              <li
                onClick={() => handleAdd(tag)}
                className={`${
                  ids && colors[(index % colors.length) + 1]
                } py-1 px-2 rounded-md  ${
                  has.find((t) => t == tag.name)
                    ? "opacity-50 cursor-default"
                    : "cursor-pointer"
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
