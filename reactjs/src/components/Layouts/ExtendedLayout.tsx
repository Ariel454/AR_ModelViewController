import React, { useState, useEffect } from 'react';
import Navbar from '../NavBar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Content from '../Content/home';
import './extendedlayoutStyles.css';

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

interface Cuentas {
  cuenta1: {
    nombre: string;
    id: string;
    saldo: string;
  };
  cuenta2: {
    nombre: string;
    id: string;
    saldo: string;
  };
  cuenta3: {
    nombre: string;
    id: string;
    saldo: string;
  };
  cuenta4: {
    nombre: string;
    id: string;
    saldo: string;
  };
  cuenta5: {
    nombre: string;
    id: string;
    saldo: string;
    fecha?: string;
  };
}

const ExtendedLayout: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [sidebarOptions, setSidebarOptions] = useState<string[]>([]);
  const [infoInvestments, setInfoInvestments] = useState<InfoInvestments | null>(null);
  const [titles, setTitles] = useState<Titles | null>(null);
  const [cuentas, setCuentas] = useState<Cuentas | null>(null);
  const [footerOptions, setFooterOptions] = useState<string[]>([]); 

  useEffect(() => {
    fetch("/data/info.json")
      .then(response => response.json())
      .then(data => {
        setUserData(data.user);
        setSidebarOptions(data.sidebarOptions.options);
        setInfoInvestments(data.infoInvestments);
        setTitles(data.title);
        setCuentas(data.cuentas);
        setFooterOptions(data.footer.options); 
      })
      .catch(error => console.error("Error fetching data:", error));
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
        <Content infoInvestments={infoInvestments} titles={titles} cuentas={cuentas} />
      </div>
    </div>
  );
};

export default ExtendedLayout;
