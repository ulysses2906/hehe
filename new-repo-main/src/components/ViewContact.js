import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Background from "../components/images/back.jpg";
import { useEffect, useState } from "react";
import Axios from "axios";

const ViewContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${Background}) no-repeat center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: relative;
`;

const ViewContent = styled.div`
  width: 30%;
  height: fit-content;
  padding: 20px 0px;
  background: rgba(0, 0, 0, 0.522);
  display: block;
  z-index: 2;
  border-radius: 10px;

  label {
    color: white;
  }

  h3 {
    color: white;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  a {
    color: white;
    text-decoration: none;
  }

  .center {
    width: fit-content;
    margin: auto;
  }

  .ContentControl {
    width: fit-content;
    height: fit-content;
    display: flex;
  }

  .OptionControl {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: auto;
  }

  .LinkControl {
    border: 1px solid red;
    text-align: center;
    margin: 20px;
    width: 15%;
    padding: 5px 0px;
    border-radius: 5px;
    background: red;
  }
`;

export function View(props) {
  const [viewDelete, setViewDelete] = useState([]);

  useEffect(() => {
    Axios.get(
      "http://localhost:3001/viewContact/" + props.match.params.id
    ).then((response) => {
      setViewDelete(response.data);
    });
  });

  return (
    <ViewContainer>
      <ViewContent>
        <h3>Are you sure you want to delete this data?</h3>

        {viewDelete.map((vals, key) => {
          return (
            <div className="center">
              <div className="ContentControl">
                <label>ID:&nbsp;&nbsp;{vals.id}</label>
              </div>

              <div className="ContentControl">
                <label>Full Name:&nbsp;&nbsp;{vals.fullName}</label>
              </div>

              <div className="ContentControl">
                <label>Email:&nbsp;&nbsp;{vals.email}</label>
              </div>

              <div className="ContentControl">
                <label>Contact:&nbsp;&nbsp;{vals.contactNumber}</label>
              </div>

              <div className="ContentControl">
                <label>Location:&nbsp;&nbsp;{vals.location}</label>
              </div>

              <div className="ContentControl">
                <label>Registered Date:&nbsp;&nbsp;{vals.registeredDate}</label>
              </div>
            </div>
          );
        })}

        <div className="OptionControl">
          <div className="LinkControl">
            <Link to="/">Back</Link>
          </div>
        </div>
      </ViewContent>
    </ViewContainer>
  );
}
