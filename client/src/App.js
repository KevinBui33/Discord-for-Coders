import "./App.css";
import Chat from "./Components/Chat/Chat";
import Header from "./Components/Header";
import Login from "./Components/Login/Login";
import SideBar from "./Components/SideBar";

function App() {
  return (
    <div className="App">
      {/* <Header />
      <div className="ChatBox">
        <SideBar />
        <Chat />
      </div> */}
      <Login></Login>
    </div>
  );
}

export default App;
