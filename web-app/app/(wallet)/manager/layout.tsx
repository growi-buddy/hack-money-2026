'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { Navbar } from '@/components/navbar';
import React, { PropsWithChildren, useState } from 'react';

export default function ClientLayoutContent({ children }: PropsWithChildren) {
  const [ sidebarOpen, setSidebarOpen ] = useState(false);
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar
        showMenu
        onMenuClick={() => setSidebarOpen(true)}
      />
      
      <AppSidebar
        type="manager"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <main className="flex-1 overflow-y-auto p-4 md:ml-56 md:p-6 lg:ml-64">
        {children}
      </main>
    </div>
  );
}
