import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Step1 from "./components/step1";
import Step2 from "./components/step2";
import Step3 from "./components/step-3";
import Step4 from "./components/step4";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="/step4" element={<Step4 />} />
      </Routes>
    </Router>
  );
}

export default App;
