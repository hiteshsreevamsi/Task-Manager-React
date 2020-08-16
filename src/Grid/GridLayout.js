import React from "react";
import Task from "../Task/TaskLayout";
import NewTask from "../Task/NewTask";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { v4 as uuidv4 } from "uuid";
import Grid from "@material-ui/core/Grid";
import { th } from "date-fns/locale";
export default class grid extends React.Component {
  constructor() {
    super();

    this.state = {
      dataloaded: false,
      expand: false,
      status: ["To be done", "doing", "done"],
      popup: false,
      tasks: [
        {
          Task_name: "first",
          Assigned_to: "unassigned",
          Task_Description: "Write waat ever you want",
          Task_Status: "doing",
          created: new Date().toDateString(),
          task_id: uuidv4(),
        },
        {
          Task_name: "second",
          Assigned_to: "unassigned",
          Task_Description:
            "Write waat ever you want,Write waat ever you want,Write waat ever you want,Write waat ever you want",
          Task_Status: "doing",
          created: new Date(1546885800000).toDateString(),
          task_id: uuidv4(),
        },
        {
          Task_name: "third",
          Assigned_to: "hitesh",
          Task_Description: "Write waat ever you want",
          Task_Status: "doing",
          created: new Date("08-31-2020").toDateString(),
          task_id: uuidv4(),
        },
      ],
      users: {
        hitesh: [],
        "sri sai": [],
        sanjay: [],
        unassign: [],
      },
    };
  }
  addnew = (newtask) => {
    let existing = this.state.tasks;
    existing.push(newtask);

    this.setState({ tasks: existing, popup: false });
    this.assiging();
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
    let users = {
      hitesh: [],
      "sri sai": [],
      sanjay: [],
      unassigned: [],
    };
    this.state.tasks.map((task, id) => {
      try {
        users[task.Assigned_to].push(task);
      } catch (error) {
        users["unassigned"].push(task);
      }
    });
    this.setState({ users });
  };
  expand = () => {
    this.setState({ expand: !this.state.expand });
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
        <Button onClick={this.pop}>
          <AddCircleOutlineIcon /> Add Task
        </Button>
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
          ? Object.keys(this.state.users).map((key) => {
              return (
                <Accordion expanded={this.state.expand} onChange={this.expand}>
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
                    <Typography>
                      {this.state.users[key].length} Tasks
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Grid container justify='center' spacing={2}>
                          {["To be done", "doing", "done"].map((value) => (
                            <Grid key={value} item style={{ minWidth: 300 }}>
                              <Typography justify='center'>{value}</Typography>
                              {this.taskdata(key, value)}
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              );
            })
          : null}
      </div>
    );
  }
}
