"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

function DatePicker() {
  const [date, setDate] = useState();

  function getMonthYear() {
    const today = new Date();
    const month = today.toLocaleString("default", { month: "long" });
    const year = today.getFullYear();

    return `${month} ${year}`;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left bg-white py-6 px-4 font-bold text-xl ",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span className="flex justify-between w-full ">
              {getMonthYear()} <ChevronRight />
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
