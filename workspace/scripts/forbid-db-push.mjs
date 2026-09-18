console.error(
  'Schema push is disabled for UniERP. Generate an additive migration with `pnpm db:migrate --name <change>` and apply recorded history with `pnpm db:deploy`.',
);
process.exitCode = 1;
