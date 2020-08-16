import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@material-ui/core";
export default class NewTaskStructure extends React.Component {
  constructor() {
    super();
    this.state = {
      Task_name: "",
      Assigned_to: "Unassigned",
      Task_Description: "",
      Task_Status: "To be done",
      created: new Date().toDateString(),
      task_id: uuidv4(),
      is1: false,
      is2: false,
    };
  }
  save = (e) => {
    if (this.state.Task_name == "" || this.state.Task_Description == "") {
      if (this.state.Task_name.trim() == "") {
        this.setState({ is1: true });
      }
      if (this.state.Task_Description.trim() == "") {
        this.setState({ is2: true });
      }
    } else {
      this.props.addnew(this.state);
    }
  };

  dataselected = (event) => {
    let name = event.target.name;
    if (name == "Task_name") {
      this.setState({ is1: false });
    }
    if (name == "Task_Description") {
      this.setState({ is2: false });
    }
    let changed = event.target.value;
    this.setState({ [name]: changed });
  };
  dateselected = (event, x) => {
    this.setState({ created: new Date(x).toDateString() });
  };

  open_popup = () => {
    this.setState({ open: true });
  };
  close_popup = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div>
        <form>
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth='xs'
            aria-labelledby='confirmation-dialog-title'
            open={this.props.open}
          >
            <DialogTitle id='confirmation-dialog-title'>Add Task</DialogTitle>
            <DialogContent dividers>
              <span>
                <Typography> Name</Typography>
                <TextField
                  autoFocus
                  error={this.state.is1}
                  margin='dense'
                  id='name'
                  label='Task Title'
                  type='text'
                  fullWidth
                  ref={this.titleRef}
                  required={true}
                  name='Task_name'
                  onChange={this.dataselected}
                />
              </span>
              <span>
                <Typography>Description</Typography>
                <TextField
                  autoFocus
                  error={this.state.is2}
                  margin='dense'
                  id='name'
                  label='Desc'
                  type='text'
                  fullWidth
                  required={true}
                  name='Task_Description'
                  onChange={this.dataselected}
                />
              </span>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify='space-around'>
                  <KeyboardDatePicker
                    disableToolbar
                    variant='inline'
                    format='MM/dd/yyyy'
                    margin='normal'
                    id='date-picker-inline'
                    label='Due Date'
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    value={this.state.created}
                    name='created'
                    onChange={this.dateselected}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <FormControl>
                <InputLabel id='demo-simple-select-label-3'>
                  Assigned to
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label-3'
                  id='demo-simple-select-3'
                  value={this.state.Assigned_to}
                  name='Assigned_to'
                  onChange={this.dataselected}
                >
                  {this.props.names.map((name) => {
                    return <MenuItem value={name}>{name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <FormControl style={{ float: "right" }}>
                <InputLabel id='demo-simple-select-label'>Status</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={this.props.Task_Status}
                  onChange={this.dataselected}
                  disabled
                >
                  {this.props.status.map((name) => {
                    return <MenuItem value={name}>{name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.pop_close} color='primary'>
                Cancel
              </Button>
              <Button
                color='primary'
                onClick={(e) => {
                  this.save(e);
                }}
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </div>
    );
  }
}
