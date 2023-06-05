import { Route, Redirect } from "react-router-dom";
// Responsible for making a route private
const PrivateRoute = (props) => {
  return (
    <Route path={props.path}>
      {props.authorized ? props.children : <Redirect to="/login" />}
    </Route>
  );
};

export default PrivateRoute;
