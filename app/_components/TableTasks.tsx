import React, { useMemo, useState } from "react";
import table from "../_utils/table";
import {
  Avatar,
  AvatarGroup,
  Button,
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import strings from "../_utils/strings";
import { Dash } from "../_utils/interfaces";
import { useAsyncList } from "@react-stately/data";

const TableTasks = ({ id }: { id: string }) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { OPTIONS } = strings;

  let list = useAsyncList({
    async load({ signal }) {
      let res = await fetch(`/api/boards/${id}/dash-tasks`, {
        signal,
      });
      let json = await res.json();
      setIsLoading(false);

      return {
        items: json,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  }) as any;

  const pages = Math.ceil(list.items.length / 5);

  const items = useMemo(() => {
    const inicio = (page - 1) * 5;
    const fim = inicio + 5;

    return list.items.slice(inicio, fim);
  }, [page, list]);

  const { TABLETASK } = table;

  const renderCell = React.useCallback((task: any, columnKey: React.Key) => {
    const cellValue = task[columnKey];

    switch (columnKey) {
      case "task_name":
        return (
          <Tooltip
            delay={500}
            classNames={{
              base: "bg-primary",
            }}
            content={task.task_name}
          >
            <span>
              {task.task_name.length > 18
                ? task.task_name.substring(0, 18) + "..."
                : task.task_name}
            </span>
          </Tooltip>
        );
      case "task_status":
        return (
          <Chip
            radius="sm"
            classNames={{
              base: OPTIONS[task.task_status].color + " text-opacity-80",
            }}
          >
            {OPTIONS[task.task_status].value}
          </Chip>
        );
      case "task_time":
        return (
          <span className="flex items-center">{task.task_time} Horas</span>
        );
      case "task_data_estimada":
        return (
          <span>
            {new Date(task.task_data_estimada).toLocaleDateString("pt-br")}
          </span>
        );
      case "show_more":
        return (
          <Button color="warning" size="sm">
            Ver Mais
          </Button>
        );
      case "u_resp":
        return (
          <AvatarGroup max={3} className="flex items-center justify-start">
            {task.u_resp.map((usuario: any) => (
              <Avatar
                size="sm"
                src={usuario.img}
                key={usuario.id}
                name={usuario.name}
              />
            ))}
          </AvatarGroup>
        );
      default:
        return cellValue;
    }
  }, []); //eslint-disable-line

  return (
    <div className="col-start-1 col-end-3 flex flex-col items-center gap-4 mt-6 overflow-hidden">
      <Table
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        classNames={{
          wrapper: "bg-secondary",
          th: "bg-primary",
        }}
      >
        <TableHeader columns={TABLETASK}>
          {(column) => (
            <TableColumn allowsSorting={column.sort} key={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody isLoading={isLoading}>
          {items.map((item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        classNames={{
          item: "bg-primary text-white data-[hover=true]:bg-secondary",
          cursor: "bg-base",
        }}
        page={page}
        total={pages}
        onChange={(page) => setPage(page)}
      />
    </div>
  );
};

export default TableTasks;
