import ReactDOM from "react-dom/client";
import Header from "./Header";
import Footer from "./Footer";

import "./index.css";

const App = () => (
  <div className='flex flex-col h-screen justify-between'>
    <Header />
    <div className="master-content-layout">
      <div>Name: home-app</div>
      <div>Framework: react-19</div>
    </div>
    <Footer />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);