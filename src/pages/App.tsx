import KBeautyRoutine from "./DailyRoutine";
import Navbar from "../shared/components/navbar";
import BeautyRoutine from "../shared/features/home/home_routine";

function App() {
  return (
    <div className="font-sans text-gray-800 min-h-screen bg-gradient-to-r from-pink-200 via-pink-50 to-pink-200">
      
        <Navbar />
         

      <div className="flex justify-center w-full bg-gradient-to-r from-pink-200 via-pink-50 to-pink-200">
        <div className="w-full max-w-10xl px-4 center bg-gradient-to-r from-pink-200 via-pink-50 to-pink-200">
          <BeautyRoutine/>
        </div>
      </div>
    </div>
  );
}

export default App;
