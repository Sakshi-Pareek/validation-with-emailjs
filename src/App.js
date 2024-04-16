import './App.css';
import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser'
import open from "../src/assets/images/openeye.png"
import close from "../src/assets/images/closeeye.png"

function App() {
  // -----------emailjs------
  const form = useRef();
  // -------eye-icon-
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordcon, setShowPasswordcon] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordconVisibility = () => {
    setShowPasswordcon(!showPasswordcon);
  };
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    message: "",
    number: "",
    password: "",
    confirmPassword: ""
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    lastname: "",
    email: "",
    message: "",
    number: "",
    password: "",
    confirmPassword: ""
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  if (showSuccessPopup === true) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = {
      name: /^[a-zA-Z\s]+$/,
      lastname: /^[a-zA-Z\s]+$/,
      email: /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
      message: /^[a-zA-Z\s]+$/,
      number: /^\d{10}$/,
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])[a-zA-Z\d@]{8,}$/,
      confirmPassword:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])[a-zA-Z\d@]{8,}$/,
    };
    const errors = {};
    if (!regex.name.test(formData.name)) {
      errors.name = "name is invalid.";
    }
    if (!regex.lastname.test(formData.lastname)) {
      errors.lastname = "lastname is invalid.";
    }
    if (!regex.message.test(formData.message)) {
      errors.message = "message is invalid.";
    }
    if (!regex.email.test(formData.email)) {
      errors.email = "Email is invalid.";
    }
    if (!regex.number.test(formData.number)) {
      errors.number = "Number is invalid.";
    }
    if (!regex.password.test(formData.password)) {
      errors.password = "Password is invalid.";
    }
    if (!regex.confirmPassword.test(formData.confirmPassword)) {
      errors.confirmPassword = "Confirm password is invalid.";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      emailjs
        .sendForm('service_vdrz1vb', 'template_pjuqntb', form.current, {
          publicKey: 'LxkSzNiPE_r3ZsKnt',
        })
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
      setShowSuccessPopup(true);
    }
  };
  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    setFormData({
      name: "",
      lastname: "",
      email: "",
      message: "",
      number: "",
      password: "",
      confirmPassword: ""
    });
    setFormErrors({
      name: "",
      lastname: "",
      email: "",
      message: "",
      number: "",
      password: "",
      confirmPassword: ""
    });
  };
  return (
    <div className="!bg-[#e0e09c] min-h-screen">
      <div className="max-w-[800px] mx-auto">
        <h1 className='text-black font-bold text-center text-5xl py-5'>Form Validation</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2' ref={form}>
          <div className="md:flex items-center justify-between gap-10">
            <div className="w-full">
              <label
                className="font-normal text-[#131200] text-[16px] opacity-[70%]"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="outline-none border-solid border-[1px] border-[#13120033] p-[11px] w-full rounded-[5px]"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {formErrors.name && (
                <p className="error-message">{formErrors.name}</p>
              )}
            </div>
            <div className="w-full">
              <label
                className="font-normal text-[#131200] text-[16px] opacity-[70%]"
                htmlFor="lastname"
              >
                Lastname
              </label>
              <input
                className="outline-none border-solid border-[1px] border-[#13120033] p-[11px] w-full rounded-[5px]"
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
              {formErrors.lastname && (
                <p className="error-message">{formErrors.lastname}</p>
              )}
            </div>
          </div>
          <div>
            <label
              className="font-normal text-[#131200] text-[16px] opacity-[70%]"
              htmlFor="number"
            >
              Number
            </label>
            <input
              className="outline-none border-solid border-[1px] border-[#13120033] p-[11px] w-full rounded-[5px]"
              type="number"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
            />
            {formErrors.number && (
              <p className="error-message">{formErrors.number}</p>
            )}
          </div>
          <div>
            <label
              className="font-normal text-[#131200] text-[16px] opacity-[70%]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="outline-none border-solid border-[1px] border-[#13120033] p-[11px] w-full rounded-[5px]"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <p className="error-message">{formErrors.email}</p>
            )}
          </div>
          <div className="w-full">
            <label
              className="font-normal text-[#131200] text-[16px] opacity-[70%]"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="outline-none border-solid border-[1px] border-[#13120033] w-full p-[11px] rounded-[5px] resize-none"
              type="text"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
            {formErrors.message && (
              <p className="error-message">{formErrors.message}</p>
            )}
          </div>
          <div className="md:flex items-center justify-between gap-10">
            <div className="w-full relative">
              <label
                className="font-normal text-[#131200] text-[16px] opacity-[70%]"
                htmlFor="password"
              >
                Password
              </label>
              <div className='relative'>
                <input
                  className="outline-none border-solid border-[1px] border-[#13120033] p-[11px] w-full rounded-[5px]"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => handleChange(e)}
                />
                <div onClick={togglePasswordVisibility} className="absolute end-2 top-3">
                  {showPassword ? <img src={open} width={25} height={25} /> : <img src={close} width={25} height={25} />}
                </div>
              </div>
              {formErrors.password && (
                <p className="error-message">{formErrors.password}</p>
              )}
            </div>
            <div className="w-full">
              <label
                className="font-normal text-[#131200] text-[16px] opacity-[70%]"
                htmlFor="confirmPassword"
              >
                ConfirmPassword
              </label>
              <div className='relative'>
                <input
                  className="outline-none border-solid border-[1px] border-[#13120033] p-[11px] w-full rounded-[5px]"
                  type={showPasswordcon ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange(e)}
                />
                <div onClick={togglePasswordconVisibility} className="absolute end-2 top-3">
                  {showPasswordcon ? <img src={open} width={25} height={25} /> : <img src={close} width={25} height={25} />}
                </div>
              </div>
              {formErrors.confirmPassword && (
                <p className="error-message">{formErrors.confirmPassword}</p>
              )}
            </div>
          </div>
          <div className="flex lg:justify-start justify-center items-center mt-[10px]">
            <button className="py-3.5 px-6 rounded-md bg-black text-white text-center" >Submit</button>
          </div>
        </form>
        {showSuccessPopup && (
          <div className="success-popup">
            <div className="success-popup-box">
              <p className="mb-[10px]">Your form submitted successfully!</p>
              <button onClick={handlePopupClose}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
