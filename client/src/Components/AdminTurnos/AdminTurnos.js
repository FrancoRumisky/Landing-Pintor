import { useMemo, useState } from "react";
import "./AdminTurnos.css";

const STORAGE_KEY = "rd-turnos-demo";
const initialTurnos = [
  { id: 1, date: "2026-09-25", start: "09:00", end: "17:00", client: "Juan Pérez", service: "Pintura de pileta", address: "Córdoba Capital", notes: "Revisar filtración" },
];

function loadTurnos() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || initialTurnos; } catch { return initialTurnos; }
}

export default function AdminTurnos() {
  const [turnos, setTurnos] = useState(loadTurnos);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [form, setForm] = useState({ client: "", service: "Pintura de pileta", date: selectedDate, start: "09:00", end: "17:00", address: "", notes: "" });
  const [editingId, setEditingId] = useState(null);

  const days = useMemo(() => {
    const result = [];
    const base = new Date(`${selectedDate}T12:00:00`);
    base.setDate(1);
    const year = base.getFullYear();
    const month = base.getMonth();
    const firstDay = (base.getDay() + 6) % 7;
    const count = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < firstDay; i += 1) result.push(null);
    for (let day = 1; day <= count; day += 1) result.push(`${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`);
    return result;
  }, [selectedDate]);

  const dayTurnos = turnos.filter((turno) => turno.date === selectedDate).sort((a, b) => a.start.localeCompare(b.start));

  function updateField(event) { setForm({ ...form, [event.target.name]: event.target.value }); }
  function selectDay(date) { if (!date) return; setSelectedDate(date); setForm({ ...form, date }); }
  function resetForm() { setEditingId(null); setForm({ client: "", service: "Pintura de pileta", date: selectedDate, start: "09:00", end: "17:00", address: "", notes: "" }); }
  function saveTurno(event) {
    event.preventDefault();
    if (!form.client.trim() || !form.date) return;
    const next = editingId ? turnos.map((t) => t.id === editingId ? { ...form, id: editingId } : t) : [...turnos, { ...form, id: Date.now() }];
    setTurnos(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setSelectedDate(form.date); resetForm();
  }
  function editTurno(turno) { setEditingId(turno.id); setForm({ ...turno }); }
  function deleteTurno(id) { const next = turnos.filter((t) => t.id !== id); setTurnos(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); if (editingId === id) resetForm(); }

  const monthLabel = new Date(`${selectedDate.slice(0, 7)}-01T12:00:00`).toLocaleDateString("es-AR", { month: "long", year: "numeric" });

  return <main className="admin-turnos">
    <header className="admin-header"><div><span className="admin-eyebrow">RD PINTORES</span><h1>Agenda de turnos</h1><p>Calendario privado del encargado</p></div><button className="admin-secondary" onClick={() => window.location.href = "/"}>Volver al sitio</button></header>
    <section className="admin-layout">
      <div className="calendar-card"><div className="calendar-toolbar"><button onClick={() => setSelectedDate(`${selectedDate.slice(0, 7)}-01`)}>Hoy</button><h2>{monthLabel}</h2><div><button onClick={() => setSelectedDate(new Date(new Date(`${selectedDate}T12:00:00`).setMonth(new Date(`${selectedDate}T12:00:00`).getMonth() - 1)).toISOString().slice(0, 7) + "-01")}>‹</button><button onClick={() => setSelectedDate(new Date(new Date(`${selectedDate}T12:00:00`).setMonth(new Date(`${selectedDate}T12:00:00`).getMonth() + 1)).toISOString().slice(0, 7) + "-01")}>›</button></div></div><div className="weekdays">{["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => <span key={d}>{d}</span>)}</div><div className="calendar-grid">{days.map((date, index) => <button key={index} className={`calendar-day ${date === selectedDate ? "selected" : ""} ${!date ? "empty" : ""}`} onClick={() => selectDay(date)}>{date && <><strong>{Number(date.slice(-2))}</strong>{turnos.some((t) => t.date === date) && <i />}</>}</button>)}</div></div>
      <aside className="day-card"><div className="day-heading"><div><span>TURNOS DEL DÍA</span><h2>{new Date(`${selectedDate}T12:00:00`).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" })}</h2></div><button className="admin-primary" onClick={resetForm}>+ Nuevo</button></div>{dayTurnos.length === 0 ? <p className="empty-state">No hay trabajos agendados para este día.</p> : dayTurnos.map((turno) => <article className="appointment" key={turno.id}><div className="appointment-time">{turno.start}<small>{turno.end}</small></div><div className="appointment-info"><h3>{turno.client}</h3><p>{turno.service}</p><span>{turno.address || "Sin dirección"}</span><div><button onClick={() => editTurno(turno)}>Editar</button><button onClick={() => deleteTurno(turno.id)}>Eliminar</button></div></div></article>)}</aside>
    </section>
    <form className="appointment-form" onSubmit={saveTurno}><h2>{editingId ? "Editar turno" : "Nuevo turno"}</h2><div className="form-grid">{[["client","Cliente","text"],["address","Dirección","text"],["date","Fecha","date"],["start","Inicio","time"],["end","Fin","time"]].map(([name,label,type]) => <label key={name}>{label}<input required={name === "client" || name === "date"} name={name} type={type} value={form[name]} onChange={updateField} /></label>)}<label>Servicio<select name="service" value={form.service} onChange={updateField}><option>Pintura de pileta</option><option>Reparación</option><option>Enfibrado</option><option>Impermeabilización</option><option>Bombas y filtros</option><option>Otro</option></select></label><label className="full">Observaciones<textarea name="notes" value={form.notes} onChange={updateField} rows="3" /></label></div><div className="form-actions"><button type="button" className="admin-secondary" onClick={resetForm}>Limpiar</button><button className="admin-primary" type="submit">{editingId ? "Guardar cambios" : "Guardar turno"}</button></div><p className="mvp-note">MVP local: los turnos se guardan en este navegador. La sincronización con Google Calendar se incorpora en la siguiente etapa.</p></form>
  </main>;
}
