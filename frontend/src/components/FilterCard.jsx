import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { filterData } from "./Filterutils.jsx";

const FilterCard = ({ onApply }) => {
  const [selected, setSelected] = useState({});
  const dispatch = useDispatch();

  const toggle = (name, value) => {
    setSelected(prev => {
      const current = new Set(prev[name] || []);
      if (current.has(value)) current.delete(value);
      else current.add(value);
      return { ...prev, [name]: current };
    });
  };

  const clearAll = () => {
    setSelected({});
    dispatch(setSearchedQuery(""));
  };

  const hasAny = Object.values(selected).some(s => s?.size > 0);

  useEffect(() => {
    const serialized = {};
    Object.entries(selected).forEach(([k, v]) => {
      if (v?.size > 0) serialized[k] = [...v];
    });
    dispatch(setSearchedQuery(
      Object.keys(serialized).length > 0 ? JSON.stringify(serialized) : ""
    ));
  }, [selected, dispatch]);

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#fdfaf4',
      border: '1px solid #e0d5c0',
      borderRadius: '14px',
      padding: '1.25rem',
      boxShadow: '0 1px 4px rgba(74,103,65,0.07)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', fontWeight: 700, color: '#2c2415', margin: 0 }}>
          Filter Jobs
        </h2>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {hasAny && (
            <button onClick={clearAll} style={{
              fontSize: '0.75rem', fontWeight: 600, color: '#e53e3e', background: 'none',
              border: '1px solid #fca5a5', borderRadius: '6px', padding: '2px 10px',
              cursor: 'pointer', transition: 'all 0.15s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fff5f5'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Clear all
            </button>
          )}
          {/* Apply button shown only when triggered from mobile drawer */}
          {onApply && (
            <button onClick={onApply} style={{
              fontSize: '0.75rem', fontWeight: 600, color: '#f5f0e6',
              background: '#3a5a1c', border: 'none', borderRadius: '6px',
              padding: '4px 12px', cursor: 'pointer',
            }}>
              Apply
            </button>
          )}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #e0d5c0', marginBottom: '1rem' }} />

      {filterData.map((group) => (
        <div key={group.name} style={{ marginBottom: '1.25rem' }}>
          <p style={{
            fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.08em', color: '#4a6428', margin: '0 0 0.5rem',
          }}>
            {group.filterType}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {group.array.map((item) => {
              const isChecked = selected[group.name]?.has(item.value) || false;
              return (
                <label key={item.value} style={{
                  display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                  padding: '5px 6px', borderRadius: '6px', transition: 'background-color 0.12s ease',
                  backgroundColor: isChecked ? '#eef5e8' : 'transparent',
                }}
                  onMouseEnter={e => { if (!isChecked) e.currentTarget.style.backgroundColor = '#f5f0e6'; }}
                  onMouseLeave={e => { if (!isChecked) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggle(group.name, item.value)}
                    style={{ width: '15px', height: '15px', accentColor: '#4a6741', cursor: 'pointer', flexShrink: 0 }}
                  />
                  <span style={{
                    fontSize: '0.85rem',
                    color: isChecked ? '#2c3e1f' : '#4a3f2f',
                    fontWeight: isChecked ? 600 : 400,
                  }}>
                    {item.label}
                  </span>
                </label>
              );
            })}
          </div>
          <div style={{ borderTop: '1px solid #e0d5c0', marginTop: '0.75rem' }} />
        </div>
      ))}
    </div>
  );
};

export default FilterCard;