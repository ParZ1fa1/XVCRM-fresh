// frontend/app/components/Header.tsx
'use client';

export default function Header() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>Панель CRM</h1>
      </div>
      <div>
        <span>Привет, Admin</span>
      </div>
    </header>
  );
}
