import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex flex-1 items-center justify-center">
        <Image
          src="/assets/slf-auth.png"
          alt="SLF Logo"
          width={200}
          height={200}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-5xl font-bold">SLF-Auth.</h1>
      </div>
    </div>
  );
}
