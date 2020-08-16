import React from "react";
import Grid from "./Grid/GridLayout";
import { Typography } from "@material-ui/core";

function App() {
  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      <div
        className='knockout'
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingBottom: 50,
          paddingTop: 15,
        }}
      >
        <Typography variant='h2'>Task Manager</Typography>
      </div>

      <Grid></Grid>
    </div>
  );
}

export default App;
