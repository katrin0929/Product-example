const Store = require('./store');

const paymentsStore = new Store('payments.json');
const checkoutsStore = new Store('checkouts.json');
const productsStore = new Store('products.json');
const usersStore = new Store('users.json');

const esc = (s) => String(s ?? '').replace(/[&<>"']/g,
  (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function renderInvoiceHtml({ invoice, payment, user, productTitle }) {
  const amount = payment ? `${(payment.amount / 100).toFixed(2)} ${payment.currency}` : '—';
  const refunded = payment?.status === 'refunded';

  return `<!doctype html>
<html><head><meta charset="utf-8"><title>${esc(invoice.number)}</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 640px; margin: 40px auto; color: #1e293b; }
  .stamp { display: inline-block; padding: 4px 12px; border-radius: 999px; font-weight: 700;
           background: ${refunded ? '#f1f5f9' : '#d1fae5'}; color: ${refunded ? '#475569' : '#047857'}; }
  table { width: 100%; border-collapse: collapse; margin-top: 24px; }
  th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #e2e8f0; }
  .total td { font-weight: 700; border-bottom: none; }
</style></head><body>
  <h1>Invoice ${esc(invoice.number)}</h1>
  <p><span class="stamp">${refunded ? 'REFUNDED' : 'PAID'}</span></p>
  <p>Date: ${esc(new Date(invoice.createdAt).toLocaleDateString('en-US'))}</p>
  <p>Billed to: ${esc(user?.name || '—')} &lt;${esc(user?.email || '—')}&gt;</p>
  <table>
    <tr><th>Item</th><th>Credits</th><th>Amount</th></tr>
    <tr><td>${esc(productTitle)}</td><td>${esc(payment?.credits ?? 0)}</td><td>${esc(amount)}</td></tr>
    <tr class="total"><td colspan="2">Total</td><td>${esc(amount)}</td></tr>
  </table>
</body></html>`;
}

// Джойнит связанные записи (с fallback'ами на «—») и отдаёт инвойс как скачиваемый HTML
function sendInvoiceHtml(res, invoice) {
  const payment = paymentsStore.findById(invoice.paymentId) || null;
  const user = usersStore.findById(invoice.userId) || null;
  const chk = payment ? checkoutsStore.findById(payment.checkoutId) : null;
  const product = chk ? productsStore.findById(chk.productId) : null;
  const productTitle = product ? product.title : (chk ? chk.productId : '—');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${invoice.number}.html"`);
  res.send(renderInvoiceHtml({ invoice, payment, user, productTitle }));
}

module.exports = { renderInvoiceHtml, sendInvoiceHtml };
