import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { updateLayout } from "../../Store/App";
import { useDispatch } from "react-redux";

export default function NotFound() {
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
      <p>Page Not Found</p>
      <Button onClick={back}>Back to home</Button>
    </div>
  );
}
