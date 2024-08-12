import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <div className="w-full relative flex items-center justify-between max-w-2xl mx-auto py-5">
      <Link href="/" className="text-4xl font-bold tracking-tighter">
        Pranjal <span className="text-primary">Blog</span>
      </Link>
      <ModeToggle />
    </div>
  );
}
