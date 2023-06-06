import Navbar from "../components/navigation/navbar";
import ParticlesBackground from "../components/particles";

export default function MainLayout({ children }) {
  return (
    <div className="bg-[#131216]">
      <ParticlesBackground/>
      <Navbar />
      {children}
      <footer >
        <div className="px-6 py-12 mx-auto max-w-7xl md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-xs leading-5 text-center text-white">
              &copy; 2023 EDUNFT, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
