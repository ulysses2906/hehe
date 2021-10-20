import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Background from "../components/images/back.jpg";
import Axios from "axios";
import _ from "lodash";

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
`;

// form design codes
const FormContainer = styled.div`
  width: 30%;
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
  margin: auto;

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
`;

const TableContainer = styled.div`
  width: 60%;
  height: fit-content;
  z-index: 5;
  margin: auto;
  border: 1px solid;
  margin-top: 145px;
  background: white;

  th {
    color: white;
    background: dodgerblue;
    padding: 5px;
  }

  td {
    text-align: center;
    padding: 5px 3px;
    color: black;
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

  td {
    border: 1px solid gray;
  }

  a {
    text-decoration: none;
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

const NumericOnly =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full Name field cannot be blank")
    .matches(/^[aA-zZ\s]+$/, "Full Name field accept characters values only")
    .max(30),
  email: Yup.string()
    .email("Email Address field should have email domain")
    .required("Email Address field cannot be blank")
    .max(45, "Email Address field accept up to 45 in size only"),
  contactNumber: Yup.string()
    .required("Contact Number field cannot be blank")
    .matches(NumericOnly, "Contact Number field accept numeric values only")
    .max(11, "Contact Number field accept up to 11 in size only"),
  location: Yup.string().required("Location field cannot be blank"),
  registeredDate: Yup.date().default(function () {
    return new Date();
  }),
});

export function AddContact(props) {
  const pageSize = 5;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState(0);
  const [location, setLocation] = useState("");
  const [registeredDate, setRegisteredDate] = useState("");

  const [contactList, setContactList] = useState([]);
  const [paginatedList, setPaginatedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const AddContact = () => {
    Axios.post("http://localhost:3001/create", {
      fullName: fullName,
      email: email,
      contactNumber: contactNumber,
      location: location,
      registeredDate: registeredDate,
    }).then(() => {
      setContactList([
        ...contactList,
        {
          fullName: fullName,
          email: email,
          contactNumber: contactNumber,
          location: location,
          registeredDate: registeredDate,
        },
      ]);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/contacts").then((response) => {
      setContactList(response.data);
      setPaginatedList(_(response.data).slice(0).take(pageSize).value());
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {};

  const pageCount = contactList ? Math.ceil(contactList.length / pageSize) : 0;

  // if(pageCount === 0) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedList = _(contactList)
      .slice(startIndex)
      .take(pageSize)
      .value();
    setPaginatedList(paginatedList);
  };

  return (
    <Container>
      <FormContainer>
        {/* header title */}
        <h3>Add Contact</h3>

        <form onSubmit={handleSubmit(submitForm)}>
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

          <div className="AddButton">
            <input className="button" onClick={AddContact} type="submit" />
          </div>
        </form>
      </FormContainer>

      {/* table list */}
      <TableContainer>
        <table>
          <thead>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Location</th>
            <th>Registered Date</th>
            <th colSpan="3">Action</th>
          </thead>
          <tbody>
            {paginatedList.map((val, key) => {
              return (
                <tr key={val.id}>
                  <td>{val.id}</td>
                  <td>{val.fullName}</td>
                  <td>{val.email}</td>
                  <td>{val.contactNumber}</td>
                  <td>{val.location}</td>
                  <td>{val.registeredDate}</td>
                  <td>
                    <Link className="blue" to={"/View/" + val.id}>
                      View
                    </Link>
                  </td>
                  <td>
                    <Link className="green" to={"/Update/" + val.id}>
                      Update
                    </Link>
                  </td>
                  <td>
                    <Link className="red" to={"/Delete/" + val.id}>
                      Delete
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <nav>
          <ul className="">
            {pages.map((page) => (
              <li
                className={page === currentPage ? "active-page" : "page-items"}
                onClick={() => pagination(page)}
              >
                {page}
              </li>
            ))}
          </ul>
        </nav>
      </TableContainer>
    </Container>
  );
}
