import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search, MapPin, Briefcase, Building2, Users, ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import NestLogo from "@/assets/NestLogo.svg";

/* ── Vetted · Hireable · Ready pill badge ─────────────────────────── */
const VettedBadge = () => (
  <svg
    viewBox="0 0 320 40"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Vetted · Hireable · Ready"
    style={{ width: "100%", maxWidth: "320px", height: "auto" }}
  >
    <rect x="1" y="1" width="318" height="38" rx="19" ry="19" fill="#f0ebe0" stroke="#c8b99a" strokeWidth="1.2" />
    <path d="M22 20 L26 16 L30 20 L26 24 Z" fill="#4a6741" opacity="0.85" />
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
      fontFamily="'Georgia', 'Times New Roman', serif"
      fontSize="11.5" letterSpacing="2.8" fill="#4a6741" fontWeight="600">
      VETTED · HIREABLE · READY
    </text>
    <path d="M290 20 L294 16 L298 20 L294 24 Z" fill="#4a6741" opacity="0.85" />
  </svg>
);

/* ── Trending roles ────────────────────────────────────────────────── */
const trendingRoles = [
  "Frontend Developer",
  "Data Science",
  "Product Manager",
  "DevOps Engineer",
  "UI/UX Designer",
];

/* ── Mini stat pill ───────────────────────────────────────────────── */
const StatPill = ({ icon: Icon, value, label }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: "8px",
    padding: "0.5rem 0.85rem",
    backgroundColor: "#fdfaf4",
    border: "1px solid #e0d5c0",
    borderRadius: "999px",
    boxShadow: "0 1px 4px rgba(74,103,65,0.07)",
    flex: "1 1 auto",
    minWidth: "120px",
    justifyContent: "center",
  }}>
    <div style={{
      width: "26px", height: "26px", borderRadius: "8px",
      backgroundColor: "#eaf2e4", display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <Icon size={13} style={{ color: "#4a6741" }} />
    </div>
    <div style={{ lineHeight: 1.2 }}>
      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#2c2415", fontFamily: "Georgia, serif" }}>{value}</div>
      <div style={{ fontSize: "0.65rem", color: "#9a8a6a", letterSpacing: "0.03em" }}>{label}</div>
    </div>
  </div>
);

/* ── Component ────────────────────────────────────────────────────── */
const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const handleRoleClick = (role) => {
    dispatch(setSearchedQuery(role));
    navigate("/browse");
  };

  return (
    <div
      className="text-center flex items-center justify-center"
      style={{
        background: "linear-gradient(170deg, #f8f5ec 0%, #f0ebe0 60%, #eae3d0 100%)",
        minHeight: "88vh",
        padding: "2rem 0",
      }}
    >
      <div
        className="flex flex-col items-center w-full px-4 sm:px-6"
        style={{ maxWidth: "680px", gap: "1.1rem" }}
      >

        {/* Logo */}
        <img
          src={NestLogo}
          alt="Hire Nest Logo"
          style={{
            height: "clamp(80px, 15vw, 130px)",
            width: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 2px 8px rgba(74,103,65,0.14))",
          }}
        />

        {/* Live badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "4px 14px 4px 8px",
          backgroundColor: "#eaf2e4",
          border: "1px solid #b8d4a8",
          borderRadius: "999px",
          fontSize: "0.7rem",
          fontWeight: 600,
          color: "#3a5a1c",
          letterSpacing: "0.05em",
        }}>
          <span style={{
            width: "7px", height: "7px", borderRadius: "50%",
            backgroundColor: "#4a6741",
            boxShadow: "0 0 0 3px rgba(74,103,65,0.2)",
            display: "inline-block",
            flexShrink: 0,
          }} />
          320+ NEW JOBS THIS WEEK
        </div>

        {/* HIRE NEST heading */}
        <h1 style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: "clamp(2.2rem, 8vw, 4rem)",
          fontWeight: 800,
          letterSpacing: "0.18em",
          lineHeight: 1,
          margin: 0,
        }}>
          <span style={{ color: "#2c2415" }}>HIRE </span>
          <span style={{ color: "#4a6741" }}>NEST</span>
        </h1>

        {/* Vetted badge */}
        <div style={{ width: "100%", maxWidth: "320px" }}>
          <VettedBadge />
        </div>

        {/* Sub-tagline */}
        <p style={{
          fontFamily: "Georgia, serif",
          color: "#7a6a52",
          fontSize: "clamp(0.82rem, 2.2vw, 0.95rem)",
          letterSpacing: "0.03em",
          lineHeight: 1.75,
          maxWidth: "420px",
          margin: 0,
        }}>
          Discover opportunities matched to your skills — every role curated,
          every candidate career-ready.
        </p>

        {/* Search bar — stacked on xs, inline on sm+ */}
        <div className="w-full">
          {/* Mobile: stacked layout */}
          <div className="flex sm:hidden flex-col gap-2">
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0 1rem",
              border: "1px solid #d9cdb8",
              borderRadius: "12px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(74,100,65,0.1)",
            }}>
              <Search size={15} style={{ color: "#9a8a6a", flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Job title, keywords..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchJobHandler()}
                style={{
                  outline: "none", border: "none", width: "100%",
                  fontSize: "0.875rem", padding: "0.8rem 0",
                  backgroundColor: "transparent", color: "#2c2415",
                }}
              />
            </div>
            <button
              onClick={searchJobHandler}
              style={{
                width: "100%",
                padding: "0.8rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                backgroundColor: "#4a6741",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#3a5233"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#4a6741"}
            >
              Find Jobs
            </button>
          </div>

          {/* Desktop: pill inline layout */}
          <div
            className="hidden sm:flex"
            style={{
              width: "100%",
              boxShadow: "0 4px 20px rgba(74,100,65,0.13)",
              border: "1px solid #d9cdb8",
              borderRadius: "999px",
              backgroundColor: "#fff",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0 0 0 1rem",
              overflow: "hidden",
            }}
          >
            <Search size={16} style={{ color: "#9a8a6a", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchJobHandler()}
              style={{
                outline: "none", border: "none", flex: 1,
                fontSize: "0.875rem", padding: "0.85rem 0",
                backgroundColor: "transparent", color: "#2c2415",
                minWidth: 0,
              }}
            />
            <span style={{ width: "1px", background: "#d9cdb8", alignSelf: "stretch", margin: "10px 0", flexShrink: 0 }} />
            <div style={{ display: "flex", alignItems: "center", gap: "5px", padding: "0 0.6rem", whiteSpace: "nowrap", flexShrink: 0 }}>
              <MapPin size={13} style={{ color: "#9a8a6a" }} />
              <span style={{ fontSize: "0.75rem", color: "#9a8a6a" }}>India</span>
            </div>
            <button
              onClick={searchJobHandler}
              style={{
                borderRadius: "0 999px 999px 0",
                padding: "0 1.25rem",
                height: "50px",
                fontSize: "0.875rem",
                fontWeight: 600,
                backgroundColor: "#4a6741",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                transition: "background 0.15s ease",
                flexShrink: 0,
                display: "flex", alignItems: "center", gap: "6px",
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#3a5233"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#4a6741"}
            >
              Find Jobs
            </button>
          </div>
        </div>

        {/* Trending roles */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", justifyContent: "center", alignItems: "center" }}>
          <span style={{ fontSize: "0.72rem", color: "#9a8a6a", letterSpacing: "0.04em", fontWeight: 500 }}>
            Trending:
          </span>
          {trendingRoles.map((role) => (
            <button
              key={role}
              onClick={() => handleRoleClick(role)}
              style={{
                padding: "0.28rem 0.75rem",
                borderRadius: "999px",
                fontSize: "0.72rem",
                fontWeight: 600,
                border: "1px solid #d9cdb8",
                backgroundColor: "#fdfaf4",
                color: "#4a3f2f",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = "#4a6741";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "#4a6741";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "#fdfaf4";
                e.currentTarget.style.color = "#4a3f2f";
                e.currentTarget.style.borderColor = "#d9cdb8";
              }}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Stats pills — wrap on mobile */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.6rem",
          justifyContent: "center",
          width: "100%",
        }}>
          <StatPill icon={Briefcase} value="12,000+" label="Jobs Posted" />
          <StatPill icon={Building2} value="800+" label="Companies" />
          <StatPill icon={Users} value="50,000+" label="Job Seekers" />
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/jobs")}
          style={{
            display: "flex", alignItems: "center", gap: "5px",
            fontSize: "0.82rem", fontWeight: 600, color: "#4a6741",
            background: "none", border: "none", cursor: "pointer",
            textDecoration: "underline", textUnderlineOffset: "3px",
          }}
        >
          Browse all jobs <ArrowRight size={13} />
        </button>

      </div>
    </div>
  );
};

export default HeroSection;