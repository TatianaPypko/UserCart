import React from "react";
import { useGlobalContext } from "./context";
import NavBar from "./NavBar";
import CartContainer from "./CartContainer";

function App() {
  const { loading } = useGlobalContext();

  if (loading) {
    return <div className="loading"></div>;
  }

  return (
    <main>
      <NavBar />
      <CartContainer />
    </main>
  );
}

export default App;
