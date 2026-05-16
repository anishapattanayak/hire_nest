import React from "react";
import Navbar from "./shared/Navbar";
import { Link } from "react-router-dom";
import { Briefcase, Users, Building2, ShieldCheck, Zap, Heart, ArrowRight } from "lucide-react";
import NestLogo from "@/assets/NestLogo.svg";

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Transparency",
    description: "Every listing is verified. Every recruiter is vetted. No ghost jobs, no spam — just real opportunities.",
  },
  {
    icon: Zap,
    title: "Speed & Simplicity",
    description: "From search to application in seconds. We cut the friction so you can focus on what matters — getting hired.",
  },
  {
    icon: Heart,
    title: "Career First",
    description: "We're not just a job board. We care about long-term career growth and match candidates to roles where they'll thrive.",
  },
];

const stats = [
  { icon: Briefcase, value: "12,000+", label: "Jobs Posted" },
  { icon: Building2, value: "800+",    label: "Companies"   },
  { icon: Users,     value: "50,000+", label: "Job Seekers" },
];

const team = [
  { name: "Aiswarya Priyadarshini Biswal",   role: "Co-Founder",          initial: "A" },
  { name: "Anisha Pattnayak",                role: "Co-Founder",          initial: "A" },
  { name: "Kalashree Kalpana",               role: "Co-Founder",          initial: "K" },
  { name: "Shraddhanjali Paikray",           role: "Co-Founder",          initial: "S" },
];

const About = () => {
  return (
    // ✅ No fontFamily on the outer wrapper — Navbar inherits its own styles
    <div style={{ backgroundColor: "#f5f2e8", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ padding: "5rem 1.5rem", textAlign: "center", backgroundColor: "#f5f2e8" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <img src={NestLogo} alt="Hire Nest"
            style={{ width: "15rem", height: "15rem", objectFit: "contain", margin: "0 auto 1.25rem", display: "block",
              filter: "drop-shadow(0 2px 6px rgba(74,103,65,0.12))" }} />
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800,
            color: "#2c2415", letterSpacing: "0.04em", margin: "0 0 1rem" }}>
            About <span style={{ color: "#4a6741" }}>Hire Nest</span>
          </h1>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "#7a6a52", lineHeight: 1.8, margin: 0 }}>
            Hire Nest was built on a simple belief — finding the right job shouldn't be
            overwhelming. We connect career-ready professionals with companies that are
            genuinely hiring, making every match count.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ backgroundColor: "#fdfaf4", borderTop: "1px solid #e0d5c0",
        borderBottom: "1px solid #e0d5c0", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", textAlign: "center" }}>
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "#eaf2e4",
                border: "1px solid #c0d9b0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={22} style={{ color: "#4a6741" }} />
              </div>
              <span style={{ fontFamily: "Georgia, serif", fontSize: "1.8rem", fontWeight: 800, color: "#2c2415" }}>{value}</span>
              <span style={{ fontSize: "0.82rem", color: "#7a6a52", letterSpacing: "0.04em" }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── MISSION ── */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#4a6741", marginBottom: "0.75rem" }}>Our Mission</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.75rem", fontWeight: 700,
              color: "#2c2415", lineHeight: 1.3, margin: "0 0 1rem" }}>
              Bridging talent with opportunity — at scale
            </h2>
            <p style={{ fontSize: "0.92rem", color: "#6b5c45", lineHeight: 1.8, margin: "0 0 1rem" }}>
              The job market is noisy. Candidates spend hours on applications that go nowhere.
              Recruiters wade through hundreds of mismatched resumes. We fix both sides of that problem.
            </p>
            <p style={{ fontSize: "0.92rem", color: "#6b5c45", lineHeight: 1.8, margin: 0 }}>
              By focusing on quality over quantity — curated listings, verified companies, and
              smart matching — Hire Nest gets the right people in front of the right roles, faster.
            </p>
          </div>
          <div style={{ backgroundColor: "#fdfaf4", border: "1px solid #e0d5c0", borderRadius: "20px",
            padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {["Curated, verified job listings only", "Direct recruiter connections", "Real-time application tracking",
              "Privacy-first candidate profiles", "Zero spam, zero ghost jobs"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#4a6741", flexShrink: 0 }} />
                <span style={{ fontSize: "0.88rem", color: "#3c3528", fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#fdfaf4",
        borderTop: "1px solid #e0d5c0", borderBottom: "1px solid #e0d5c0" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.75rem", fontWeight: 700,
            color: "#2c2415", textAlign: "center", marginBottom: "0.5rem" }}>
            What We <span style={{ color: "#4a6741" }}>Stand For</span>
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#7a6a52", textAlign: "center", marginBottom: "3rem" }}>
            The principles that guide every decision we make
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} style={{ padding: "2rem", backgroundColor: "#f5f2e8", border: "1px solid #e0d5c0",
                borderRadius: "16px", transition: "box-shadow 0.2s ease, border-color 0.2s ease" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(74,103,65,0.12)";
                  e.currentTarget.style.borderColor = "#c8b878"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#e0d5c0"; }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "#eaf2e4",
                  border: "1px solid #c0d9b0", display: "flex", alignItems: "center",
                  justifyContent: "center", marginBottom: "1rem" }}>
                  <Icon size={20} style={{ color: "#4a6741" }} />
                </div>
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: 700,
                  color: "#2c2415", marginBottom: "0.5rem" }}>{title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#6b5c45", lineHeight: 1.7, margin: 0 }}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.75rem", fontWeight: 700,
            color: "#2c2415", textAlign: "center", marginBottom: "0.5rem" }}>
            Meet the <span style={{ color: "#4a6741" }}>Team</span>
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#7a6a52", textAlign: "center", marginBottom: "3rem" }}>
            The people behind Hire Nest
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
            {team.map(({ name, role, initial }) => (
              <div key={name} style={{ textAlign: "center", padding: "1.75rem 1rem",
                backgroundColor: "#fdfaf4", border: "1px solid #e0d5c0", borderRadius: "16px",
                transition: "box-shadow 0.2s ease, border-color 0.2s ease" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(74,103,65,0.12)";
                  e.currentTarget.style.borderColor = "#c8b878"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#e0d5c0"; }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "#eaf2e4",
                  border: "2px solid #c0d9b0", display: "flex", alignItems: "center",
                  justifyContent: "center", margin: "0 auto 1rem", fontSize: "1.4rem",
                  fontFamily: "Georgia, serif", fontWeight: 700, color: "#4a6741" }}>
                  {initial}
                </div>
                <p style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "0.9rem",
                  color: "#2c2415", margin: "0 0 4px" }}>{name}</p>
                <p style={{ fontSize: "0.78rem", color: "#4a6741", margin: 0 }}>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "#4a6741", padding: "4rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.8rem", fontWeight: 700,
            color: "#f5f0e6", marginBottom: "0.75rem" }}>
            Ready to find your next role?
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#c8d8b8", marginBottom: "2rem", lineHeight: 1.7 }}>
            Join thousands of professionals who found their dream jobs through Hire Nest.
          </p>
          <Link to="/jobs">
            <button style={{ padding: "0.75rem 2rem", backgroundColor: "#f5f0e6", color: "#3a5a1c",
              fontWeight: 700, fontSize: "0.9rem", borderRadius: "8px", border: "none",
              cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px",
              transition: "background 0.15s ease" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#fffdf5"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#f5f0e6"}>
              Browse Jobs <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;