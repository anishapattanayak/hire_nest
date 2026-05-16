import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { User2, LogOut, Bell, Bookmark, Menu, X } from "lucide-react";
import NestLogo from "@/assets/NestLogo.svg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT, NOTIFICATION_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { setNotifications, setNotificationLoading, markAllReadLocal } from "@/redux/notificationSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { items: notifications, unreadCount } = useSelector((store) => store.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return;
      try {
        dispatch(setNotificationLoading(true));
        const res = await axios.get(`${NOTIFICATION_API_END_POINT}/`, { withCredentials: true });
        if (res.data.success) dispatch(setNotifications(res.data.notifications));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setNotificationLoading(false));
      }
    };
    fetchNotifications();
  }, [user, dispatch]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [navigate]);

  const handleMarkAllRead = async () => {
    try {
      await axios.post(`${NOTIFICATION_API_END_POINT}/read-all`, {}, { withCredentials: true });
      dispatch(markAllReadLocal());
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
          localStorage.removeItem("token");
          delete axios.defaults.headers.common.Authorization;
          dispatch(setUser(null));
          navigate("/");
          toast.success(res.data.message);
          setMenuOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const navLinks =
    user && user.role === "recruiter"
      ? [{ to: "/admin/companies", label: "Companies" }, { to: "/admin/jobs", label: "Jobs" }]
      : [{ to: "/", label: "Home" }, { to: "/jobs", label: "Jobs" }, { to: "/browse", label: "Browse" }, { to: "/about", label: "About" }];

  return (
    <>
      <nav style={{
        backgroundColor: "#f5f0e6",
        borderBottom: "1px solid #d6cbaa",
        boxShadow: "0 1px 6px rgba(45, 80, 22, 0.06)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>

          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <img src={NestLogo} alt="Hire Nest Logo" style={{ height: "38px", width: "auto", objectFit: "contain", marginTop: "-8px" }} />
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", fontWeight: 700, letterSpacing: "0.06em", margin: 0, lineHeight: 1 }}>
              <span style={{ color: "#4a6428" }}>HIRE</span>
              <span style={{ color: "#2c2415" }}> NEST</span>
            </h1>
          </Link>

          {/* Desktop nav links + actions */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "24px" }}>
            <ul style={{ display: "flex", alignItems: "center", gap: "20px", listStyle: "none", margin: 0, padding: 0 }}>
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to}>{link.label}</NavLink>
              ))}
            </ul>

            {!user ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Link to="/login">
                  <button style={outlineBtn}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#eee8d8"; e.currentTarget.style.borderColor = "#4a6428"; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "#d6cbaa"; }}>
                    Sign In
                  </button>
                </Link>
                <Link to="/signup">
                  <button style={solidBtn}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#2c4415"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "#3a5a1c"}>
                    Register
                  </button>
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                {user?.role !== "recruiter" && (
                  <button onClick={() => navigate("/saved-jobs")} title="Saved Jobs" style={iconBtn}>
                    <Bookmark size={20} style={{ color: "#4a6428" }} />
                  </button>
                )}

                {/* Notification bell */}
                <Popover>
                  <PopoverTrigger asChild>
                    <button style={{ ...iconBtn, position: "relative" }}>
                      <Bell size={20} style={{ color: "#4a6428" }} />
                      {unreadCount > 0 && (
                        <span style={badgeStyle}>{unreadCount}</span>
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent style={popoverStyle}>
                    <NotificationContent notifications={notifications} unreadCount={unreadCount} onMarkAllRead={handleMarkAllRead} />
                  </PopoverContent>
                </Popover>

                {/* Avatar */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar style={avatarStyle}
                      onMouseEnter={e => e.currentTarget.style.outlineColor = "#3a5a1c"}
                      onMouseLeave={e => e.currentTarget.style.outlineColor = "#d6cbaa"}>
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent style={{ ...popoverStyle, width: "280px" }}>
                    <UserMenuContent user={user} onLogout={logoutHandler} />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          {/* Mobile right side: icons + hamburger */}
          <div className="flex md:hidden" style={{ alignItems: "center", gap: "12px" }}>
            {user && (
              <>
                {user?.role !== "recruiter" && (
                  <button onClick={() => navigate("/saved-jobs")} style={iconBtn}>
                    <Bookmark size={19} style={{ color: "#4a6428" }} />
                  </button>
                )}
                <Popover>
                  <PopoverTrigger asChild>
                    <button style={{ ...iconBtn, position: "relative" }}>
                      <Bell size={19} style={{ color: "#4a6428" }} />
                      {unreadCount > 0 && <span style={badgeStyle}>{unreadCount}</span>}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent style={{ ...popoverStyle, width: "290px" }}>
                    <NotificationContent notifications={notifications} unreadCount={unreadCount} onMarkAllRead={handleMarkAllRead} />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar style={{ ...avatarStyle, width: "34px", height: "34px" }}
                      onMouseEnter={e => e.currentTarget.style.outlineColor = "#3a5a1c"}
                      onMouseLeave={e => e.currentTarget.style.outlineColor = "#d6cbaa"}>
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent style={{ ...popoverStyle, width: "260px" }}>
                    <UserMenuContent user={user} onLogout={logoutHandler} />
                  </PopoverContent>
                </Popover>
              </>
            )}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              style={iconBtn}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} style={{ color: "#4a6428" }} /> : <Menu size={22} style={{ color: "#4a6428" }} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden" style={{
            backgroundColor: "#f5f0e6",
            borderTop: "1px solid #d6cbaa",
            padding: "12px 16px 16px",
          }}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block",
                      padding: "10px 12px",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#3c3528",
                      textDecoration: "none",
                      borderRadius: "8px",
                      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#eee8d8"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {!user && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #d6cbaa" }}>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <button style={{ ...outlineBtn, width: "100%", justifyContent: "center" }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#eee8d8"; e.currentTarget.style.borderColor = "#4a6428"; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "#d6cbaa"; }}>
                    Sign In
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  <button style={{ ...solidBtn, width: "100%", justifyContent: "center" }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#2c4415"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "#3a5a1c"}>
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

/* ── Extracted sub-components ─────────────────────────────────────── */

const NotificationContent = ({ notifications, unreadCount, onMarkAllRead }) => (
  <>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
      <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#2c2415", fontFamily: "Georgia, serif" }}>Notifications</span>
      {unreadCount > 0 && (
        <button onClick={onMarkAllRead} style={{ border: "none", background: "transparent", fontSize: "0.75rem", color: "#4a6428", cursor: "pointer", textDecoration: "underline" }}>
          Mark all as read
        </button>
      )}
    </div>
    {notifications.length === 0 ? (
      <p style={{ fontSize: "0.8rem", color: "#7a6a52", margin: 0 }}>No notifications yet.</p>
    ) : (
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
        {notifications.map((n) => (
          <li key={n._id} style={{ padding: "6px 8px", borderRadius: "8px", backgroundColor: n.isRead ? "transparent" : "#eee8d8", fontSize: "0.8rem", color: "#3c3528" }}>
            {n.message}
          </li>
        ))}
      </ul>
    )}
  </>
);

const UserMenuContent = ({ user, onLogout }) => (
  <>
    <div style={{ display: "flex", gap: "12px", alignItems: "center", paddingBottom: "12px", borderBottom: "1px solid #d6cbaa" }}>
      <Avatar><AvatarImage src={user?.profile?.profilePhoto} /></Avatar>
      <div>
        <p style={{ margin: 0, fontWeight: 600, fontSize: "0.9rem", color: "#2c2415", fontFamily: "Georgia, serif" }}>{user?.fullname}</p>
        <p style={{ margin: 0, fontSize: "0.78rem", color: "#7a6a52" }}>{user?.profile?.bio || "Job Portal"}</p>
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginTop: "10px" }}>
      {user?.role === "jobseeker" && (
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <div style={menuItemStyle}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#eee8d8"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>
            <User2 size={15} style={{ color: "#4a6428" }} />
            <span style={{ fontSize: "0.85rem", color: "#3c3528", fontWeight: 500 }}>View Profile</span>
          </div>
        </Link>
      )}
      <div onClick={onLogout} style={menuItemStyle}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#eee8d8"}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>
        <LogOut size={15} style={{ color: "#4a6428" }} />
        <span style={{ fontSize: "0.85rem", color: "#3c3528", fontWeight: 500 }}>Logout</span>
      </div>
    </div>
  </>
);

