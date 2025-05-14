  // frontend/app/components/Sidebar.tsx
  'use client';

  import Link from 'next/link';
  import { usePathname } from 'next/navigation';

  const menuItems = [
    { name: 'Dashboard', href: '/' },
    { name: 'Клиенты', href: '/clients' },
    { name: 'Сделки', href: '/deals' },
    { name: 'Задачи', href: '/tasks' },
  ];

  export default function Sidebar() {
    const pathname = usePathname();

    return (
      <aside style={{ width: 200, background: '#f3f4f6', padding: 20, height: '100vh' }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: 20 }}>XV CRM</h2>
        <nav>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'block',
                marginBottom: 12,
                color: pathname === item.href ? '#2563eb' : '#111827',
                fontWeight: pathname === item.href ? 'bold' : 'normal',
              }}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    );
  }
