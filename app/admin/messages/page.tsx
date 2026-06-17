"use client";

import { useState, useEffect } from "react";
import { getAdminMessages, updateMessageStatus, deleteMessage } from "../../actions/messages";
import { 
  Mail, 
  Search, 
  Trash2, 
  Loader2, 
  CheckCircle2,
  AlertCircle,
  X,
  Reply,
  Check,
  Clock
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { MessageStatus } from "@prisma/client";
import { useToast } from "@/components/ui/Toast";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { AdminMessage } from "@/types/admin";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | MessageStatus>("ALL");
  const [selectedMessage, setSelectedMessage] = useState<AdminMessage | null>(null);

  const { success, error } = useToast();
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string }>({
    isOpen: false,
    id: ""
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const loadMessages = async () => {
    setIsLoading(true);
    const data = await getAdminMessages();
    setMessages(data as unknown as AdminMessage[]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleStatusChange = async (id: string, newStatus: MessageStatus) => {
    const res = await updateMessageStatus(id, newStatus);
    if (res.success) {
      setMessages(messages.map(m => m.id === id ? { ...m, status: newStatus } : m));
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
      success(`Status pesan diperbarui menjadi ${newStatus}.`);
    } else {
      error(res.error || "Gagal memperbarui status.");
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const executeDelete = async () => {
    setIsDeleting(true);
    const res = await deleteMessage(deleteConfirm.id);
    if (res.success) {
      setMessages(messages.filter(m => m.id !== deleteConfirm.id));
      if (selectedMessage && selectedMessage.id === deleteConfirm.id) {
        setSelectedMessage(null);
      }
      success("Pesan berhasil dihapus.");
    } else {
      error(res.error || "Gagal menghapus pesan.");
    }
    setIsDeleting(false);
    setDeleteConfirm({ isOpen: false, id: "" });
  };

  const filteredMessages = messages.filter(m => 
    (filterStatus === "ALL" || m.status === filterStatus) &&
    (m.senderName.toLowerCase().includes(searchQuery.toLowerCase()) || 
     m.senderEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
     (m.subject && m.subject.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Message Center</h1>
          <p className="text-gray-400">Total {messages.length} pesan masuk</p>
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-dark border border-white/5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex bg-surface-dark p-1 rounded-xl border border-white/5">
          {["ALL", "UNREAD", "READ", "RESPONDED"].map((status) => (
            <button 
              key={status}
              onClick={() => setFilterStatus(status as any)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                filterStatus === status 
                  ? "bg-white/10 text-primary" 
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative items-start">
        {/* Messages List */}
        <div className="lg:col-span-2 space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
          ) : filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => (
              <div 
                key={msg.id} 
                onClick={() => {
                  setSelectedMessage(msg);
                  if (msg.status === "UNREAD") {
                    handleStatusChange(msg.id, "READ");
                  }
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group ${
                  selectedMessage?.id === msg.id 
                    ? "bg-primary/5 border-primary/30 shadow-neon" 
                    : "bg-surface-dark border-white/5 hover:border-primary/20"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                      ${msg.status === 'UNREAD' ? 'bg-red-500/10 text-red-500' : 'bg-background-dark text-gray-400 border border-white/10'}`}>
                      {msg.senderName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className={`font-bold ${msg.status === 'UNREAD' ? 'text-white' : 'text-gray-300'}`}>
                        {msg.senderName}
                      </h3>
                      <p className="text-xs text-gray-500">{msg.senderEmail}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                  </span>
                </div>
                
                <div className="ml-13 mt-2">
                  <p className={`text-sm mb-1 ${msg.status === 'UNREAD' ? 'text-gray-200 font-semibold' : 'text-gray-400'}`}>
                    {msg.subject || "No Subject"}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {msg.message}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-4 ml-13">
                  {msg.status === 'UNREAD' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-500/10 text-red-400 text-[10px] font-bold tracking-wider uppercase">
                      <AlertCircle className="w-3 h-3" /> Unread
                    </span>
                  ) : msg.status === 'READ' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold tracking-wider uppercase">
                      Read
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-500/10 text-green-400 text-[10px] font-bold tracking-wider uppercase">
                      <CheckCircle2 className="w-3 h-3" /> Responded
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
             <div className="bg-surface-dark rounded-2xl border border-white/5 p-20 text-center">
                <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4 opacity-50" />
                <h2 className="text-xl font-bold text-white mb-2">No messages found</h2>
                <p className="text-gray-500">
                  {searchQuery || filterStatus !== "ALL" 
                    ? "Try adjusting your search or filters." 
                    : "You haven't received any messages yet."}
                </p>
             </div>
          )}
        </div>

        {/* Message Detail Panel */}
        <div className="lg:sticky lg:top-8 h-[calc(100vh-8rem)]">
          {selectedMessage ? (
            <div className="h-full flex flex-col bg-surface-dark border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-white/5 flex justify-between items-start bg-background-dark/50">
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">{selectedMessage.subject || "No Subject"}</h2>
                  <div className="flex items-center gap-3">
                     <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                      {selectedMessage.senderName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-white">{selectedMessage.senderName}</p>
                      <a href={`mailto:${selectedMessage.senderEmail}`} className="text-sm text-primary hover:underline">
                        {selectedMessage.senderEmail}
                      </a>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 rounded-lg hover:bg-white/5 text-gray-400 lg:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 flex-1 overflow-y-auto">
                <div className="flex items-center gap-2 mb-6 text-xs text-gray-500 font-semibold tracking-wider uppercase">
                  <Clock className="w-4 h-4" /> 
                  {new Date(selectedMessage.createdAt).toLocaleString('id-ID', {
                    dateStyle: 'full', timeStyle: 'short'
                  })}
                </div>
                <div className="prose prose-invert prose-sm max-w-none">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-white/5 bg-background-dark/50 flex flex-wrap gap-3">
                <a 
                  href={`mailto:${selectedMessage.senderEmail}?subject=Re: ${selectedMessage.subject || "Your Message"}`}
                  className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-background-dark font-bold hover:bg-primary/90 transition-all shadow-neon"
                >
                  <Reply className="w-4 h-4" /> Reply
                </a>
                
                {selectedMessage.status !== 'RESPONDED' && (
                  <button 
                    onClick={() => handleStatusChange(selectedMessage.id, "RESPONDED")}
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-green-500/30 text-green-500 hover:bg-green-500/10 font-bold transition-all"
                  >
                    <Check className="w-4 h-4" /> Mark Responded
                  </button>
                )}

                <button 
                  onClick={() => confirmDelete(selectedMessage.id)}
                  className="px-4 py-3 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all flex items-center justify-center"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-surface-dark border border-dashed border-white/10 rounded-2xl p-8 text-center text-gray-500">
              <Mail className="w-16 h-16 mb-4 opacity-20" />
              <p>Select a message to read details</p>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Hapus Pesan"
        message="Apakah Anda yakin ingin menghapus pesan ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Hapus"
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, id: "" })}
        isLoading={isDeleting}
      />
    </div>
  );
}
