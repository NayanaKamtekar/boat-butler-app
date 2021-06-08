import React, { useEffect, useState } from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export default function Filter({ filterLable, menuItems, setSelection, datakey}) {
  const classes = useStyles();
  const [input, setInput] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelection(prevstate => ({...prevstate, [datakey]: input }))
  }, [input])

  const handleChange = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id="demo-controlled-open-select-label">
        {filterLable}
      </InputLabel>
      <Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={input}
        onChange={handleChange}
        multiple
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} value={item}>
            {datakey !== "job_is_emergency" ? item: (item == 1 ? "Emergency" : "Normal")}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
