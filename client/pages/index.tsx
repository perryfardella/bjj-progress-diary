import { LocalizationProvider, StaticDatePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import type { NextPage } from "next";
import React from "react";
import RecordList from "../components/recordList";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import isWeekend from "date-fns/isWeekend";
import Dialog from "@mui/material/Dialog";
import Create from "../components/create";

const Home: NextPage = () => {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const [createDialogIsOpen, setcreateDialogIsOpen] =
    React.useState<boolean>(false);
  const [editDialogIsOpen, seteditDialogIsOpen] =
    React.useState<boolean>(false);

  return (
    <div>
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

      <button onClick={() => setcreateDialogIsOpen(true)}>
        create new record
      </button>
    </div>
  );
};

export default Home;
