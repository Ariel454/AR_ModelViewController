import React, { useState, useEffect } from "react";
import Navbar from "../NavBar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import "./extendedlayoutStyles.css";
import EditUser from "../Management/UsersAdministration/EditUser";
import ViewUser from "../Management/UsersAdministration/ViewUser";
import CreateUserForm from "../Management/UsersAdministration/CreateUserForm";
import FacturaForm from "../UploadInvoice/UploadInvoice";
import CreateInvoiceForm from "../Management/InvoicesAdministration/CreateInvoiceForm";
import { Invoice } from "../../types/invoice";
import EditInvoice from "../Management/InvoicesAdministration/EditInvoice";
import ViewInvoice from "../Management/InvoicesAdministration/ViewInvoice";
import CreateClaimForm from "../Management/ClaimsAdministration/CreateClaimForm";
import { Claim } from "../../types/claim";
import EditClaim from "../Management/ClaimsAdministration/EditClaim";
import ViewClaim from "../Management/ClaimsAdministration/ViewInvoice";
import EditAward from "../Management/AwardsAdministration/EditAward";
import ViewAward from "../Management/AwardsAdministration/ViewAward";
import CreateAwardForm from "../Management/AwardsAdministration/CreateAwardForm";
import { Award } from "../../types/award";
import { User } from "../../types/user";
import ApproveInvoices from "../Management/InvoicesAdministration/ApproveInvoices";
import Store from "../Management/StoreAwards/store";

interface ExtendedLayoutProps {
  user: User | null;
  setUser: (data: any) => void;
}

const ExtendedLayout: React.FC<ExtendedLayoutProps> = ({ user, setUser }) => {
  const [userData, setUserData] = useState<User | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);

  const handleCreateUser = (newUser: User) => {
    setUsers([...users, newUser]);
  };

  const handleCreateInvoice = (newInvoice: Invoice) => {
    setInvoices([...invoices, newInvoice]);
  };

  const handleCreateClaim = (newClaim: Claim) => {
    setClaims([...claims, newClaim]);
  };

  const handleCreateAward = (newAward: Award) => {
    setAwards([...awards, newAward]);
  };

  useEffect(() => {
    fetch("/data/info.json")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.user);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="homepage-container">
      <div className="homepage-navbar">
        <Navbar userData={user} />
      </div>
      <div className="homepage-sidebar">
        <Sidebar user={user} />
      </div>
      <div className="homepage-content">
        <Routes>
          <Route
            path="gestion-usuarios"
            element={<CreateUserForm onCreate={handleCreateUser} />}
          />
          <Route path="edit-user/:id" element={<EditUser />} />
          <Route path="view-user/:id" element={<ViewUser />} />
          <Route
            path="gestion-facturas"
            element={<CreateInvoiceForm onCreate={handleCreateInvoice} />}
          />
          <Route path="edit-invoice/:id" element={<EditInvoice />} />
          <Route path="view-invoice/:id" element={<ViewInvoice />} />
          <Route
            path="subir-factura"
            element={<FacturaForm onCreate={handleCreateInvoice} user={user} />}
          />
          <Route
            path="aprobar-facturas"
            element={<ApproveInvoices setUser={setUser} />}
          />
          <Route
            path="reclamar-premios"
            element={<Store user={user} setUser={setUser} />}
          />
          <Route
            path="gestion-reclamos"
            element={<CreateClaimForm onCreate={handleCreateClaim} />}
          />
          <Route path="edit-claim/:id" element={<EditClaim />} />
          <Route path="view-claim/:id" element={<ViewClaim />} />
          <Route
            path="gestion-premios"
            element={<CreateAwardForm onCreate={handleCreateAward} />}
          />
          <Route path="edit-award/:id" element={<EditAward />} />
          <Route path="view-award/:id" element={<ViewAward />} />
        </Routes>
      </div>
    </div>
  );
};

export default ExtendedLayout;
