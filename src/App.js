import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import root from "./router/root";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <RouterProvider router={root} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
