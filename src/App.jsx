import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard");

    return () => {};
  }, []);

  return <div className="bg-custom-secondary-color p-10">Salam</div>;
}

export default App;
