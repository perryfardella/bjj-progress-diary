import { LocalizationProvider, StaticDatePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import type { NextPage } from "next";
import React from "react";
import RecordList from "../components/recordList";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import isWeekend from "date-fns/isWeekend";
import Dialog from "@mui/material/Dialog";
import Create from "../components/create";
import Edit from "../components/edit";

const Home: NextPage = () => {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const [createDialogIsOpen, setcreateDialogIsOpen] =
    React.useState<boolean>(false);
  const [editDialogIsOpen, seteditDialogIsOpen] =
    React.useState<boolean>(false);

  return (
    <div>
      {/* Need to pass a function here as props that will allow us to retrieve the id of the entry to be edited */}
      <RecordList />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker<Date>
          // orientation="landscape"
          openTo="day"
          value={value}
          // shouldDisableDate={isWeekend}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Dialog
        onClose={() => setcreateDialogIsOpen(false)}
        open={createDialogIsOpen}
      >
        {/* On submission need to close the dialog, can pass setDialogIsOpen(false) down as a function prop that's called on submission */}
        <Create />
      </Dialog>

      <Dialog
        onClose={() => setcreateDialogIsOpen(false)}
        open={createDialogIsOpen}
      >
        {/* On submission need to close the dialog, can pass setDialogIsOpen(false) down as a function prop that's called on submission */}
        <Edit entryId="6239d0b08548d149188270ef" />
      </Dialog>

      <button onClick={() => setcreateDialogIsOpen(true)}>
        create new record
      </button>

      <button onClick={() => setcreateDialogIsOpen(true)}>
        sample edit record
      </button>
    </div>
  );
};

export default Home;
