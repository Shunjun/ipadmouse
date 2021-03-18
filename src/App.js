import Cousor from "./components/cursor";
import IndexPage from "./page/index";

function App() {
  return (
    <div className="App">
      <Cousor range="window">
        <IndexPage />
      </Cousor>
    </div>
  );
}

export default App;
