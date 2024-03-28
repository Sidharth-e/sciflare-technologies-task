import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { checkUserRole} from "../../utility/utlis";
import AdminDataTable from "../../components/adminDataTable/AdminDataTable"
import NormalUser from "../../components/normalUser/NormalUser";

export default function Dashboard() {
  const currenUserRole=checkUserRole();
  return (
    <>
      <Navbar />
      {currenUserRole==='user'?<NormalUser/>:<AdminDataTable/>}
    </>
  );
}
