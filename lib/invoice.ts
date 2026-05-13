import { formatRupees } from "@/lib/gst";

export function buildInvoiceHtml() {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; padding: 24px;">
        <h1>Sai Lakshmi Rice Mill</h1>
        <p>GSTIN: 36ABCDE1234F1Z5 · Nalgonda</p>
        <h2>TAX INVOICE</h2>
        <p>Invoice No: INV-2026-047 · Date: 9 May 2026</p>
        <p>To: Srinivas Traders</p>
        <table style="width:100%; border-collapse: collapse;">
          <tr><th align="left">Item</th><th>Bags</th><th>Weight</th><th>Rate</th><th align="right">Amount</th></tr>
          <tr><td>Fine Boiled Rice</td><td align="center">80</td><td align="center">6000 kg</td><td align="center">₹35</td><td align="right">${formatRupees(210000)}</td></tr>
        </table>
        <h3 align="right">Grand Total: ${formatRupees(220500)}</h3>
        <p>ధన్యవాదాలు | Thank you for your business</p>
      </body>
    </html>`;
}
