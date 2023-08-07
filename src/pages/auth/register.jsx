import { generateJWT } from "../../lib/jwt";
import { Input, Alert, Button, IconButton } from "@material-tailwind/react";
import { Progress } from "@material-tailwind/react";
import Image from "next/image";

const generateStrongPassword = require("../../lib/genstrongpass");

import { useState } from "react";

// Icons
import { GrCircleInformation,  } from "react-icons/gr";
import { BsFillDice2Fill } from "react-icons/bs";
import { BiLogoDiscordAlt, BiLogoGithub, BiLogoGoogle } from "react-icons/bi";


/*
POST 
{
    "jwt": "jwt token",
}

decoded jwt token:
{
    "username": "username",
    "password": "password",
    "email": "email"
}
*/

function PasswordCheck({ passwordLength, passwordLowercase, passwordUppercase, passwordNumber, passwordSpecial }) {
  const check = (condition, text) => (
    <div className={`flex flex-row items-center justify-left ${ condition ? "text-green-500" : "text-red-500" }`}>
      <div className="p-1">
        <GrCircleInformation className={`${condition ? "text-green-500" : "text-red-500"}`}/>
      </div>
      <div className="p-1">
        <h1 className="text-sm">{text}</h1>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-left justify-center">
      {check(passwordLength, "At least 8 characters long.")}
      {check(passwordLowercase, "At least 1 lowercase character.")}
      {check(passwordUppercase, "At least 1 uppercase character.")}
      {check(passwordNumber, "At least 1 number.")}
      {check(passwordSpecial, "At least 1 special character.")}
    </div>
  );
}

