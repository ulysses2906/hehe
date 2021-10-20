import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Background from "../components/images/back.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// add contact container
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${Background}) no-repeat center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: relative;

  .separator {
    width: 50%;
    display: flex;
  }
`;

// form design codes
const FormContainer = styled.div`
  width: 60%;
  height: fit-content;
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid dodgerblue;
  z-index: 5;
  background: rgba(0, 0, 0, 0.61);
  box-shadow: 0 0 5px dodgerblue;

  h3 {
    color: white;
  }

  .InputControl {
    width: 100%;
    margin: auto;
    display: block;
    margin-bottom: 10px;
  }

  label {
    color: white;
  }

  .InputControl input {
    width: 100%;
    margin-top: 3px;
    padding: 3px 0px;
  }

  .InputControl select {
    width: 100%;
    padding: 3px 0px;
  }

  .InputControl p {
    color: yellow;
    text-align: center;
    margin-top: 5px;
    font-size: 12px;
  }

  .button {
    padding: 3px 10px;
  }

  .AddButton {
    width: fit-content;
    margin: auto;
  }

  .control {
    width: fit-content;
    margin: auto;
  }

  .control button {
    padding: 4px 4px;
    border-radius: 5px;
    background: blue;
    color: white;
  }

  a {
    padding: 5px 10px;
    margin-top: 20px;
    color: white;
    background: red;
    border-radius: 5px;
    text-decoration: none;
  }
`;

const TableContainer = styled.div`
  width: 60%;
  height: fit-content;
  z-index: 5;
  margin: auto;
  border: 1px solid;
  margin-top: 145px;

  th {
    color: white;
    background: dodgerblue;
    padding: 5px;
  }

  td {
    text-align: center;
    padding: 5px 3px;
    color: white;
  }

  td .blue {
    padding: 5px 5px;
    border: none;
    color: white;
    background: blue;
    cursor: pointer;
  }

  td .green {
    padding: 5px 5px;
    border: none;
    color: white;
    background: green;
    margin: 0px 8px;
    cursor: pointer;
  }

  td .red {
    padding: 5px 5px;
    border: none;
    color: white;
    background: red;
    cursor: pointer;
  }

  nav {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  nav ul {
    display: flex;
    list-style: none;
    color: white;
  }

  nav ul li {
    padding: 2px 5px;
    color: black;
    background: white;
    border: 1px solid dodgerblue;
    cursor: pointer;
  }
  nav ul li.active-page {
    background: dodgerblue;
    color: white;
  }

  table {
    width: 100%;
  }
`;

const DataToUpdate = styled.div`
  width: 40%;
  height: fit-content;
  padding: 20px 0px;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.61);
  box-shadow: 0 0 5px dodgerblue;

  h3 {
    text-align: center;
    color: white;
    margin-bottom: 10px;
  }

  .align {
    display: block;
    width: fit-content;
    margin: auto;
    margin-left: 20px;
    color: white;
  }
`;

const schema = Yup.object().shape({
  fullName: Yup.string("please input a valid name").required(
    "First Name is required"
  ),
  email: Yup.string()
    .email("please input a valid email")
    .required("Email is required"),
  contactNumber: Yup.number()
    .positive()
    .integer()
    .required("Contact number is required"),
  location: Yup.string().required("Location is required"),
  registeredDate: Yup.date().default(function () {
    return new Date();
  }),
});

export function Update(props) {
  const [viewUpdateContact, setViewUpdateContact] = useState([]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState(0);
  const [location, setLocation] = useState("");
  const [registeredDate, setRegisteredDate] = useState("");

  useEffect(() => {
    Axios.get(
      "http://localhost:3001/viewContact/" + props.match.params.id
    ).then((response) => {
      setViewUpdateContact(response.data);
    });
  });

  const updateContact = (id) => {
    Axios.put("http://localhost:3001/updateContact", {
      id: id,
      fullName: fullName,
      email: email,
      contactNumber: contactNumber,
      location: location,
      registeredDate: registeredDate,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {};

  return (
    <Container>
      <div className="separator">
        <FormContainer>
          <h3>Update Contact</h3>

          <form onSubmit={handleSubmit(submitForm)}>
            {viewUpdateContact.map((vals, key) => {
              return (
                <div>
                  <div className="InputControl">
                    <label>Full Name:</label>
                    <input
                      name="fullName"
                      placeholder="Last Name, First Name, Middle Initial"
                      {...register("fullName")}
                      onChange={(event) => {
                        setFullName(event.target.value);
                      }}
                    />
                    <p>{errors.fullName?.message}</p>
                  </div>

                  <div className="InputControl">
                    <label>Email:</label>
                    <input
                      name="email"
                      placeholder="Email"
                      {...register("email")}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                    <p>{errors.email?.message}</p>
                  </div>

                  <div className="InputControl">
                    <label>Contact Number:</label>
                    <input
                      type="text"
                      name="contactNumber"
                      placeholder="09232321321"
                      {...register("contactNumber")}
                      onChange={(event) => {
                        setContactNumber(event.target.value);
                      }}
                    />
                    <p>{errors.contactNumber?.message}</p>
                  </div>

                  <div className="InputControl">
                    <label>Location:</label>
                    <select
                      name="location"
                      {...register("location")}
                      onChange={(event) => {
                        setLocation(event.target.value);
                      }}
                    >
                      <option value="" disabled selected hidden>
                        Select Location
                      </option>
                      <option>Manila</option>
                      <option>Cebu</option>
                    </select>
                    <p>{errors.location?.message}</p>
                  </div>

                  <div className="InputControl">
                    <label>Full Name:</label>
                    <input
                      type="date"
                      name="registeredDate"
                      {...register("registeredDate")}
                      onChange={(event) => {
                        setRegisteredDate(event.target.value);
                      }}
                    />
                    <p>{errors.registeredDate?.message}</p>
                  </div>
                  <div className="control">
                    <button
                      onClick={() => {
                        updateContact(vals.id);
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              );
            })}
          </form>

          <Link to="/">Back</Link>
        </FormContainer>

        <DataToUpdate>
          <h3>Data to update</h3>

          {viewUpdateContact.map((vals, key) => {
            return (
              <div class="align">
                <label>Full Name: {vals.fullName}</label>
                <br />
                <label>Email: {vals.email}</label>
                <br />
                <label>Contact Number{vals.contactNumber}</label>
                <br />
                <label>Location: {vals.location}</label>
                <br />
                <label>Registered Date: {vals.registeredDate}</label>
              </div>
            );
          })}
        </DataToUpdate>
      </div>
    </Container>
  );
}
