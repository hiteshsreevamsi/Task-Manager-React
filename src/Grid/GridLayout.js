import React from "react";
import Task from "../Task/TaskLayout";
import NewTask from "../Task/NewTask";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TextField from "@material-ui/core/TextField";
import { v4 as uuidv4 } from "uuid";
import Grid from "@material-ui/core/Grid";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";
import { Typography } from "@material-ui/core";

export default class grid extends React.Component {
  constructor() {
    super();

    this.state = {
      dataloaded: false,
      expand: {},
      status: ["To be done", "Doing", "Done"],
      popup: false,
      newUser: false,
      newusername: "",
      tasks: [
        {
          Task_name: "first",
          Assigned_to: "Unassigned",
          Task_Description: "Write waat ever you want",
          Task_Status: "Doing",
          created: new Date().toDateString(),
          task_id: uuidv4(),
          errortext: false,
        },
        {
          Task_name: "second",
          Assigned_to: "Winuall",
          Task_Description:
            "Write waat ever you want,Write waat ever you want,Write waat ever you want,Write waat ever you want",
          Task_Status: "Doing",
          created: new Date(1546885800000).toDateString(),
          task_id: uuidv4(),
        },
        {
          Task_name: "third",
          Assigned_to: "Hitesh",
          Task_Description: "Write waat ever you want",
          Task_Status: "Doing",
          created: new Date("08-31-2020").toDateString(),
          task_id: uuidv4(),
        },
      ],
      users: {
        Hitesh: [],
        Winuall: [],
        Sanjay: [],
        Unassigned: [],
      },
    };
  }
  addnew = (newtask) => {
    let existing = this.state.tasks;
    existing.push(newtask);

    this.setState({ tasks: existing, popup: false });
    this.assiging();
  };
  adduser = () => {
    let tempusers = this.state.users;
    if (this.state.newusername.trim() != "") {
      try {
        if (tempusers[this.state.newusername].length != 0) {
          this.usernamecancel();
          alert("user already exists");
        }
      } catch (e) {
        tempusers[this.state.newusername] = [];
      }

      this.setState({ users: tempusers });
      this.usernamecancel();
    } else {
      this.setState({ errortext: true });
    }
  };
  pop = () => {
    this.setState({ popup: true });
  };
  pop_close = () => {
    this.setState({ popup: false });
  };
  componentDidMount() {
    this.assiging();
    this.setState({ dataloaded: true });
  }
  assiging = () => {
    let user_names = Object.keys(this.state.users);
    let users = {};
    for (let i = 0; i < user_names.length; i++) {
      users[user_names[i]] = [];
    }

    this.state.tasks.map((task, id) => {
      try {
        users[task.Assigned_to].push(task);
      } catch (error) {
        users["Unassigned"].push(task);
      }
    });
    this.setState({ users });
  };
  expand = (index) => {
    if (this.state.expand[index] != null) {
      this.setState({
        expand: { ...this.state.expand, [index]: !this.state.expand[index] },
      });
    } else {
      this.setState({
        expand: { ...this.state.expand, [index]: true },
      });
    }
  };
  usernamecancel = () => {
    this.setState({ newUser: false });
  };
  updateAssignment = (id, to) => {
    let scope = this.state.tasks.filter((item) => item.task_id === id);
    let nonScope = this.state.tasks.filter((item) => item.task_id != id);
    scope[0].Assigned_to = to;
    this.setState({
      tasks: [...scope, ...nonScope],
    });
    this.assiging();
  };
  changeData = (id, to) => {
    let scope = this.state.tasks.filter((item) => item.task_id === id);
    let nonScope = this.state.tasks.filter((item) => item.task_id != id);
    scope[0].Task_Status = to;
    this.setState({
      tasks: [...scope, ...nonScope],
    });
    this.assiging();
  };
  text = () => {
    this.setState({ newUser: true });
  };
  taskdata = (data, status) => {
    return this.state.users[data].map((task) => {
      if (task.Task_Status == status) {
        return (
          <tr>
            <td>
              <Task
                task_change={this.changeData}
                status={this.state.status}
                identity={task.task_id}
                names={Object.keys(this.state.users)}
                Task_title={task.Task_name}
                Assigned_to={task.Assigned_to}
                last_edited={task.created}
                Task_Description={task.Task_Description}
                changer={this.updateAssignment}
                Task_Status={task.Task_Status}
              ></Task>
            </td>
          </tr>
        );
      }
    });
  };
  render() {
    return (
      <div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={this.text}>
            <AddCircleOutlineIcon />
            Add User
          </Button>
          <Button onClick={this.pop}>
            <AddCircleOutlineIcon /> Add Task
          </Button>
        </div>
        {this.state.newUser ? (
          <div>
            <TextField
              autoFocus
              error={this.state.errortext}
              margin='dense'
              label='Name'
              type='text'
              onChange={(event, newValue) =>
                this.setState({
                  newusername: event.target.value,
                  errortext: false,
                })
              }
            >
              {" "}
            </TextField>
            <Button onClick={this.usernamecancel}>
              <CancelIcon />
              Cancel
            </Button>
            <Button onClick={this.adduser}>
              <SaveIcon />
              save
            </Button>
          </div>
        ) : null}
        {this.state.popup ? (
          <NewTask
            pop_close={this.pop_close}
            names={Object.keys(this.state.users)}
            open={true}
            status={this.state.status}
            Task_Status={"To be done"}
            addnew={this.addnew}
          ></NewTask>
        ) : null}
        {this.state.dataloaded
          ? Object.keys(this.state.users).map((key, index) => {
              return (
                <Accordion
                  expanded={this.state.expand[index]}
                  onChange={() => this.expand(index)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1bh-content'
                    id='panel1bh-header'
                  >
                    <Typography
                      style={{
                        fontSize: 20,
                        flexBasis: "33.33%",
                        flexShrink: 0,
                      }}
                    >
                      {" "}
                      {key}
                    </Typography>
                    <Typography style={{ color: "darkgray" }}>
                      {this.state.users[key].length} Tasks
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {this.state.users[key].length > 0 ? (
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Grid container justify='center' spacing={2}>
                            {["To be done", "Doing", "Done"].map((value) => (
                              <Grid key={value} item style={{ minWidth: 300 }}>
                                <Typography justify='center'>
                                  {value}
                                </Typography>
                                {this.taskdata(key, value)}
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : (
                      "No tasks assigned"
                    )}
                  </AccordionDetails>
                </Accordion>
              );
            })
          : null}
      </div>
    );
  }
}
