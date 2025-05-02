import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaBus, FaHome, FaTicketAlt, FaUsers, FaUserTie } from "react-icons/fa";
import { RiAdminFill, RiUserStarFill } from "react-icons/ri";
import styled from "../styles/Sidebar.module.scss";
import { useLocation } from "react-router";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  if (location.pathname === "/login") return null;

  return (
    <div className={`${collapsed ? styled["collapsed"] : styled["side-bar"]}`}>
      <div className={styled["side-bar__top-section"]}>
        <button className={styled["side-bar__toggle-btn"]} onClick={handleToggleSidebar}>
          <FaBars />
        </button>
        <span className={styled["side-bar__logo"]}>YudLinBus</span>
      </div>

      <nav className={styled["side-bar__menu"]}>
        <ul className={styled.list}>
          <li className={styled["side-bar__menu-item"]}>
            <NavLink to="/" className={styled["side-bar__menu-link"]}>
              <FaHome className={styled.icon} />
              <span className={styled["side-bar__section-title"]}>Trang chủ</span>
            </NavLink>
          </li>
          <li className={styled["side-bar__menu-item"]}>
            <NavLink to="/customer-manage" className={styled["side-bar__menu-link"]}>
              <FaUsers className={styled.icon} />
              <span className={styled["side-bar__section-title"]}>Quản lý Khách hàng</span>
            </NavLink>
          </li>
          <li className={styled["side-bar__menu-item"]}>
            <NavLink to="/admin-manage" className={styled["side-bar__menu-link"]}>
              <RiAdminFill className={styled.icon} />
              <span className={styled["side-bar__section-title"]}>Quản lý quản trị viên</span>
            </NavLink>
          </li>
          <li className={styled["side-bar__menu-item"]}>
            <NavLink to="/driver-manage" className={styled["side-bar__menu-link"]}>
              <FaUserTie className={styled.icon} />
              <span className={styled["side-bar__section-title"]}>Quản lý tài xế</span>
            </NavLink>
          </li>
          <li className={styled["side-bar__menu-item"]}>
            <NavLink to="/co-driver-manage" className={styled["side-bar__menu-link"]}>
              <RiUserStarFill className={styled.icon} />
              <span className={styled["side-bar__section-title"]}>Quản lý phụ xe</span>
            </NavLink>
          </li>
          <li className={styled["side-bar__menu-item"]}>
            <NavLink to="/bus-manage" className={styled["side-bar__menu-link"]}>
              <FaBus className={styled.icon} />
              <span className={styled["side-bar__section-title"]}>Quản lý xe khách</span>
            </NavLink>
          </li>
          <li className={styled["side-bar__menu-item"]}>
            <NavLink to="/trip-manage" className={styled["side-bar__menu-link"]}>
              <FaBus className={styled.icon} />
              <span className={styled["side-bar__section-title"]}>Quản lý chuyến đi</span>
            </NavLink>
          </li>
          <li className={styled["side-bar__menu-item"]}>
            <NavLink to="/promotion-manage" className={styled["side-bar__menu-link"]}>
              <FaTicketAlt className={styled.icon} />
              <span className={styled["side-bar__section-title"]}>Quản khuyến mãi</span>
            </NavLink>
          </li>
          <li className={styled["side-bar__menu-item"]}>
            <NavLink to="/ticket-manage" className={styled["side-bar__menu-link"]}>
              <FaTicketAlt className={styled.icon} />
              <span className={styled["side-bar__section-title"]}>Quản lý vé</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
