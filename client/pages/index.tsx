import { LocalizationProvider, StaticDatePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import type { NextPage } from "next";
import React from "react";
import RecordList from "../components/recordList";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import isWeekend from "date-fns/isWeekend";

const Home: NextPage = () => {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <div>
      <RecordList />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker<Date>
          orientation="landscape"
          openTo="day"
          value={value}
          shouldDisableDate={isWeekend}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
};

export default Home;
