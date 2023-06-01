import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
// Responsible for making a route private
const PrivateRoute = props => {

    const {userInfo} = useSelector(state => state.userAuth);

    return <Route path={props.path}>
        {userInfo ? props.children: <Redirect to="/login" />}
    </Route>
}

export default PrivateRoute;