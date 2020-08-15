import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import { red } from "@material-ui/core/colors";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Typography } from "@material-ui/core";

export default class TaskStructure extends React.Component {
  nameselect = (event) => {
    debugger;
    this.props.Assigned_to = event.target.value;
  };
  render() {
    return (
      <div>
        <Card
          variant='outlined'
          style={{ marginBottom: 10, height: 300, width: 300 }}
        >
          <CardHeader
            avatar={
              <Avatar aria-label='recipe' style={{ backgroundColor: red[500] }}>
                {this.props.Assigned_to[0]}
              </Avatar>
            }
            title={
              <Typography variant='h5'>{this.props.Task_title}</Typography>
            }
            subheader={this.props.last_edited}
          />
          <CardContent>
            <FormControl>
              <InputLabel id='demo-simple-select-label'>Assigned to</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={this.props.Assigned_to}
                onChange={this.nameselect}
              >
                {this.props.names.map((name) => {
                  return <MenuItem value={name}>{name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </CardContent>
          <CardContent>
            <Typography variant='h6'>Description</Typography>
          </CardContent>

          <CardContent style={{ maxHeight: 50, overflow: "auto" }}>
            <Typography>{this.props.Task_Description}</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}
