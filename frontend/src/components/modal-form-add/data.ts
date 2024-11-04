// Definición de la interfaz para los animales
interface Priority {
    key: string;
    label: string;
  }

  export const priorities: Priority[] = [
    { key: "LOW", label: "Baja" },
    { key: "MEDIUM", label: "Media" },
    { key: "HIGH", label: "Alta" },
    { key: "URGENT", label: "Urgente" },
  ];