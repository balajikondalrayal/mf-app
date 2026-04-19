import ReactDOM from "react-dom/client";
import Header from 'home/Header';

import "./css/Master.module.css";

const App = () => (
  <div>
    <Header />
    <div className="master-content-layout">
      <div>Name: pdp-app</div>
      <div>Framework: react-19</div>
    </div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);