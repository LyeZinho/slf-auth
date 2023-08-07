import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Input, Alert, Button, IconButton } from "@material-tailwind/react";

import { GrCircleInformation,  } from "react-icons/gr";

export default function Login() {
  const [alert, setAlert] = useState("");

  function setAlertText(text) {
    setAlert(text);
    document.getElementById("alert").classList.remove("hidden");
    setTimeout(() => {
      document.getElementById("alert").classList.add("hidden");
    }, 5000);
  }

  return (
    <div className="flex flex-col items-center justify-center my-20">
      {/* Alert */}
      <div
        id="alert"
        className="flex flex-col items-center justify-center hidden"
      >
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
      </div>
    </div>
  );
}
