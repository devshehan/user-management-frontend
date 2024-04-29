import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    userName: "",
    email: "",
    mobileNumber: "",
  });

  const { name, userName, email, mobileNumber } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {...user};
    delete updatedUser.id;
    await axios.put(`http://localhost:8080/user/${id}`, updatedUser);
    navigate("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div
            className="card"
            style={{ background: "rgba(255, 255, 255, 0.5)" }}
          >
            <div
              className="card-header bg-primary text-white text-center"
              style={{
                background: "linear-gradient(to right, #3498db , #2ecc71)",
              }}
            >
              <h2>Edit User</h2>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <label htmlFor="Name" className="form-label">
                    Name
                  </label>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your name"
                    name="name"
                    value={name}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Username" className="form-label">
                    Username
                  </label>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your username"
                    name="userName"
                    value={userName}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Email" className="form-label">
                    E-mail
                  </label>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your e-mail address"
                    name="email"
                    value={email}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="MobileNumber" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your mobile number"
                    name="mobileNumber"
                    value={mobileNumber}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
                <Link className="btn btn-danger w-100 mt-2" to="/">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
