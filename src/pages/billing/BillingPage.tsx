import { useState } from 'react';
import { Calendar, CreditCard, Download, Filter, Plus, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../lib/utils';

// Mock invoices data
const INVOICES = [
  {
    id: 'INV-001',
    patientName: 'John Smith',
    patientId: '101',
    date: '2024-03-10',
    dueDate: '2024-04-10',
    amount: 800,
    status: 'paid',
    items: [
      { description: 'Root Canal Treatment', amount: 800 }
    ]
  },
  {
    id: 'INV-002',
    patientName: 'Sarah Johnson',
    patientId: '102',
    date: '2024-03-09',
    dueDate: '2024-04-09',
    amount: 1200,
    status: 'pending',
    items: [
      { description: 'Dental Crown', amount: 1200 }
    ]
  },
  {
    id: 'INV-003',
    patientName: 'Michael Brown',
    patientId: '103',
    date: '2024-03-08',
    dueDate: '2024-04-08',
    amount: 300,
    status: 'overdue',
    items: [
      { description: 'Deep Cleaning', amount: 300 }
    ]
  },
];

// Payment statistics
const PAYMENT_STATS = {
  totalRevenue: 25000,
  pendingPayments: 3500,
  overduePayments: 1200,
  averagePaymentTime: 15
};

const BillingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredInvoices = INVOICES.filter((invoice) => {
    const matchesSearch = 
      invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">
            Manage invoices and payments
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors">
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Total Revenue</span>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">${PAYMENT_STATS.totalRevenue}</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Pending Payments</span>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">${PAYMENT_STATS.pendingPayments}</p>
            <p className="text-xs text-muted-foreground">From {INVOICES.length} invoices</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <path d="M12 8v4l3 3" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span className="text-sm font-medium">Overdue Payments</span>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-error">${PAYMENT_STATS.overduePayments}</p>
            <p className="text-xs text-muted-foreground">Past due date</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0" />
              <path d="M12 7v5l3 3" />
            </svg>
            <span className="text-sm font-medium">Average Payment Time</span>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">{PAYMENT_STATS.averagePaymentTime} days</p>
            <p className="text-xs text-muted-foreground">Time to payment</p>
          </div>
        </div>
      </div>

      {/* Invoices List */}
      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search invoices..."
                className="w-full md:w-80 rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
              <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-muted transition-colors">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y">
          {filteredInvoices.map((invoice) => (
            <div key={invoice.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/patients/${invoice.patientId}`}
                        className="font-medium hover:underline"
                      >
                        {invoice.patientName}
                      </Link>
                      <span className="text-sm text-muted-foreground">
                        {invoice.id}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>Issued: {formatDate(invoice.date)}</span>
                      <span className="mx-1">•</span>
                      <span>Due: {formatDate(invoice.dueDate)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">${invoice.amount}</p>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        invoice.status === 'paid'
                          ? 'bg-success/10 text-success'
                          : invoice.status === 'pending'
                          ? 'bg-warning/10 text-warning'
                          : 'bg-error/10 text-error'
                      }`}
                    >
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </div>
                  <button className="inline-flex items-center justify-center rounded-md border border-input bg-background h-8 w-8 hover:bg-muted">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingPage;