import Image from "next/image";

export function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-950 z-50">
      <Image
        src={"https://www.interpol.int/build/images/logo.e44aaf3c.webp"}
        width={310}
        height={0}
        alt="Interpol Logo"
      />
    </div>
  );
}
