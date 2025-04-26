import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ShoppingCartProvider>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </ShoppingCartProvider>
    </Suspense>
  );
}

export default App;
