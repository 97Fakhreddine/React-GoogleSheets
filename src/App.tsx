import React from "react";
import "./style/App.css";
import { FormComponent } from "./pages/Form";
const App: React.FC<{}> = () => {
  /**
   * Renders an entire basic Form components with name,age,salary and Hooby fields
   * using {@link Renderer}.
   *
   * Used by external plugins
   * @return {Promise<string>}                HTML of the page
   */

  return (
    <div className="App">
      <FormComponent />
    </div>
  );
};

export default App;
