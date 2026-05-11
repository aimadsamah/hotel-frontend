'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, MailOpen, Trash2, Reply } from 'lucide-react';
import { useGetContactsQuery, useUpdateContactMutation, useDeleteContactMutation } from '@/features/api/apiSlice';
import { Skeleton, Badge } from '@/components/ui';
import type { ContactMessage } from '@/types';
import { useI18n } from '@/i18n/context';

export default function AdminMessagesPage() {
  const { t, isRTL } = useI18n();
  const [statusFilter, setStatusFilter] = useState('');
  const { data, isLoading } = useGetContactsQuery(statusFilter ? { status: statusFilter } : {});
  const [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const contacts: ContactMessage[] = data?.data?.contacts || [];
  const unreadCount = data?.data?.unreadCount || 0;
  const badgeVariant = (s: string) => s==='unread'?'warning' as const:s==='replied'?'success' as const:'neutral' as const;

  const handleMarkRead = async (id: string) => { try { await updateContact({ id, status: 'read' }).unwrap(); toast.success(t.admin.markRead); } catch { toast.error('Échec'); }};
  const handleMarkReplied = async (id: string) => { try { await updateContact({ id, status: 'replied' }).unwrap(); toast.success(t.admin.markReplied); } catch { toast.error('Échec'); }};
  const handleDelete = async (id: string) => { try { await deleteContact(id).unwrap(); toast.success('Supprimé'); setDeleteConfirm(null); if(expanded===id)setExpanded(null); } catch { toast.error('Échec'); }};

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="section-label mb-2">{t.admin.managementLabel}</p>
          <h1 className="font-display text-4xl font-light text-cream-50">{t.admin.messagesTitle}</h1>
          <div className="gold-divider" />
          {unreadCount > 0 && <p className="font-mono text-xs text-gold-400">{unreadCount} {t.admin.unreadMessages2}</p>}
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {['', 'unread', 'read', 'replied'].map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`font-mono text-[10px] tracking-widest uppercase px-4 py-2 border transition-all ${statusFilter===s?'border-gold-500 bg-gold-500/10 text-gold-400':'border-obsidian-700 text-obsidian-400 hover:border-obsidian-500'}`}>
            {s || t.admin.all}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {isLoading ? Array.from({length:5}).map((_,i)=><Skeleton key={i} className="h-16"/>)
        : contacts.length===0 ? (
          <div className="bg-obsidian-900 border border-obsidian-800 p-12 text-center">
            <Mail className="w-8 h-8 text-obsidian-600 mx-auto mb-3" />
            <p className="font-sans text-sm text-obsidian-500">{t.admin.noMessagesFound}</p>
          </div>
        ) : contacts.map((contact) => (
          <div key={contact._id} className={`bg-obsidian-900 border transition-all duration-200 ${contact.status==='unread'?'border-gold-500/30':'border-obsidian-800'}`}>
            <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-obsidian-800/40 transition-colors" onClick={()=>setExpanded(expanded===contact._id?null:contact._id)} dir={isRTL?'rtl':'ltr'}>
              <div className="flex items-center gap-4 min-w-0">
                <div className={`w-8 h-8 flex items-center justify-center shrink-0 ${contact.status==='unread'?'text-gold-400':'text-obsidian-500'}`}>
                  {contact.status==='unread'?<Mail className="w-4 h-4"/>:<MailOpen className="w-4 h-4"/>}
                </div>
                <div className="min-w-0">
                  <p className={`font-sans text-sm ${contact.status==='unread'?'text-cream-100 font-medium':'text-obsidian-300'}`}>{contact.name} <span className="text-obsidian-500 font-normal">— {contact.email}</span></p>
                  <p className="font-sans text-xs text-obsidian-400 truncate">{contact.subject}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ms-4">
                <span className="font-mono text-[10px] text-obsidian-500 hidden sm:block">{new Date(contact.createdAt).toLocaleDateString()}</span>
                <Badge variant={badgeVariant(contact.status)}>{contact.status}</Badge>
              </div>
            </div>

            {expanded===contact._id && (
              <div className="px-5 pb-5 border-t border-obsidian-800" dir={isRTL?'rtl':'ltr'}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 mb-4 border-b border-obsidian-800">
                  <div><p className="font-mono text-[10px] text-gold-500 uppercase tracking-widest mb-1">{t.admin.from}</p><p className="font-sans text-sm text-cream-100">{contact.name}</p><p className="font-mono text-xs text-obsidian-400">{contact.email}</p>{contact.phone&&<p className="font-mono text-xs text-obsidian-400">{contact.phone}</p>}</div>
                  <div><p className="font-mono text-[10px] text-gold-500 uppercase tracking-widest mb-1">{t.admin.subject}</p><p className="font-sans text-sm text-cream-100">{contact.subject}</p></div>
                  <div><p className="font-mono text-[10px] text-gold-500 uppercase tracking-widest mb-1">{t.admin.received}</p><p className="font-sans text-sm text-cream-200">{new Date(contact.createdAt).toLocaleString()}</p></div>
                </div>
                <div className="mb-6">
                  <p className="font-mono text-[10px] text-gold-500 uppercase tracking-widest mb-2">{t.admin.message}</p>
                  <p className="font-sans text-sm text-obsidian-300 leading-relaxed whitespace-pre-wrap">{contact.message}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {contact.status==='unread'&&<button onClick={()=>handleMarkRead(contact._id)} className="btn-ghost text-[10px]"><MailOpen className="w-3.5 h-3.5"/>{t.admin.markRead}</button>}
                  {contact.status!=='replied'&&<button onClick={()=>handleMarkReplied(contact._id)} className="btn-ghost text-[10px]"><Reply className="w-3.5 h-3.5"/>{t.admin.markReplied}</button>}
                  <a href={`mailto:${contact.email}?subject=Re: ${contact.subject}`} className="btn-outline text-[10px] py-2 px-4" onClick={()=>handleMarkReplied(contact._id)}>{t.admin.replyEmail}</a>
                  {deleteConfirm===contact._id?(
                    <div className="flex gap-2">
                      <button onClick={()=>handleDelete(contact._id)} className="btn-ghost text-[10px] text-red-400">{t.admin.confirmDelete}</button>
                      <button onClick={()=>setDeleteConfirm(null)} className="btn-ghost text-[10px]">{t.admin.cancel}</button>
                    </div>
                  ):(
                    <button onClick={()=>setDeleteConfirm(contact._id)} className="btn-ghost text-[10px] text-obsidian-400 hover:text-red-400"><Trash2 className="w-3.5 h-3.5"/>{t.admin.delete}</button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
