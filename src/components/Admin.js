import Sidenav from "./Sidenav";
import "../styles/sidenav.css";
const Admin = () => {
  return (
    <main className="admin-page">
      <Sidenav />
      <div className="admin-container">
        <h1 style={{ color: "#e3001b" }}>admin page</h1>
      </div>
    </main>
  );
};
export default Admin;
