// frontend/app/layout.tsx
import './globals.css';
import Sidebar from '@/app/components/Sidebar';
import Header from '@/app/components/Header';


export const metadata = {
  title: 'XV CRM',
  description: 'Your custom CRM system',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: 1, padding: '1rem' }}>
            <Header />
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
