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
  Checkbox
} from "@nextui-org/react";
import { DeleteIcon } from "../assets/DeleteIcon";
import useTasks from "../hooks/useTasks";
import Loader from "../common/Loader";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const columns = [
  { uid: "name", name: "Título" },
  { uid: "priority", name: "Prioridad" },
  { uid: "status", name: "Estado" },
  { uid: "startTime", name: "Fecha de Inicio" },
  { uid: "endTime", name: "Fecha de Finalización" },
  { uid: "actions", name: "Acciones" },
];

type Task = {
  id: number;
  userId: number;
  name: string;
  priority: string;
  status: string;
  startTime?: string;
  endTime?: string;
};

export default function ListTask() {
  const { tasks, loading, error, updateTaskStatus, deleteTask } = useTasks();

  const handleCheckboxChange = (taskId: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "paused" : "active";
    updateTaskStatus(taskId, newStatus);
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  const renderCell = React.useCallback((task: Task, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return task.name;
      case "priority":
        return (
          <Chip color={statusColorMap[task.priority.toLowerCase()]} size="sm">
            {task.priority}
          </Chip>
        );
      case "status":
        return (
          <Checkbox
            isSelected={task.status === "active"}
            onChange={() => handleCheckboxChange(task.id, task.status)}
            color="primary"
            css={{
              '& .nextui-checkbox': {
                backgroundColor: task.status === "active" ? "blue" : "transparent",
              },
            }}
          />
        );
      case "startTime":
        return task.startTime;
      case "endTime":
        return task.endTime;
      case "actions":
        return (
          <div className="relative flex items-center gap-2 justify-center">
            <Tooltip color="danger" content="Eliminar tarea">
              <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleDeleteTask(task.id)}>
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return null;
    }
  }, [tasks]);

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
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
