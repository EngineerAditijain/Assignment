import './App.css';
import Container from './components/maincontainer/container.jsx';
import Navbar from './components/navbar/navbar.jsx';

function App() {
  return (
    <div className="App">


      <div className=" min-h-screen h-[100%]">
        <Navbar />
        <Container/>

      </div>
    </div>

  );
}

export default App;
