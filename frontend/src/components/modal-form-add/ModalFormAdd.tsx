import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem } from "@nextui-org/react";
import { priorities } from "./data"; 
import DatePickerApp from "../DatePickerApp"; 
import { useState, useEffect } from "react";
import { DateValue } from "@react-types/calendar";

export default function ModalFormAdd() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [startTime, setStartTime] = useState<DateValue | null>(null);
  const [endTime, setEndTime] = useState<DateValue | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('token'); 
        
        if (!token) throw new Error('No token found');

        const response = await fetch('http://localhost:3000/auth/currentUser', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 401) {
            console.error("No autorizado. Por favor, inicie sesión nuevamente.");
            return; // Salir si no estás autorizado
          }
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserId(data.id); 
      } catch (error) {
        console.error("Error al obtener el ID del usuario:", error);
      }
    };

    fetchUserId();
  }, []);

  const handleAddTask = async () => {
    if (!title || !priority || !startTime || !endTime || userId === null) {
      console.error("Todos los campos son requeridos.");
      return;
    }

    const taskData = {
      title,
      priority,
      start_time: startTime.toDate().toISOString(),
      end_time: endTime.toDate().toISOString(),
      userId,
    };

    try {
      const response = await fetch('http://localhost:3000/task/createTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        console.log("Tarea agregada correctamente");
        onOpenChange();
      } else {
        const errorData = await response.json();
        console.error("Error al agregar la tarea:", errorData);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <>
      <Button color="success" onPress={onOpen}>Agregar tarea</Button>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agrega una tarea</ModalHeader>
              <ModalBody className="overflow-visible">
                <Input
                  type="text"
                  label="Título de la tarea"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Select
                  items={priorities}
                  label="Prioridad de la tarea"
                  placeholder="Selecciona una prioridad"
                  selectedKeys={priority ? [priority] : []}
                  onSelectionChange={(keys) => setPriority(Array.from(keys)[0] as string)}
                >
                  {(priority) => <SelectItem key={priority.value}>{priority.label}</SelectItem>}
                </Select>
                <DatePickerApp label="Inicio de la tarea" value={startTime} onChange={setStartTime} />
                <DatePickerApp label="Fin de la tarea" value={endTime} onChange={setEndTime} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>Cancelar</Button>
                <Button color="success" onPress={handleAddTask}>Agregar</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
