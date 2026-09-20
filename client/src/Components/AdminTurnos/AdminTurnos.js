import { useEffect, useMemo, useRef, useState } from "react";
import "./AdminTurnos.css";

const GOOGLE_CLIENT_ID = "74649942161-hnf3l457o5386vfe52nic8imja77l1u7.apps.googleusercontent.com";
const CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar";
const ALLOWED_EMAILS = ["framqoo@gmail.com", "danielrumisky@gmail.com"];
const GOOGLE_SCRIPT_ID = "google-gsi-script";
const CALENDAR_ID = "primary";
const TIME_ZONE = "America/Argentina/Cordoba";

const emptyForm = (date) => ({
  client: "",
  service: "Pintura de pileta",
  date,
  start: "09:00",
  end: "17:00",
  address: "",
  notes: "",
});

function loadGoogleIdentityScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.oauth2) return resolve();
    const existing = document.getElementById(GOOGLE_SCRIPT_ID);
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.id = GOOGLE_SCRIPT_ID;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function monthRange(date) {
  const base = new Date(`${date}T12:00:00`);
  const year = base.getFullYear();
  const month = base.getMonth();
  return {
    start: new Date(year, month, 1, 0, 0, 0),
    end: new Date(year, month + 1, 1, 0, 0, 0),
  };
}

function toLocalDateTime(date, time) {
  return `${date}T${time}:00`;
}

function eventToForm(event) {
  const start = event.start?.dateTime || "";
  const end = event.end?.dateTime || "";
  return {
    client: event.summary || "",
    service: event.extendedProperties?.private?.service || "Pintura de pileta",
    date: start.slice(0, 10),
    start: start.slice(11, 16),
    end: end.slice(11, 16),
    address: event.location || "",
    notes: event.description || "",
  };
}

function calendarEvent(form) {
  return {
    summary: form.client,
    location: form.address || undefined,
    description: form.notes || "",
    start: {
      dateTime: toLocalDateTime(form.date, form.start),
      timeZone: TIME_ZONE,
    },
    end: {
      dateTime: toLocalDateTime(form.date, form.end),
      timeZone: TIME_ZONE,
    },
    extendedProperties: {
      private: {
        service: form.service,
        source: "rd-pintores-admin",
      },
    },
  };
}

async function googleFetch(path, token, options = {}) {
  const response = await fetch(`https://www.googleapis.com/calendar/v3${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google Calendar (${response.status}): ${body}`);
  }
  if (response.status === 204) return null;
  return response.json();
}

