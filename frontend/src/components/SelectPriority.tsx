import {Select, SelectItem} from "@nextui-org/react";


export default function SelectPriority() {
    const priorities = [
        {key: "URGENT", label: "Urgente"},
        {key: "HIGH", label: "Alta"},
        {key: "MEDIUM", label: "Media"},
        {key: "LOW", label: "Baja"},

      ];
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select 
        label="Selecciona una prioridad" 
        className="w-full" 
      >
        {priorities.map((priority) => (
          <SelectItem key={priority.key}>
            {priority.label}
          </SelectItem>
        ))}
      </Select>
      </div>
  );
}