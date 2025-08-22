import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Step1 from "./components/step1";
import Step2 from "./components/step2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
      </Routes>
    </Router>
  );
}

export default App;
