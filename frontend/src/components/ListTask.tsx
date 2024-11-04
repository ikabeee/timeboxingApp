import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  ChipProps,
} from "@nextui-org/react";
import { EditIcon } from "../assets/EditIcon.tsx";
import { DeleteIcon } from "../assets/DeleteIcon.tsx";
import { EyeIcon } from "../assets/EyeIcon.js";
import useTasks from "../hooks/useTasks.ts"; 
import Loader from "../common/Loader.tsx"; 

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const columns = [
  { uid: "title", name: "Título" },
  { uid: "priority", name: "Prioridad" },
  { uid: "status", name: "Estado" },
  { uid: "startTime", name: "Fecha de Inicio" },
  { uid: "endTime", name: "Fecha de Finalización" },
  { uid: "actions", name: "Acciones" },
];

type Task = {
  id: number;
  title: string;
  priority: string;
  status: string;
  startTime: string;
  endTime: string;
  avatar: string;
  email: string;
};

export default function ListTask() {
  const { tasks, loading, error } = useTasks(); 

  const renderCell = React.useCallback((task: Task, columnKey: React.Key) => {
    const cellValue = task[columnKey as keyof Task];

    switch (columnKey) {
      case "title":
        return cellValue;
      case "priority":
        return (
          <Chip color={statusColorMap[cellValue.toLowerCase()]} size="sm">
            {cellValue}
          </Chip>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[task.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "startTime":
      case "endTime":
        return cellValue; // Muestra las fechas formateadas
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Detalles">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Editar tarea">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar tarea">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <Table aria-label="Tabla de tareas">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={tasks}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
