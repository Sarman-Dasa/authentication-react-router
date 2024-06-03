import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateLayout } from "../../Store/App";

export default function NoAccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const back = () => {
    dispatch(updateLayout(false));
    navigate("/");
  };
  useEffect(() => {
    dispatch(updateLayout(true)); // set isFullLayout as true
  }, []);
  return (
    <div className="text-center">
      <p>You have no permiation to access</p>
      <Button onClick={back}>Back to home</Button>
    </div>
  );
}
