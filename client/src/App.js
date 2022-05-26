import "./App.css";
import Chat from "./Components/Chat";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="ChatBox">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
