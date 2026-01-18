import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "./Containers/Container";
import Home from "./pages/Home";

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Container>
        <Home></Home>
        <ToastContainer autoClose={3000} theme="dark" />
      </Container>
    </div>
  );
}

export default App;
