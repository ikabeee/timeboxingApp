import {DateRangePicker} from "@nextui-org/react";
import {parseZonedDateTime} from "@internationalized/date";

export default function DatePicker() {
  return (
    <div className="w-full max-w-xl flex flex-row gap-4">
      <DateRangePicker
        label="Duracion de la tarea"
        hideTimeZone
        visibleMonths={2}
        defaultValue={{
          start: parseZonedDateTime("2024-04-01T00:45[America/Los_Angeles]"),
          end: parseZonedDateTime("2024-04-08T11:15[America/Los_Angeles]"),
        }}
      />
    </div>
  );
}