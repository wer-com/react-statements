import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Statement from "../components/statement/Statement";
import Profile from "../components/profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { getStatements } from "../actions/dataActions";

const Home = () => {
  const dispatch = useDispatch();
  const statement = useSelector((state) => state.data);
  const { loading, statements } = statement;
  useEffect(() => {
    dispatch(getStatements());
    // eslint-disable-next-line
  }, []);
  let recentStatementsMarkup = !loading ? (
    statements.map((statement) => (
      <Statement key={statement.statementId} statement={statement} />
    ))
  ) : (
    <p>Loading ... </p>
  );
  return (
    <Grid container spacing={2}>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
      <Grid item sm={8} xs={12}>
        {recentStatementsMarkup}
      </Grid>
    </Grid>
  );
};
export default Home;
