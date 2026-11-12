import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { WHATSAPP_NUMBER } from '@/data/site';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildWhatsAppUrl(message: string, phone: string = WHATSAPP_NUMBER): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const encoded = encodeURIComponent(message);
  return cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encoded}`
    : `https://api.whatsapp.com/send?text=${encoded}`;
}

export function formatBRL(value: number): string {
  return `R$ ${value}`;
}

