import React, { useState } from "react";
import Input from "../../elements/Input"; 
import Checkbox from "../../elements/Checkbox";
import Button from "../../elements/Button";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    status: "ACTIVE",
    role: "USER",
    accountBlocked: false,
  });

  const navigate = useNavigate()

  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value, 
    }));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();


    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      status: "ACTIVE",
      role: "USER",
      accountBlocked: false,
    });

        try {
            const createdUser = await UserService.createUser(formData);
            navigate(`/`)
        } catch (error) {
            console.error('Error creating user:', error);
        }
    

  };

  return (
    <div className="main-wrapper sign-up-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            id="firstName"
            label="First Name"
            name="firstName"
            className="input-text"
            value={formData.firstName}
            onChangeText={handleInputChange}
          />
          <Input
            id="lastName"
            label="Last Name"
            name="lastName"
            className="input-text"
            value={formData.lastName}
            onChangeText={handleInputChange}
          />
          <Input
            id="email"
            label="Email"
            name="email"
            className="input-text"
            value={formData.email}
            onChangeText={handleInputChange}
          />
          <Input
            id="password"
            label="Password"
            name="password"
            className="input-text"
            value={formData.password}
            onChangeText={handleInputChange}
          />
          <Input
            id="status"
            label="Status"
            name="status"
            className="input-text"
            value={formData.status}
            onChangeText={handleInputChange}
          />
          <Input
            id="role"
            label="Role"
            name="role"
            className="input-text"
            value={formData.role}
            onChangeText={handleInputChange}
          />
          <Checkbox
            id="accountBlocked"
            name="accountBlocked"
            label="Account Blocked"
            className="input-check"
            value={formData.accountBlocked}
            onChangeCheck={handleInputChange}
          />
        </div>
        <button type="submit" className="login-button" > Sign Up </button>
      </form>
    </div>
  );
};

export default SignUp;
