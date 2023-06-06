import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../shared/components/Utilities/FormContainer";
import { Alert, Button, Form } from "react-bootstrap";
import Loader from "../../shared/components/Utilities/Loader";
import { updateUser } from "../../features/user/userUpdateSlice";

// Responsible for displaying the user profile page.
const ProfilePage = () => {
  // states for update fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // For dispatching actions
  const dispatch = useDispatch();

  // For getting the user auth state
  const { userInfo } = useSelector((state) => state.userAuth);

  // For getting the updated user state
  const { updatedUserInfo, loading, error } = useSelector(
    (state) => state.userUpdate
  );

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  // For updating the user details
  const updateUserHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      dispatch(updateUser({ name, email, password }));
    }
  };

  return (
    <FormContainer>
      {loading && <Loader />}
      {error && <Alert variant="danger">{error}</Alert>}
      <h2>Profile</h2>
      <Form onSubmit={updateUserHandler}>
        <Form.Group controlId="name" className="mt-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="mt-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="outline-mdark"
          className="border-mdark mt-3"
        >
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfilePage;