export default function AdminTurnos() {
  const [accessToken, setAccessToken] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [authError, setAuthError] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [form, setForm] = useState(emptyForm(new Date().toISOString().slice(0, 10)));
  const [editingId, setEditingId] = useState(null);
  const tokenClient = useRef(null);

  useEffect(() => {
    loadGoogleIdentityScript().catch(() => setAuthError("No se pudo cargar el inicio de sesión de Google."));
  }, []);

  useEffect(() => {
    if (!window.google?.accounts?.oauth2) return;
    tokenClient.current = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: `openid email profile ${CALENDAR_SCOPE}`,
      callback: async (response) => {
        if (response.error) {
          setAuthError(response.error_description || "Google rechazó la autorización.");
          return;
        }
        try {
          const info = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${response.access_token}` },
          });
          const profile = await info.json();
          const email = (profile.email || "").toLowerCase();
          if (!ALLOWED_EMAILS.includes(email)) {
            window.google.accounts.oauth2.revoke(response.access_token);
            setAuthError(`La cuenta ${email || "seleccionada"} no está autorizada para esta agenda.`);
            return;
          }
          setAuthError("");
          setUserEmail(email);
          setAccessToken(response.access_token);
        } catch {
          setAuthError("No se pudo verificar la cuenta de Google.");
        }
      },
    });
  }, []);

  const requestLogin = () => {
    setAuthError("");
    if (!tokenClient.current) {
      setAuthError("Google todavía no está listo. Probá nuevamente en unos segundos.");
      return;
    }
    tokenClient.current.requestAccessToken({ prompt: "select_account" });
  };

  const logout = () => {
    if (accessToken && window.google?.accounts?.oauth2) {
      window.google.accounts.oauth2.revoke(accessToken);
    }
    setAccessToken(null);
    setUserEmail("");
    setEvents([]);
    setMessage("");
  };

  const loadEvents = async () => {
    if (!accessToken) return;
    setLoading(true);
    setMessage("");
    try {
      const { start, end } = monthRange(selectedDate);
      const params = new URLSearchParams({
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        singleEvents: "true",
        orderBy: "startTime",
        maxResults: "2500",
      });
      const data = await googleFetch(`/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${params}`, accessToken);
      setEvents(data.items || []);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) loadEvents();
  }, [accessToken, selectedDate.slice(0, 7)]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const dayEvents = events
    .filter((event) => (event.start?.dateTime || "").slice(0, 10) === selectedDate)
    .sort((a, b) => (a.start?.dateTime || "").localeCompare(b.start?.dateTime || ""));

  const monthLabel = new Date(`${selectedDate.slice(0, 7)}-01T12:00:00`).toLocaleDateString("es-AR", { month: "long", year: "numeric" });

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function selectDay(date) {
    if (!date) return;
    setSelectedDate(date);
    setForm((current) => ({ ...current, date }));
    setMessage("");
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm(selectedDate));
  }

  function editEvent(event) {
    setEditingId(event.id);
    setForm(eventToForm(event));
    setMessage("");
  }

  async function saveTurno(event) {
    event.preventDefault();
    if (!accessToken || !form.client.trim() || !form.date) return;
    if (form.end <= form.start) {
      setMessage("La hora de finalización debe ser posterior a la de inicio.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const payload = calendarEvent(form);
      if (editingId) {
        await googleFetch(`/calendars/${encodeURIComponent(CALENDAR_ID)}/events/${encodeURIComponent(editingId)}`, accessToken, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await googleFetch(`/calendars/${encodeURIComponent(CALENDAR_ID)}/events`, accessToken, {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      await loadEvents();
      setSelectedDate(form.date);
      resetForm();
      setMessage(editingId ? "Turno actualizado." : "Turno creado en Google Calendar.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTurno(id) {
    if (!window.confirm("¿Eliminar este turno de Google Calendar?")) return;
    setLoading(true);
    setMessage("");
    try {
      await googleFetch(`/calendars/${encodeURIComponent(CALENDAR_ID)}/events/${encodeURIComponent(id)}`, accessToken, { method: "DELETE" });
      setEvents((current) => current.filter((item) => item.id !== id));
      if (editingId === id) resetForm();
      setMessage("Turno eliminado.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (!accessToken) {
    return (
      <main className="admin-turnos admin-login">
        <section className="login-card">
          <span className="admin-eyebrow">RD PINTORES</span>
          <h1>Agenda de turnos</h1>
          <p>Ingresá con una cuenta autorizada para administrar los trabajos.</p>
          <button className="admin-primary google-login" onClick={requestLogin}>Continuar con Google</button>
          {authError && <p className="auth-error">{authError}</p>}
          <button className="admin-secondary" onClick={() => window.location.href = "/"}>Volver al sitio</button>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-turnos">
      <header className="admin-header">
        <div><span className="admin-eyebrow">RD PINTORES</span><h1>Agenda de turnos</h1><p>Google Calendar · {userEmail}</p></div>
        <div className="admin-header-actions"><button className="admin-secondary" onClick={logout}>Cerrar sesión</button><button className="admin-secondary" onClick={() => window.location.href = "/"}>Volver al sitio</button></div>
      </header>
      {message && <div className="admin-message">{message}</div>}
      <section className="admin-layout">
        <div className="calendar-card">
          <div className="calendar-toolbar">
            <button onClick={() => setSelectedDate(new Date().toISOString().slice(0, 10))}>Hoy</button>
            <h2>{monthLabel}</h2>
            <div>
              <button onClick={() => { const d = new Date(`${selectedDate}T12:00:00`); d.setMonth(d.getMonth() - 1); setSelectedDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`); }}>‹</button>
              <button onClick={() => { const d = new Date(`${selectedDate}T12:00:00`); d.setMonth(d.getMonth() + 1); setSelectedDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`); }}>›</button>
            </div>
          </div>
          <div className="weekdays">{["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => <span key={d}>{d}</span>)}</div>
          <div className="calendar-grid">
            {days.map((date, index) => (
              <button key={index} className={`calendar-day ${date === selectedDate ? "selected" : ""} ${!date ? "empty" : ""}`} onClick={() => selectDay(date)}>
                {date && <><strong>{Number(date.slice(-2))}</strong>{events.some((item) => (item.start?.dateTime || "").slice(0, 10) === date) && <i />}</>}
              </button>
            ))}
          </div>
        </div>
        <aside className="day-card">
          <div className="day-heading">
            <div><span>TURNOS DEL DÍA</span><h2>{new Date(`${selectedDate}T12:00:00`).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" })}</h2></div>
            <button className="admin-primary" onClick={resetForm}>+ Nuevo</button>
          </div>
          {loading && <p className="empty-state">Sincronizando...</p>}
          {!loading && dayEvents.length === 0 && <p className="empty-state">No hay trabajos agendados para este día.</p>}
          {dayEvents.map((turno) => (
            <article className="appointment" key={turno.id}>
              <div className="appointment-time">{turno.start.dateTime.slice(11, 16)}<small>{turno.end?.dateTime?.slice(11, 16)}</small></div>
              <div className="appointment-info">
                <h3>{turno.summary}</h3>
                <p>{turno.extendedProperties?.private?.service || "Trabajo"}</p>
                <span>{turno.location || "Sin dirección"}</span>
                <div><button onClick={() => editEvent(turno)}>Editar</button><button onClick={() => deleteTurno(turno.id)}>Eliminar</button></div>
              </div>
            </article>
          ))}
        </aside>
      </section>
      <form className="appointment-form" onSubmit={saveTurno}>
        <h2>{editingId ? "Editar turno" : "Nuevo turno"}</h2>
        <div className="form-grid">
          {[["client", "Cliente", "text"], ["address", "Dirección", "text"], ["date", "Fecha", "date"], ["start", "Inicio", "time"], ["end", "Fin", "time"]].map(([name, label, type]) => <label key={name}>{label}<input required={name === "client" || name === "date"} name={name} type={type} value={form[name]} onChange={updateField} /></label>)}
          <label>Servicio<select name="service" value={form.service} onChange={updateField}><option>Pintura de pileta</option><option>Reparación</option><option>Enfibrado</option><option>Impermeabilización</option><option>Bombas y filtros</option><option>Otro</option></select></label>
          <label className="full">Observaciones<textarea name="notes" value={form.notes} onChange={updateField} rows="3" /></label>
        </div>
        <div className="form-actions"><button type="button" className="admin-secondary" onClick={resetForm}>Limpiar</button><button className="admin-primary" type="submit" disabled={loading}>{editingId ? "Guardar cambios" : "Guardar turno"}</button></div>
        <p className="mvp-note">Los turnos se guardan y sincronizan directamente con el Google Calendar de la cuenta autorizada.</p>
      </form>
    </main>
  );
}
