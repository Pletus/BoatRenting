import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="text-white w-screen text-xl">
        <img src="https://via.placeholder.com/40" alt="" />
        <form id="typesForm">
          <input
            type="checkbox"
            id="Boat"
            name="Boat"
            value="Boat"
          ></input>
          <label for="Boat">Boat</label>
          <input
            type="checkbox"
            id="Catamaran"
            name="Catamaran"
            value="Catamaran"
          ></input>
          <label for="Catamaran">Catamaran</label>
          <input
            type="checkbox"
            id="Fragata"
            name="Fragata"
            value="Fragata"
          ></input>
          <label for="Fragata">Fragata</label>
          <input
            type="checkbox"
            id="Sailing Vessel"
            name="Sailing Vessel"
            value="Sailing Vessel"
          ></input>
          <label for="Sailing Vessel">Sailing Vessel</label>
          <label for="boat">Boat</label>
          <input
            type="checkbox"
            id="Yacht"
            name="Yacht"
            value="Yacht"
          ></input>
          <label for="Yacht">Yacht</label>
        </form>
      </nav>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

export default Layout;
