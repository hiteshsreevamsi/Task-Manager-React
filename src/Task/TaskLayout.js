import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";

export default class TaskStructure extends React.Component {
  render() {
    return (
      <div>
        <Card style={{ marginBottom: 10 }}>
          <CardHeader
            avatar={
              <Avatar aria-label='recipe' style={{ backgroundColor: red[500] }}>
                {this.props.Assigned_to[0]}
              </Avatar>
            }
            title={this.props.Task_title}
            subheader={this.props.last_edited}
          />
        </Card>
      </div>
    );
  }
}
