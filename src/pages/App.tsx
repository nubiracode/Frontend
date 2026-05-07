import KBeautyRoutine from "../components/stepsSkin";
import Navbar from "../components/navbar";
import BeautyRoutine from "../components/home_routine";

function App() {
  return (
    <div className="font-sans text-gray-800 min-h-screen bg-[#f8e8ed]">
      
        <Navbar />
         

      <div className="flex justify-center w-full">
        <div className="w-full max-w-10xl px-4 center">
          <BeautyRoutine/>
        </div>
      </div>
    </div>
  );
}

export default App;
