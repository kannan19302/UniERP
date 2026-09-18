const fs = require('fs');

const filesToFix = [
  'd:/UniERP/unierp-web/app/(dashboard)/inventory/asn/page.tsx',
  'd:/UniERP/unierp-web/app/(dashboard)/procurement/purchase-orders/[id]/page.tsx',
  'd:/UniERP/unierp-web/app/(dashboard)/finance/invoices/[id]/page.tsx'
];

filesToFix.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace data={selectedAsn.lineItems} with data={selectedAsn.lineItems || []}
  content = content.replace(/data=\{selectedAsn\.lineItems\}/g, 'data={selectedAsn.lineItems || []}');
  // Replace data={po.items} with data={po.items || []}
  content = content.replace(/data=\{po\.items\}/g, 'data={po.items || []}');
  // Replace data={invoice.lineItems} with data={invoice.lineItems || []}
  content = content.replace(/data=\{invoice\.lineItems\}/g, 'data={invoice.lineItems || []}');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed undefined array data in', file);
  }
});
