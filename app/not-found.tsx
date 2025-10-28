import { Footer } from "@/components/blog/home/Footer";
import { Navbar } from "@/components/blog/home/Navbar";
import NotFoundPage from "@/components/NotFoundPage";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="mt-20" />
      <NotFoundPage label="Go to Home" url="/" />
      <Footer />
    </>
  );
}
