'use client';

import { Button } from '@/components/ui/button';
import { WalletButton } from '@/components/wallet-button';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  onMenuClick?: () => void;
  showMenu?: boolean;
}

export function Navbar({ onMenuClick, showMenu = false }: NavbarProps) {
  const pathname = usePathname();
  
  const isLanding = pathname === '/';
  
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {/* Menu button for mobile */}
          {showMenu && onMenuClick && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="md:hidden"
            >
              <Menu className="h-5 w-5 text-foreground" />
            </Button>
          )}
          
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src="/growi-logo-full.png"
                alt="GROWI"
                width={140}
                height={45}
                className="h-10 w-auto md:h-11"
                priority
              />
            </motion.div>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          {isLanding && (
            <Link href="/login">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-growi-blue text-white hover:bg-growi-blue/90">
                  Start Now
                </Button>
              </motion.div>
            </Link>
          )}
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
