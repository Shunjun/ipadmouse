import logo from "./logo.svg";
import "./App.css";
import Cousor from "./components/cursor";
import LinkedAnimate from "./components/cursor/test";
import IndexPage from "./page/index";

function App() {
  return (
    <div className="App">
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo"/>*/}
      {/*  /!*<p>*!/*/}
      {/*  /!*  Edit <code>src/App.js</code> and save to reload.*!/*/}
      {/*  /!*</p>*!/*/}
      {/*  /!*<a*!/*/}
      {/*  /!*  className="App-link"*!/*/}
      {/*  /!*  href="https://reactjs.org"*!/*/}
      {/*  /!*  target="_blank"*!/*/}
      {/*  /!*  rel="noopener noreferrer"*!/*/}
      {/*  /!*>*!/*/}
      {/*  /!*  Learn React*!/*/}
      {/*  /!*</a>*!/*/}
      {/*</header>*/}
      {/* <LinkedAnimate />
      <LinkedAnimate />
      <LinkedAnimate />
      <LinkedAnimate />
      <LinkedAnimate /> */}

      <Cousor>
        <IndexPage />
      </Cousor>
    </div>
  );
}

export default App;
