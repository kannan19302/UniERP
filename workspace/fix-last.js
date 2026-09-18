const fs = require('fs');

const fixes = [
  {
    file: 'd:/UniERP/unierp-web/app/public/customer-portal/dashboard/page.tsx',
    find: /\{ key: "col_5", header: "Actions" , render: \(i: any\) => \(\<\>\<div className=\{styles\.s7\}\>/,
    replace: '{ key: "col_5", header: "Actions" , render: (i: any) => { const outstanding = Number(i.totalAmount) - Number(i.paidAmount); return (<><div className={styles.s7}>'
  },
  {
    file: 'd:/UniERP/unierp-web/app/public/customer-portal/dashboard/page.tsx',
    find: /\)\}\n                                                \<\/div\>\<\/\>\) \},/,
    replace: ')}\n                                                </div></>); } },'
  },
  {
    file: 'd:/UniERP/unierp-web/app/(dashboard)/manufacturing/work-centers/page.tsx',
    find: /\{ key: "col_2", header: "Utilization" , render: \(w: any\) => \(\<\>\<div className="ui-flex-center ui-gap-2"\>/,
    replace: '{ key: "col_2", header: "Utilization" , render: (w: any) => { const utilPct = Math.round((Number(w.utilizedHours) / (Number(w.capacityHours) || 1)) * 100); return (<><div className="ui-flex-center ui-gap-2">'
  },
  {
    file: 'd:/UniERP/unierp-web/app/(dashboard)/manufacturing/work-centers/page.tsx',
    find: /\<span\>\{utilPct\}%\<\/span\>\n                                                          \<\/div\>\<\/\>\) \},/,
    replace: '<span>{utilPct}%</span>\n                                                          </div></>); } },'
  },
  {
    file: 'd:/UniERP/unierp-web/app/(dashboard)/procurement/analytics/page.tsx',
    find: /\{ key: "col_2", header: "Status Breakdown" , render: \(v: any\) => \(\<\>\<div className=\{styles\.p12\}\>/,
    replace: '{ key: "col_2", header: "Status Breakdown" , render: (v: any) => (<><div className={styles.p12}>'
  },
  {
    file: 'd:/UniERP/unierp-web/app/(dashboard)/procurement/analytics/page.tsx',
    find: /Object\.entries\(v\.byStatus\)\.map\(\(\[status, s\]\)/g,
    replace: 'Object.entries(v.byStatus).map(([status, s]: any)'
  },
  {
    file: 'd:/UniERP/unierp-web/app/(dashboard)/pos/orders/page.tsx',
    find: /\{ key: "col_4", header: "Details" , render: \(o: any\) => \(\<\>\<div className="ui-text-sm"\>/,
    replace: '{ key: "col_4", header: "Details" , render: (o: any) => { const h = o.items; return (<><div className="ui-text-sm">'
  },
  {
    file: 'd:/UniERP/unierp-web/app/(dashboard)/pos/orders/page.tsx',
    find: /\{h\.length\} items\n                                                          \<\/div\>\<\/\>\) \},/,
    replace: '{h?.length || 0} items\n                                                          </div></>); } },'
  },
  {
    file: 'd:/UniERP/unierp-web/app/(dashboard)/procurement/returns/page.tsx',
    find: /\{ key: "col_4", header: "Total Value" , render: \(rma: any\) => \(\<\>\<div className="font-medium"\>\$\{total\}\<\/div\>\<\/\>\) \},/g,
    replace: '{ key: "col_4", header: "Total Value" , render: (rma: any) => { const total = rma.items?.reduce((acc: any, i: any) => acc + (Number(i.quantity) * Number(i.unitPrice)), 0) || 0; return (<><div className="font-medium">${total.toFixed(2)}</div></>); } },'
  },
  {
    file: 'd:/UniERP/unierp-web/app/(dashboard)/sales/returns/page.tsx',
    find: /\{ key: "col_4", header: "Total Value" , render: \(rma: any\) => \(\<\>\<div className="font-medium"\>\$\{total\}\<\/div\>\<\/\>\) \},/g,
    replace: '{ key: "col_4", header: "Total Value" , render: (rma: any) => { const total = rma.items?.reduce((acc: any, i: any) => acc + (Number(i.quantity) * Number(i.unitPrice)), 0) || 0; return (<><div className="font-medium">${total.toFixed(2)}</div></>); } },'
  }
];

fixes.forEach(fix => {
  if (fs.existsSync(fix.file)) {
    let content = fs.readFileSync(fix.file, 'utf8');
    content = content.replace(fix.find, fix.replace);
    fs.writeFileSync(fix.file, content);
  }
});
