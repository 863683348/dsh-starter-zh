# Release Checklist — dsh-starter-zh

## Before publish

- [ ] `node --check lib/index.js && node --check lib/starter.js` passes
- [ ] `node test/starter.test.mjs` all green
- [ ] `npm pack --dry-run` shows lib/ + cordis.patch.yml + READMEs only
- [ ] package.json name/version/description correct
- [ ] Git repo initialized, all files committed, pushed to GitHub
- [ ] GitHub repo has topics: `dsh-plugin` `deepseek-harness` `cordis`
- [ ] Repo is ≥ 1 day old and ≥ 10 commits (awesome-dsh-plugin CI requirement)

## Publish

- [ ] `pwsh -File scripts/publish-npm.ps1` (reads token from \$DSH_HOME/secrets)

## After publish

- [ ] `npm view dsh-starter-zh` shows the new version
- [ ] Add entry `data/plugins/863683348__dsh-starter-zh.yml` to awesome-dsh-plugin fork
- [ ] Open PR to awesome-dsh-plugin (branch `add/dsh-starter-zh`)
