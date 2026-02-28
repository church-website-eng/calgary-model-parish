"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function VisitForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "1",
    questions: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      // silently handle
    }
    setSubmitted(true);
  };

  return (
    <div>
      <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
        Register Your Visit
      </h2>
      {submitted ? (
        <Card className="p-8 text-center">
          <div className="mb-4 text-4xl">&#127881;</div>
          <h3 className="mb-2 font-serif text-xl font-bold text-primary">
            Welcome!
          </h3>
          <p className="text-muted">
            Thank you for registering. We look forward to welcoming
            you to Calgary Model Parish. Someone from our welcoming team
            will reach out to you. God bless!
          </p>
        </Card>
      ) : (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="vname" className="mb-1 block text-sm font-medium">Name</label>
              <input id="vname" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
            </div>
            <div>
              <label htmlFor="vemail" className="mb-1 block text-sm font-medium">Email</label>
              <input id="vemail" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
            </div>
            <div>
              <label htmlFor="vphone" className="mb-1 block text-sm font-medium">Phone</label>
              <input id="vphone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
            </div>
            <div>
              <label htmlFor="vdate" className="mb-1 block text-sm font-medium">Planned Visit Date</label>
              <input id="vdate" type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
            </div>
            <div>
              <label htmlFor="vguests" className="mb-1 block text-sm font-medium">Number of Guests</label>
              <select id="vguests" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                {[1, 2, 3, 4, 5, "6+"].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="vquestions" className="mb-1 block text-sm font-medium">Questions (optional)</label>
              <textarea id="vquestions" rows={3} value={form.questions} onChange={(e) => setForm({ ...form, questions: e.target.value })} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
            </div>
            <Button type="submit" variant="accent" size="lg" className="w-full">
              Register My Visit
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
