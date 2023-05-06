import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <div className="bg-[#ded5f5] h-screen w-screen">
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/quiz" Component={Quiz} />
          <Route path="/result" Component={Result} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
