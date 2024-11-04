import axios from "axios";
import { useEffect, useState } from "react";

const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:3000/task/allTask");
            const formattedTasks = response.data.map((task) => ({
                id: task.id,
                userId: task.userId,
                name: task.title,
                priority: task.priority,
                status: task.status ? 'active' : 'paused',
                startTime: new Date(task.start_time).toLocaleString(),
                endTime: new Date(task.end_time).toLocaleString(),
            }));
            setTasks(formattedTasks);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.message);
            } else {
                setError("No se pudo obtener el listado de tareas");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("No se encontró el token de autorización");
            const statusValue = newStatus === "active";
            await axios.put(`http://localhost:3000/task/${taskId}`, {
                status: statusValue,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            await fetchTasks();
        } catch (error) {
            console.error("Error al actualizar el estado de la tarea:", error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("No se encontró el token de autorización");
            await axios.post(`http://localhost:3000/task/${taskId}`);
            await fetchTasks();
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
        }
    };

    return { tasks, loading, error, updateTaskStatus, deleteTask };
};

export default useTasks;
