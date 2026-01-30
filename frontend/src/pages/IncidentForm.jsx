import React, { useState } from 'react';
import { createIncident } from '../services/api';

const IncidentForm = () => {
    const [form, setForm] = useState({
        title: '', description: '', category: 'Other', location: '', reported_by: '', incident_date: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Ensure date is ISO format for backend
        const payload = { ...form, incident_date: new Date(form.incident_date).toISOString() };
        await createIncident(payload);
        alert('Incident Reported!');
        setForm({ title: '', description: '', category: 'Other', location: '', reported_by: '', incident_date: '' });
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-8 rounded shadow mt-10">
            <h2 className="text-2xl font-bold mb-4">Report New Incident</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input className="w-full border p-2 rounded" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
                <textarea className="w-full border p-2 rounded" placeholder="Description (Keywords: fire, critical...)" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
                <select className="w-full border p-2 rounded" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    <option>Delay</option><option>Equipment Failure</option><option>Safety Issue</option><option>Other</option>
                </select>
                <input className="w-full border p-2 rounded" placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} required />
                <input className="w-full border p-2 rounded" placeholder="Reported By" value={form.reported_by} onChange={e => setForm({...form, reported_by: e.target.value})} required />
                <input type="datetime-local" className="w-full border p-2 rounded" value={form.incident_date} onChange={e => setForm({...form, incident_date: e.target.value})} required />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Submit Report</button>
            </form>
        </div>
    );
};

export default IncidentForm;