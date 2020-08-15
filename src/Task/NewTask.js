import React from "react";

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
import { Typography } from "@material-ui/core";
export default class NewTaskStructure extends React.Component {
  constructor() {
    super();
  }

  open_popup = () => {
    this.setState({ open: true });
  };
  close_popup = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div>
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
                margin='dense'
                id='name'
                label='Email Address'
                type='email'
                fullWidth
              />
            </span>
            <span>
              <Typography>Description</Typography>
              <TextField
                autoFocus
                margin='dense'
                id='name'
                label='Email Address'
                type='email'
                fullWidth
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
                  label='Date picker inline'
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.props.pop_close} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.props.pop_close} color='primary'>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
