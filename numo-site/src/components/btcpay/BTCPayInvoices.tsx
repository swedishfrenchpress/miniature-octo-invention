import { Open_Sans } from "next/font/google";
import styles from "./BTCPayInvoices.module.css";

// BTCPay Server's interface face. Loaded only on the route that depicts it.
const openSans = Open_Sans({
  variable: "--font-btcpay",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export type InvoiceStatus = "New" | "Settled";

export type Invoice = {
  id: string;
  date: string;
  status: InvoiceStatus;
  /** Numo creates its BTCPay invoices in sats, so that is what the list shows. */
  sats: number;
  /** Set on an invoice the demo has just created, so its row opens into place. */
  fresh?: boolean;
};

function Icon({ name }: { name: string }) {
  return (
    <svg className={styles.icon} aria-hidden="true">
      <use href={`/btcpay/icons.svg#${name}`} />
    </svg>
  );
}

const STATUSES: InvoiceStatus[] = ["New", "Settled"];

/** The Invoices page of a BTCPay Server store, at the size BTCPay draws it:
 *  the page itself, without the app's sidebar and top bar around it. Built from
 *  BTCPay's own markup, tokens and icon set. Purely presentational. */
export function BTCPayInvoices({
  invoices,
  className = "",
}: {
  invoices: readonly Invoice[];
  className?: string;
}) {
  return (
    <div className={`${styles.window} ${openSans.variable} ${className}`}>
      <div className={styles.view}>
        <div className={styles.pageHeader}>
          <div className={styles.title}>
            Invoices
            <Icon name="info" />
          </div>
          <div className={styles.pageActions}>
            <div className={styles.button} data-kind="secondary">
              <Icon name="nav-reporting" />
              Reporting
            </div>
            <div className={styles.button}>Create Invoice</div>
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.search}>Search…</div>
          <div className={styles.filter}>
            All Status
            <Icon name="caret-down" />
          </div>
          <div className={styles.filter}>
            All Time
            <Icon name="caret-down" />
          </div>
        </div>

        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span className={styles.checkbox} />
            <span className={styles.dateHead}>
              Date
              <Icon name="time" />
            </span>
            <span>Invoice Id</span>
            <span className={styles.orderId}>Order Id</span>
            <span>Status</span>
            <span className={styles.amount}>Amount</span>
            <span />
          </div>

          <div className={styles.rows}>
            {/* A new invoice slides the whole list down by one row. Keyed on the
                newest invoice, so the slide runs once for each sale. */}
            <div
              key={invoices[0]?.id}
              className={styles.track}
              data-shift={invoices[0]?.fresh || undefined}
            >
              {invoices.map((invoice) => (
                <div key={invoice.id} className={styles.row} data-fresh={invoice.fresh || undefined}>
                  <div className={styles.cells}>
                    <span className={styles.checkbox} />
                    <span className={styles.date}>{invoice.date}</span>
                    <span className={styles.invoiceId}>{invoice.id}</span>
                    <span className={styles.orderId} />
                    <span>
                      <span className={styles.badge} data-status={invoice.status}>
                        {STATUSES.map((status) => (
                          <span key={status} className={styles.badgeLabel} data-for={status}>
                            {status}
                          </span>
                        ))}
                      </span>
                    </span>
                    <span className={styles.amount}>
                      {invoice.sats.toLocaleString("en-US")} SATS
                    </span>
                    <span className={styles.rowActions}>
                      <Icon name="actions-comment" />
                      <Icon name="caret-down" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
