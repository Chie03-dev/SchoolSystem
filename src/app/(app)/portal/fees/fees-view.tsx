"use client";

import { useState } from "react";
import { CreditCard, Landmark, Receipt, ShieldCheck, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SegmentedControl } from "@/components/portal/segmented-control";
import { StatCard } from "@/components/portal/stat-card";
import { StatusChip } from "@/components/portal/status-chip";
import { feeStatement, student } from "@/data/student";
import { formatPHP } from "@/lib/format";

const studentSchool = student.school;
const studentName = `${student.firstName} ${student.lastName}`;
const studentId = student.id;

const methods = [
  {
    value: "gcash",
    label: "GCash",
    icon: Smartphone,
    note: "Instant · funds post within minutes",
  },
  {
    value: "card",
    label: "Card",
    icon: CreditCard,
    note: "Visa / Mastercard · 0% service fee",
  },
  {
    value: "otc",
    label: "Over the counter",
    icon: Landmark,
    note: "Cashier's office · Mon–Fri 8AM–4PM",
  },
] as const;

const statusTone = {
  paid: "ok",
  partial: "warn",
  pending: "danger",
} as const;

const statusLabel = {
  paid: "Paid",
  partial: "Partial",
  pending: "Pending",
} as const;

export function FeesView() {
  const [payOpen, setPayOpen] = useState(false);
  const [method, setMethod] = useState<(typeof methods)[number]["value"]>("gcash");

  const paidPercent = Math.round(
    (feeStatement.totalPaid / feeStatement.totalBilled) * 100
  );

  return (
    <div className="space-y-6">
      <div className="print-only">
        <p className="font-display text-xl font-semibold">{studentSchool}</p>
        <p className="text-sm">
          Statement of Account · {feeStatement.schoolYear}
        </p>
        <p className="text-sm text-ink-muted">
          {studentName} · Student ID {studentId}
        </p>
      </div>

      <Reveal className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Fees &amp; statement
          </h2>
          <p className="mt-1 text-sm text-ink-muted">{feeStatement.schoolYear}</p>
        </div>
        <div data-print-hide className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.success("Statement downloaded", {
                description: "SOA-2026-0148.pdf — demo only, no file was generated.",
              })
            }
          >
            <Receipt aria-hidden />
            Statement
          </Button>
          <Button size="sm" onClick={() => setPayOpen(true)}>
            Pay {formatPHP(feeStatement.balance)}
          </Button>
        </div>
      </Reveal>

      <section className="grid gap-4 sm:grid-cols-3">
        <Reveal>
          <StatCard
            label="Total billed"
            value={formatPHP(feeStatement.totalBilled)}
            hint="4 items this quarter"
          />
        </Reveal>
        <Reveal delay={0.05}>
          <StatCard
            label="Total paid"
            value={formatPHP(feeStatement.totalPaid)}
            hint={`${paidPercent}% settled`}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <StatCard
            label="Balance"
            value={formatPHP(feeStatement.balance)}
            hint={`Due ${feeStatement.nextDue}`}
          />
        </Reveal>
      </section>

      <Reveal delay={0.15} className="rounded-xl border border-hairline bg-surface p-4 shadow-warm">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Settlement progress</span>
          <span className="tabular-nums text-ink-muted">{paidPercent}%</span>
        </div>
        <div
          className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface-2"
          role="progressbar"
          aria-valuenow={paidPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Settlement progress"
        >
          <div className="h-full rounded-full bg-clay" style={{ width: `${paidPercent}%` }} />
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal delay={0.05} className="rounded-xl border border-hairline bg-surface shadow-warm lg:col-span-2">
          <div className="border-b border-hairline px-4 py-3">
            <h3 className="font-display text-lg font-semibold">Statement of account</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <caption className="sr-only">Itemized fees for {feeStatement.schoolYear}</caption>
              <thead>
                <tr className="border-b border-hairline text-left">
                  <th scope="col" className="px-4 py-2 text-xs font-semibold text-ink-muted">
                    Item
                  </th>
                  <th scope="col" className="px-2 py-2 text-xs font-semibold text-ink-muted">
                    Due
                  </th>
                  <th scope="col" className="px-2 py-2 text-right text-xs font-semibold text-ink-muted">
                    Amount
                  </th>
                  <th scope="col" className="px-4 py-2 text-xs font-semibold text-ink-muted">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {feeStatement.items.map((item) => (
                  <tr key={item.label} className="border-b border-hairline last:border-0">
                    <td className="px-4 py-2.5">
                      <p className="font-medium">{item.label}</p>
                      {item.note ? (
                        <p className="text-[11px] text-ink-faint">{item.note}</p>
                      ) : null}
                    </td>
                    <td className="px-2 py-2.5 whitespace-nowrap text-ink-muted">{item.due}</td>
                    <td className="px-2 py-2.5 text-right font-semibold tabular-nums">
                      {formatPHP(item.amount)}
                    </td>
                    <td className="px-4 py-2.5">
                      <StatusChip tone={statusTone[item.status]}>
                        {statusLabel[item.status]}
                      </StatusChip>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-hairline-strong">
                  <td className="px-4 py-2.5 font-semibold" colSpan={2}>
                    Balance
                  </td>
                  <td className="px-2 py-2.5 text-right font-display text-lg font-semibold tabular-nums text-clay">
                    {formatPHP(feeStatement.balance)}
                  </td>
                  <td className="px-4 py-2.5">
                    <StatusChip tone="danger">Unpaid</StatusChip>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.1} className="rounded-xl border border-hairline bg-surface shadow-warm">
            <div className="border-b border-hairline px-4 py-3">
              <h3 className="font-display text-lg font-semibold">Payment history</h3>
            </div>
            <ul className="divide-y divide-hairline">
              {feeStatement.payments.map((payment) => (
                <li key={payment.or} className="flex items-center gap-3 px-4 py-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-sage/12 text-sage-deep">
                    <Receipt className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{payment.label}</p>
                    <p className="font-mono text-[11px] text-ink-faint">{payment.or}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold tabular-nums">{formatPHP(payment.amount)}</p>
                    <p className="text-[11px] text-ink-muted">{payment.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="rounded-xl border border-hairline bg-surface-2/60 p-4">
            <h3 className="font-display flex items-center gap-2 text-base font-semibold">
              <ShieldCheck className="size-4 text-sage-deep" aria-hidden />
              Verified receipts
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Every payment posts an official receipt number visible to the
              cashier, registrar, and guardians.
            </p>
          </Reveal>
        </div>
      </div>

      <Dialog open={payOpen} onOpenChange={setPayOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pay balance</DialogTitle>
            <DialogDescription>
              {formatPHP(feeStatement.balance)} due by {feeStatement.nextDue}.
              This demo does not process real payments.
            </DialogDescription>
          </DialogHeader>

          <SegmentedControl
            ariaLabel="Payment method"
            className="w-full"
            optionClassName="flex-1 text-xs"
            options={methods.map((m) => ({ value: m.value, label: m.label }))}
            value={method}
            onValueChange={setMethod}
          />

          <div className="flex items-start gap-3 rounded-lg border border-hairline bg-surface-2/60 p-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-clay/10 text-clay">
              {(() => {
                const Icon = methods.find((m) => m.value === method)!.icon;
                return <Icon className="size-4.5" aria-hidden />;
              })()}
            </span>
            <div>
              <p className="text-sm font-medium">
                {methods.find((m) => m.value === method)!.label}
              </p>
              <p className="text-xs text-ink-muted">
                {methods.find((m) => m.value === method)!.note}
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={() => setPayOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setPayOpen(false);
                toast.success("Payment scheduled", {
                  description: `${formatPHP(feeStatement.balance)} via ${methods.find((m) => m.value === method)!.label} — demo only.`,
                });
              }}
            >
              Pay {formatPHP(feeStatement.balance)}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
