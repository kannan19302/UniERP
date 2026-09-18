import fs from 'fs';
import path from 'path';

const root = 'd:/UniERP';
const repos = fs.readdirSync(root).filter(n => n.startsWith('unierp-') && fs.statSync(path.join(root, n)).isDirectory());

const newNpmrcContent = `# Registry configuration only. Credentials live in the user-level ~/.npmrc, which
# npm merges at runtime and git never sees.
#
# \`@kannan19302/*\` publishes to the public npm registry. GitHub Packages was
# considered because of its existing OIDC tokens, but rejected initially when the
# scope was \`@unerp\` because the scope did not match the repository owner.
# Now that the scope is \`@kannan19302\`, it technically matches, but the public
# registry was kept anyway because a self-hoster can \`npm install @kannan19302/kernel\`
# with no authentication, which is what an AGPL-3.0 claim to be self-hostable
# in full actually requires.
#
# Both lines are the npm default. They are stated explicitly because for a long time
# the first one was not — the scope was originally \`@unerp\` and it pointed at a
# localhost Verdaccio in eighteen repositories, so no CI runner could resolve it at all.
#
# An auth-token line used to sit in this file, committed, in fourteen public
# repositories. It authenticated that localhost Verdaccio, so the real blast radius
# was small — but "no secrets, credentials, or real customer data in the repo" has
# no size threshold, and PLATFORM_ARCHITECTURE.md § 10 claims gitleaks runs at
# pre-commit, pre-push and CI in every repository. No repository had it. That is how
# fourteen tokens were committed without anything objecting. Phase A10 fixed it.
@kannan19302:registry=https://registry.npmjs.org/
registry=https://registry.npmjs.org/
`;

let count = 0;
for (const repo of repos) {
  const npmrcPath = path.join(root, repo, '.npmrc');
  if (fs.existsSync(npmrcPath)) {
    fs.writeFileSync(npmrcPath, newNpmrcContent);
    count++;
  }
}
console.log(`Updated .npmrc in ${count} repositories.`);
