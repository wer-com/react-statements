import React, { useEffect, useState } from "react";
import axios from "axios";
import Statement from "../components/statement/Statement";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";
import { getUserData } from "../actions/dataActions";
import { useDispatch, useSelector } from "react-redux";

const User = (props) => {
  const data = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);

  const [statementParam, setStatementParam] = useState(null);

  useEffect(() => {
    const handle = props.match.params.handle;
    const statementId = props.match.params.statementId;
    if (statementId) setStatementParam(statementId);
    dispatch(getUserData(handle));
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  const { statements, loading } = data;

  const statementMarkUp = loading ? (
    <p>Loading...</p>
  ) : statements === null ? (
    <p>user has no statements</p>
  ) : !statementParam ? (
    statements.map((statement) => (
      <Statement key={statement.statementId} statement={statement} />
    ))
  ) : (
    statements.map((statement) => {
      if (statement.statementId !== statementParam) {
        return <Statement key={statement.statementId} statement={statement} />;
      } else
        return (
          <Statement
            key={statement.statementId}
            statement={statement}
            openDialog
          />
        );
    })
  );
  return (
    <Grid container style={{ marginTop: 30 }} spacing={2}>
      <Grid item sm={8} xs={12}>
        {statementMarkUp}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <p>Loading</p>
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
};
export default User;
