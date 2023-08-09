import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { verifyJWT, generateJWT  } from "../../lib/jwt";

import { Input, Alert, Button, IconButton } from "@material-tailwind/react";
import { GrCircleInformation } from "react-icons/gr";
import { redirect } from "next/dist/server/api-utils";


/*
This will redirect to the outside website and set the cookie

POST
{
  jwt: "jwt token"
}

decoded jwt token:
{
  "id":"0b5a837f-953b-4cd5-9a02-75c3ae2de905",
  "createdAt":"2023-08-07T23:34:25.434Z",
  "updatedAt":"2023-08-07T23:34:25.434Z",
  "expiresAt":"2023-08-14T23:34:25.070Z",
  "handle":"f769bdfc3e73f21cac69a9c19db5e587bdcc108d5e854220f4fd187c63002290f62ccc7f62cad03cff5ddc5fc554bfaf1e0d4e45fb9557a18459674fb988e1d6",
  "userId":"44fa1998-ea56-43ab-a14c-f1cc2d7a497d",
  "ip":"::1",
  "userAgent":"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36","iat":1691451265,
  "exp":1691454865
}

*/ 

async function login(email, password, jwt) {
  const payload = {
    email: email,
    password: password
  };

  const jwtToken = generateJWT(payload, jwt);

  const res = await fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jwt: jwtToken,
    }),
  });

  const data = await res.json();

  if (data.error) {
    return { error: data.error };
  } else {
    return { jwt: data.jwt };
  }
}

export default function Login({ jwt }) {
  const [alert, setAlert] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function setAlertText(text) {
    setAlert(text);
    document.getElementById("alert").classList.remove("hidden");
    setTimeout(() => {
      document.getElementById("alert").classList.add("hidden");
    }, 5000);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function checkEmail() {
    if (!email) {
      setAlertText("Please enter your email.");
      return false;
    }

    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(email)) {
      setAlertText("Please enter a valid email.");
      return false;
    }

    return true;
  }

  function checkPassword() {
    if (!password) {
      setAlertText("Please enter your password.");
      return false;
    }

    return true;
  }

  function submitHandler(e) {
    if (e) {
      e.preventDefault();
    }

    if (checkEmail() && checkPassword()) {
      login(email, password, jwt).then((data) => {
        if (data.error) {
          setAlertText(data.error);
        } else {
          let jwtdecoded = verifyJWT(data.jwt, jwt);
          localStorage.setItem("session", JSON.stringify(jwtdecoded));
          window.location.href = "/";
        }
      });
    }
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
      <div className="flex flex-col items-center justify-center rounded-lg bg-primary-700 text-primary-50 p-4 space-y-10 lg:w-96 md:w-2/3 sm:w-11/12">
        {/* Go Back button */}
        <div className="flex flex-row items-left justify-center">
          <div className="flex flex-1 items-left justify-center">
            <Button
              className="p-2 bg-primary-500 hover:bg-primary-600 transition duration-500 ease-in-out rounded-lg"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <h1 className="text-lg font-bold">Go Back</h1>
            </Button>
          </div>
        </div>

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

        {/* Main content */}
        <div className="flex flex-col items-center justify-center space-y-4">
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
            <span className="text-lg">Password</span>
            <Input
              type="password"
              placeholder="********"
              className="my-2 outline-none text-primary-700 rounded-lg p-2 border-2 w-11/12"
              onChange={handlePasswordChange}
            />
          </div>
        </div>

        {/* Login button */}
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-1 items-center justify-center">
            <Button
              className="p-2 bg-primary-500 hover:bg-primary-600 transition duration-500 ease-in-out rounded-lg"
              onClick={() => {
                submitHandler();
              }}
            >
              <h1 className="text-lg font-bold">Login</h1>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = context.req.cookies.session;
  const jwt = process.env.JWT_SECRET; 
  // Get headers
  const headers = context.req.headers;
  console.log(headers);

  // if (session) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      jwt,
    },
  };
}