export default function Register({ jwt_secret }) {
  async function register(username, email, password) {
    const jwt = generateJWT({ username, email, password }, jwt_secret);
    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jwt }),
    });

    const data = await res.json();
    return true;
  }

  // Input states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  // Password checkers
  const [passwordLength, setPasswordLength] = useState(false);
  const [passwordLowercase, setPasswordLowercase] = useState(false);
  const [passwordUppercase, setPasswordUppercase] = useState(false);
  const [passwordNumber, setPasswordNumber] = useState(false);
  const [passwordSpecial, setPasswordSpecial] = useState(false);
  const [registerStatus, setRegisterStatus] = useState(false);

  function checkPassword(password) {
    const passwordLength = password.length >= 8;
    const passwordLowercase = /[a-z]/.test(password);
    const passwordUppercase = /[A-Z]/.test(password);
    const passwordNumber = /[0-9]/.test(password);
    const passwordSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setPasswordLength(passwordLength);
    setPasswordLowercase(passwordLowercase);
    setPasswordUppercase(passwordUppercase);
    setPasswordNumber(passwordNumber);
    setPasswordSpecial(passwordSpecial);

    return (
      passwordLength &&
      passwordLowercase &&
      passwordUppercase &&
      passwordNumber &&
      passwordSpecial
    );
  }

  // Check email and confirm email
  function checkEmails(email, confirmEmail) {
    return email === confirmEmail;
  }

  // Check email
  function checkEmail(email) {
    return /.+@.+(?:\..+)+/.test(email);
  }

  // Imput handlers
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleConfirmEmailChange(e) {
    setConfirmEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function setAlertText(text) {
    setAlert(text);
    document.getElementById("alert").classList.remove("hidden");
    setTimeout(() => {
      document.getElementById("alert").classList.add("hidden");
    }, 5000);
  }

  // Register handler
  function handleRegister() {
    if (!checkEmails(email, confirmEmail)) {
      setAlertText("Emails do not match");
      return;
    }

    if (!checkEmail(email)) {
      setAlertText("Email is not valid");
      return;
    }

    if (!checkPassword(password)) {
      setAlertText("Password is not strong enough");
      return;
    }

    register(username, email, password).then((data) => {
      if (data.error) {
        setAlertText(data.error);
      } else {
        setRegisterStatus(true);
        setAlertText("Registered successfully");

        setTimeout(() => {
            window.location.href = "/";
        }, 5000);
      }
    });
  }

  return (
    <div className="flex flex-col items-center justify-center my-20">
      {/* Alert */}
      <div id="alert" className="flex flex-col items-center justify-center hidden">
        <Alert color="blue" className="fixed bottom-0 left-0 m-4 w-96 z-50">
          <div className="flex flex-row items-center justify-center space-x-2">
            <GrCircleInformation />
            <span className="text-lg font-bold">{alert}</span>
          </div>
        </Alert>
      </div>

      {/* Register card */}
      <div className="flex flex-col items-center justify-center rounded-lg bg-primary-700 text-primary-50 p-4 space-y-10 
      lg:w-96 
      md:w-2/3
      sm:w-11/12
      ">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center">
            <Image
                src="/assets/slf-auth.png"
                alt="slf-auth logo"
                width={128}
                height={128}
                className="rounded-full"
            />
        </div>

        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Register</h1>
          <p className="text-lg">Register to slf-auth</p>
        </div>

        <div className="flex flex-col items-left justify-center space-y-4">
          <div className="flex flex-col items-left justify-center">
            <span className="text-lg">Username</span>
            <Input
              type="text"
              placeholder="my username here"
              className="my-2 outline-none text-primary-700 rounded-lg p-2 border-2 w-11/12"
              onChange={handleUsernameChange}
            />
          </div>

          <div className="flex flex-col items-left justify-center">
            <span className="text-lg">Email</span>
            <Input
              type="text"
              placeholder="myemail@here.com"
              className="my-2 outline-none text-primary-700 rounded-lg p-2 border-2 w-11/12"
              onChange={handleEmailChange}
            />
          </div>

          <div className="flex flex-col items-left justify-center">
            <span className="text-lg">Email</span>
            <Input
              type="text"
              placeholder="myemail@here.com"
              className="my-2 outline-none text-primary-700 rounded-lg p-2 border-2 w-11/12"
              onChange={handleConfirmEmailChange}
            />
          </div>

          <div className="flex flex-col items-left justify-center">
            <span className="text-lg">Password</span>
            <div className="flex flex-row items-center justify-start">
                <Input
                type="password"
                placeholder="My p4ssw0rd h3r3"
                className="my-2 outline-none text-primary-700 rounded-lg p-2 border-2 w-64"
                // Password validators
                onChange={(e) => {
                    setPassword(e.target.value);
                    checkPassword(e.target.value);
                }}
                id="password"
                />
                <IconButton
                color="blue"
                onClick={() => {
                    let password = generateStrongPassword(25, true, true, true, true);
                    setPassword(password);
                    checkPassword(password);
                    navigator.clipboard.writeText(password);
                    document.getElementById("password").value = password;
                    setAlertText("Password copied to clipboard");
                }}
                className="rounded-lg p-4 m-2"
                >
                    <BsFillDice2Fill />
                </IconButton>
            </div>
          </div>

          <div className="flex flex-col items-left justify-center">
            <PasswordCheck
              passwordLength={passwordLength}
              passwordLowercase={passwordLowercase}
              passwordUppercase={passwordUppercase}
              passwordNumber={passwordNumber}
              passwordSpecial={passwordSpecial}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
          <Button
            color="blue"
            className="p-4 rounded-lg bg-primary-500 hover:bg-primary-600 transition duration-500 ease-in-out"
            onClick={() => {
              handleRegister();
            }}
          >
            <span className="text-lg font-bold text-center">Register</span>
          </Button>
        </div>

        {/* Or user externals */}
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex flex-row items-center justify-center space-x-2">
                <div className="flex flex-1 items-center justify-center">
                    <span className="text-lg">Or register with</span>
                </div>
            </div>

            <div className="flex flex-row items-center justify-center">
                <div className="flex flex-1 items-center justify-center space-x-4">
                    <IconButton
                        color="blue"
                        className="p-4 rounded-lg bg-primary-500 hover:bg-primary-600 transition duration-500 ease-in-out"
                        onClick={() => {
                            window.location.href = "/api/auth/discord/login";
                        }}
                    >
                        <BiLogoDiscordAlt />
                    </IconButton>

                    <IconButton
                        color="blue"
                        className="p-4 rounded-lg bg-primary-500 hover:bg-primary-600 transition duration-500 ease-in-out"
                        onClick={() => {
                            window.location.href = "/api/auth/github/login";
                        }}
                    >
                        <BiLogoGithub />
                    </IconButton>

                    <IconButton
                        color="blue"
                        className="p-4 rounded-lg bg-primary-500 hover:bg-primary-600 transition duration-500 ease-in-out"
                        onClick={() => {
                            window.location.href = "/api/auth/google/login";
                        }}
                    >
                        <BiLogoGoogle />
                    </IconButton>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
    // Replace later with a more secure method
    // Send the secret for client isn't a secure method
    // Maybe can use an asymmetric encryption for encriptation the jwt token
  let jtw_secret = process.env.JWT_SECRET;

  return {
    props: {
      jwt_secret: jtw_secret,
    },
  };
}
