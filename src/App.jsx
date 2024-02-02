import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Pizza from "./components/Pizza/Pizza";
import Soup from "./components/Soup/Soup";
import Salat from "./components/Salat/Salat";
import Layout from "./components/Layout/Layout";
import Snack from "./components/Snack/Snack";
import scss from "./App.module.scss";
import { useLocation } from "react-router-dom";
// import { useLocation } from "react-router-dom";

const links = [
  {
    name: "Pizza",
    href: "/Pizza",
  },
  {
    name: "Salat",
    href: "/Salat",
  },
  {
    name: "Snack",
    href: "/Snack",
  },
  {
    name: "Soup",
    href: "/Soup",
  },
];

function App() {
  const { pathname } = useLocation();

  return (
    <>
      <header>
        <ul className={scss.links}>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </header>
      <main>
        <div className={scss.navLink}>
          {links.map((item, index) => (
            <>
              <NavLink
                key={index}
                to={item.href}
                className={
                  location.pathname === item.href
                    ? `${scss.link} ${scss.active}`
                    : `${scss.link}`
                }
              >
                {item.name}
              </NavLink>
            </>
          ))}
        </div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/Pizza" element={<Pizza />} />
            <Route path="/Soup" element={<Soup />} />
            <Route path="/Salat" element={<Salat />} />
            <Route path="/Snack" element={<Snack />} />
          </Route>
        </Routes>
      </main>
      <footer>
        <p className={scss.textFooter}>
          © 2002-2024 Империя Пиццы Все права защищены ОсОО "Империя пиццы" пер.
          Магнитогорский, дом 16, Бишкек, Чуйская область 720031, Кыргызстан
        </p>
      </footer>
    </>
  );
}

export default App;
