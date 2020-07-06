import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Statement from "../components/Statement";

const Home = () => {
  const [statements, setStatements] = useState([]);
  useEffect(() => {
    axios
      .get("/statements")
      .then((result) => {
        setStatements(result.data);
      })
      .catch((err) => console.log(err));
  }, []);
  let recentStatementsMarkup =
    statements.length > 0 ? (
      statements.map((statement) => (
        <Statement key={statement.statementId} statement={statement} />
      ))
    ) : (
      <p>Loading ... </p>
    );
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentStatementsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile</p>
      </Grid>
    </Grid>
  );
};
export default Home;
