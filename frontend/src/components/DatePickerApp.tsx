import { DatePicker } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import { DateValue } from "@react-types/calendar";

interface DatePickerAppProps {
  label: string;
  onChange: (date: DateValue | null) => void; 
}

export default function DatePickerApp({ label, onChange }: DatePickerAppProps) {
  return (
    <div className="w-full max-w-xl gap-4 space-y-4">
      <DatePicker
        label={label}
        hideTimeZone
        showMonthAndYearPickers
        defaultValue={now(getLocalTimeZone())}
        onChange={onChange} 
      />
    </div>
  );
}
