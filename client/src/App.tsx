import "./scss/app.scss";

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

import { Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";

type SearchContextType = {
  searchValue: string;
  setSearchValue: any;
};

export const SearchContext = createContext<SearchContextType>({
  searchValue: ``,
  setSearchValue: ``,
});

function App() {
  const [searchValue, setSearchValue] = useState<string>(``);

  return (
    <div className="App">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <div className="wrapper">
          <Header />
          <div className="content">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
