import { LocalizationProvider, StaticDatePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import type { NextPage } from "next";
import React from "react";
import EntryList from "../components/entryList";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Dialog from "@mui/material/Dialog";
import Create from "../components/createEntry";
import Edit from "../components/edit";
import CreateEntry from "../components/createEntry";

const Home: NextPage = () => {
  // Hook to keep track of the create dialog status
  const [createDialogIsOpen, setCreateDialogIsOpen] =
    React.useState<boolean>(false);

  // Hook to keep track of the edit dialog status
  const [editDialogIsOpen, setEditDialogIsOpen] =
    React.useState<boolean>(false);

  // Hook to keep track of the currently selected date
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );

  return (
    <div>
      {/* Need to pass a function here as props that will allow us to retrieve the id of the entry to be edited */}
      <EntryList selectedDate={selectedDate} />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker<Date>
          // orientation="landscape"
          openTo="day"
          value={selectedDate}
          // shouldDisableDate={isWeekend}
          onChange={(newDate) => {
            setSelectedDate(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <Dialog
        onClose={() => setCreateDialogIsOpen(false)}
        open={createDialogIsOpen}
      >
        {/* On submission need to close the dialog, can pass setDialogIsOpen(false) down as a function prop that's called on submission */}
        <CreateEntry selectedDate={selectedDate} />
      </Dialog>

      <Dialog
        onClose={() => setEditDialogIsOpen(false)}
        open={editDialogIsOpen}
      >
        {/* On submission need to close the dialog, can pass setDialogIsOpen(false) down as a function prop that's called on submission */}
        <Edit entryId="6239d0b08548d149188270ef" />
      </Dialog>

      <button onClick={() => setCreateDialogIsOpen(true)}>
        create new record
      </button>

      <button onClick={() => setEditDialogIsOpen(true)}>
        sample edit record
      </button>
    </div>
  );
};

export default Home;