const NavLink = ({ to, children }) => (
  <li>
    <Link to={to}
      style={{ fontSize: "0.9rem", fontWeight: 600, color: "#3c3528", textDecoration: "none", padding: "4px 2px", borderBottom: "2px solid transparent", transition: "color 0.15s ease, border-color 0.15s ease", fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
      onMouseEnter={e => { e.currentTarget.style.color = "#3a5a1c"; e.currentTarget.style.borderBottomColor = "#3a5a1c"; }}
      onMouseLeave={e => { e.currentTarget.style.color = "#3c3528"; e.currentTarget.style.borderBottomColor = "transparent"; }}>
      {children}
    </Link>
  </li>
);

/* ── Shared styles ────────────────────────────────────────────────── */
const iconBtn = { border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" };
const badgeStyle = { position: "absolute", top: "-4px", right: "-6px", backgroundColor: "#3a5a1c", color: "#f5f0e6", borderRadius: "999px", padding: "0 5px", fontSize: "0.62rem", fontWeight: 700 };
const avatarStyle = { cursor: "pointer", outline: "2px solid #d6cbaa", outlineOffset: "2px", borderRadius: "50%", transition: "outline-color 0.15s ease" };
const popoverStyle = { width: "320px", maxHeight: "360px", overflowY: "auto", backgroundColor: "#faf7f0", border: "1px solid #d6cbaa", borderRadius: "14px", boxShadow: "0 4px 16px rgba(45,80,22,0.1)", padding: "0.75rem" };
const menuItemStyle = { display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px", borderRadius: "8px", cursor: "pointer", backgroundColor: "transparent", transition: "background-color 0.15s ease" };
const outlineBtn = { height: "36px", padding: "0 16px", fontSize: "0.9rem", fontWeight: 600, fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif", border: "1px solid #d6cbaa", borderRadius: "8px", backgroundColor: "transparent", color: "#4a3f2f", cursor: "pointer", transition: "all 0.15s ease", display: "flex", alignItems: "center" };
const solidBtn = { height: "36px", padding: "0 16px", fontSize: "0.9rem", fontWeight: 600, fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif", border: "1px solid #3a5a1c", borderRadius: "8px", backgroundColor: "#3a5a1c", color: "#f5f0e6", cursor: "pointer", transition: "all 0.15s ease", display: "flex", alignItems: "center" };

export default Navbar;