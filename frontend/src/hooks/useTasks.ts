import axios from "axios";
import { useEffect, useState } from "react";

const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const response = await axios.get("http://localhost:3000/task/allTask");
          const formattedTasks = response.data.map((task) => ({
              id: task.id,
              userId: task.userId,
              name: task.title,
              priority: task.priority, // Agrega la prioridad
              status: task.status ? 'active' : 'paused',
              startTime: new Date(task.start_time).toLocaleString(), // Formatea la fecha de inicio
              endTime: new Date(task.end_time).toLocaleString(), // Formatea la fecha de finalización
          }));
          setTasks(formattedTasks); // Usa formattedTasks
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
      fetchTasks();
    }, []);
    return { tasks, loading, error };
  };
  
  export default useTasks;
  