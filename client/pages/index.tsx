import { LocalizationProvider, StaticDatePicker } from "@mui/lab";
import { Button, TextField } from "@mui/material";
import type { NextPage } from "next";
import React from "react";
import EntryList from "../components/entryList";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Dialog from "@mui/material/Dialog";
import CreateEntry from "../components/createEntry";

const Home: NextPage = () => {
  // Hook to keep track of the create dialog status
  const [createDialogIsOpen, setCreateDialogIsOpen] =
    React.useState<boolean>(false);

  // Hook to keep track of the currently selected date
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker<Date>
          // orientation="landscape"
          openTo="day"
          value={selectedDate}
          // shouldDisableDate={isWeekend}
          onChange={(selectedDate) => {
            setSelectedDate(selectedDate);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <EntryList selectedDate={selectedDate} />

      <Dialog
        onClose={() => setCreateDialogIsOpen(false)}
        open={createDialogIsOpen}
      >
        {/* On submission need to close the dialog, can pass setDialogIsOpen(false) down as a function prop that's called on submission */}
        <CreateEntry selectedDate={selectedDate} />
      </Dialog>

      <Button variant="outlined" onClick={() => setCreateDialogIsOpen(true)}>
        create new record
      </Button>
    </div>
  );
};

export default Home;
