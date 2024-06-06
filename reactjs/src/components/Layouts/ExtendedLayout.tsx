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

interface InfoInvestments {
  title: string;
  info: string;
  button: string;
}

export interface User {
  name: string;
  lastname: string;
}

interface Titles {
  titles: string[];
}

const ExtendedLayout: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [sidebarOptions, setSidebarOptions] = useState<string[]>([]);
  const [infoInvestments, setInfoInvestments] =
    useState<InfoInvestments | null>(null);
  const [titles, setTitles] = useState<Titles | null>(null);
  const [footerOptions, setFooterOptions] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const handleCreateUser = (newUser: User) => {
    console.log("Nuevo usuario:", newUser);
    setUsers([...users, newUser]);
  };

  const handleCreateInvoice = (newInvoice: Invoice) => {
    console.log("Nuevo usuario:", newInvoice);
    setInvoices([...invoices, newInvoice]);
  };

  useEffect(() => {
    fetch("/data/info.json")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.user);
        setSidebarOptions(data.sidebarOptions.options);
        setInfoInvestments(data.infoInvestments);
        setTitles(data.title);
        setFooterOptions(data.footer.options);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="homepage-container">
      <div className="homepage-navbar">
        <Navbar userData={userData} />
      </div>
      <div className="homepage-sidebar">
        <Sidebar options={sidebarOptions} />
      </div>
      <div className="homepage-content">
        <Routes>
          <Route
            path="gestion-usuarios"
            element={<CreateUserForm onCreate={handleCreateUser} />}
          />
          <Route
            path="gestion-facturas"
            element={<CreateInvoiceForm onCreate={handleCreateInvoice} />}
          />
          <Route path="subir-factura" element={<FacturaForm />} />
          <Route path="edit/:id" element={<EditUser />} />
          <Route path="view/:id" element={<ViewUser />} />
        </Routes>
      </div>
    </div>
  );
};

export default ExtendedLayout;