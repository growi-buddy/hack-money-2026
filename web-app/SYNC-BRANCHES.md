# Sync your branch with main

## Before you start

**Important:** Make sure all your changes are committed in your current branch before switching to main.

```bash
git status
git add .
git commit -m "your message"
```

## Steps to sync

```bash
# 1. Switch to main
git checkout main

# 2. Pull latest changes
git pull

# 3. Switch back to your branch
git checkout your-branch

# 4. Merge main into your branch
git merge main
```

## If there are conflicts

1. Resolve conflicts in the marked files
2. `git add .`
3. `git commit -m "merge main"`

## Quick command (all in one)

```bash
git checkout main && git pull && git checkout - && git merge main
```

> The `-` switches back to the previous branch automatically.