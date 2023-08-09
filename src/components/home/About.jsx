import Link from "next/link";

export default function About() {

    return (
        <div className="flex flex-col items-center justify-center my-10">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">What is SLF-Auth?</h1>
                <p className="text-lg text-center">
                    SLF-Auth is a simple authentication system make the life of developers easier.<br /> 
                    It is a simple, easy to use, and easy to implement authentication system.<br />
                    It is also open source, so you can contribute to the project if you want to.<br />
                    SLF-Auth being open source project, aims to offer a safe and secure authentication, <br />
                    system for developers which is also easy to implement and use.
                </p>
            </div>
        </div>
    );
}