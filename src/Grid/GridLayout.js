import React from "react";
import Task from "../Task/TaskLayout";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
export default class grid extends React.Component {
  constructor() {
    super();

    this.state = {
      dataloaded: false,
      expand: false,
      tasks: [
        {
          Task_name: "first",
          Assigned_to: "unassign",
          Task_Description: "Write waat ever you want",
          Task_Status: "Incomplete",
          created: new Date().toDateString(),
        },
        {
          Task_name: "second",
          Assigned_to: "unassign",
          Task_Description:
            "Write waat ever you want,Write waat ever you want,Write waat ever you want,Write waat ever you want",
          Task_Status: "Incomplete",
          created: new Date().toDateString(),
        },
        {
          Task_name: "third",
          Assigned_to: "hitesh",
          Task_Description: "Write waat ever you want",
          Task_Status: "Incomplete",
          created: new Date().toDateString(),
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
  changeData = () => {};
  componentDidMount() {
    this.assiging();
    this.setState({ dataloaded: true });
  }
  assiging = () => {
    for (let i = 0; i < this.state.tasks.length; i++) {
      try {
        this.state.users[this.state.tasks[i].Assigned_to].push(
          this.state.tasks[i]
        );
      } catch (e) {
        this.state.users["unassigned"].push(this.state.tasks[i]);
      }
    }
  };
  expand = () => {
    this.setState({ expand: !this.state.expand });
  };
  taskdata = (data) => {
    return this.state.users[data].map((task) => {
      return (
        <tr>
          <td>
            <Task
              complete={this.state.users}
              names={Object.keys(this.state.users)}
              Task_title={task.Task_name}
              Assigned_to={task.Assigned_to}
              last_edited={task.created}
              Task_Description={task.Task_Description}
            ></Task>
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div>
        {this.state.dataloaded
          ? Object.keys(this.state.users).map((key) => {
              return (
                <Accordion expanded={this.state.expand} onChange={this.expand}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1bh-content'
                    id='panel1bh-header'
                  >
                    <Typography> {key}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>{this.taskdata(key)}</AccordionDetails>
                </Accordion>
              );
            })
          : null}
      </div>
    );
  }
}
