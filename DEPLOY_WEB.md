# DEPLOY_WEB.md — Deploy (Prototype)

## Target
- Public URL that can be opened on iPhone Safari.

## Recommended path
- GitHub Pages (no Vercel account required)

## Steps
1) Push to `main`
2) In GitHub repo settings, enable Pages:
   - Source: `GitHub Actions`
3) Wait for workflow `Deploy to GitHub Pages` to complete
4) Output:
   - Deployment URL
   - Simple smoke test steps for iPhone

## Notes
- Ensure all features work on iPhone Safari:
  - swipe gesture
  - modal open/close
  - persistence after reload
