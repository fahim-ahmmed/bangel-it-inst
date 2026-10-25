'use client';
import { Label } from '@gravity-ui/uikit';

export default function StatusLabel({ status, seatsLeft, tr }) {
  if (status === 'enrolling') return <Label theme="success" size="m">{tr('ভর্তি চলছে', 'Enrolling Now')}{seatsLeft > 0 ? ` · ${tr(`${seatsLeft}টি আসন বাকি`, `${seatsLeft} seats left`)}` : ''}</Label>;
  if (status === 'full') return <Label theme="danger" size="m">{tr('ব্যাচ পূর্ণ · অপেক্ষমাণ তালিকা', 'Batch Full · Waitlist')}</Label>;
  return <Label theme="warning" size="m">{tr('শীঘ্রই শুরু', 'Coming Soon')}</Label>;
}
