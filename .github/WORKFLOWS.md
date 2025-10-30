# GitHub Actions Workflows

This project includes comprehensive GitHub Actions workflows for continuous integration, deployment, and code quality assurance.

## 🚀 Workflows Overview

### 1. CI/CD Pipeline (`ci-cd.yml`)
**Triggers**: Push to main/master/develop, Pull Requests
- **Test Job**: Runs tests on Node.js 18.x and 20.x
- **Build Job**: Creates production build artifacts
- **E2E Tests**: End-to-end testing (on main/master pushes)
- **Security Scan**: Vulnerability and dependency auditing
- **Deploy Job**: Automated deployment to GitHub Pages
- **Notify Job**: Status notifications

### 2. GitHub Pages Deployment (`deploy.yml`)
**Triggers**: Push to main/master, Manual dispatch
- Builds Angular application for production
- Configures proper base href for GitHub Pages
- Deploys to `gh-pages` branch
- Outputs deployment URL

### 3. Code Quality & Security (`quality.yml`)
**Triggers**: Push, Pull Requests, Weekly schedule (Mondays 9 AM UTC)
- **Lint & Format**: ESLint and Prettier checks
- **Test Coverage**: Coverage reports with Codecov integration
- **Security Audit**: npm audit and vulnerability scanning
- **Dependency Review**: License and security compliance
- **CodeQL Analysis**: GitHub's semantic code analysis
- **Performance Budget**: Bundle size monitoring
- **Accessibility Check**: Automated accessibility testing

### 4. Pull Request Checks (`pr-checks.yml`)
**Triggers**: Pull Request events (opened, updated, ready for review)
- **PR Validation**: Semantic PR title validation
- **Size Check**: Bundle size comparison with base branch
- **Coverage Diff**: Test coverage change reporting
- **Auto-assign**: Automatic reviewer assignment
- **Labeling**: Automatic labeling based on file changes
- **Conflict Check**: Merge conflict detection
- **Security Check**: Trivy vulnerability scanning

### 5. Release Management (`release.yml`)
**Triggers**: Git tags (`v*`), Manual dispatch
- **Create Release**: Automated release creation with changelog
- **Deploy Release**: Production deployment for releases
- **Notify Teams**: Release notifications
- **Post Release**: Automated post-release tasks

## 📋 Required Setup

### 1. Repository Settings
Enable the following in your GitHub repository settings:

- **Actions**: Enable GitHub Actions
- **Pages**: Set source to "GitHub Actions"
- **Security**: Enable dependency graph and security advisories

### 2. Branch Protection (Recommended)
Set up branch protection rules for `main`/`master`:
- Require status checks to pass before merging
- Require pull request reviews before merging
- Dismiss stale PR approvals when new commits are pushed
- Require linear history

### 3. Secrets (If needed)
No additional secrets are required for basic functionality. All workflows use `GITHUB_TOKEN` which is automatically provided.

Optional secrets for enhanced functionality:
- `CODECOV_TOKEN`: For Codecov integration (if using private repository)

## 🏷️ Labels and Auto-assignment

### Automatic Labels
PRs are automatically labeled based on file changes:
- `component`: Component file changes
- `service`: Service file changes
- `tests`: Test file changes
- `config`: Configuration changes
- `documentation`: Documentation updates
- `styles`: CSS/SCSS changes
- `dependencies`: Package.json changes
- `ci`: GitHub Actions changes
- `assets`: Asset file changes

### Auto-assignment
- PRs are automatically assigned to repository owner
- Reviewers are automatically requested

## 📊 Code Quality Metrics

### Test Coverage
- Unit test coverage is tracked and reported
- Coverage reports are uploaded to Codecov
- Coverage changes are commented on PRs

### Bundle Size
- Production bundle size is monitored
- PR size comparisons with base branch
- Alerts for bundle size increases > 10%

### Security
- Automated vulnerability scanning
- Dependency license compliance checking
- CodeQL security analysis
- Regular security audits (weekly)

## 🚀 Deployment

### Automatic Deployment
- Every push to `main`/`master` triggers deployment
- Application is deployed to GitHub Pages
- Deployment URL: `https://[username].github.io/[repository-name]/`

### Release Deployment
- Tagged releases trigger special deployment
- Release artifacts are created and uploaded
- Comprehensive release notes are generated
- Deployment includes proper versioning

## 📝 Scripts

The following npm scripts support the CI/CD workflows:

```json
{
  "test:ci": "ng test --watch=false --browsers=ChromeHeadless",
  "test:coverage": "ng test --code-coverage --watch=false --browsers=ChromeHeadless",
  "build:prod": "ng build --configuration production",
  "lint": "ng lint",
  "e2e": "ng e2e",
  "format:check": "prettier --check \"src/**/*.{ts,html,css,scss,json}\"",
  "format:write": "prettier --write \"src/**/*.{ts,html,css,scss,json}\"",
  "analyze": "ng build --configuration production --stats-json && npx webpack-bundle-analyzer dist/componenttesting-ex/stats.json"
}
```

## 🔧 Customization

### Workflow Customization
To customize workflows for your needs:

1. **Node.js versions**: Update the matrix in `ci-cd.yml`
2. **Test browsers**: Modify browser configuration in test scripts
3. **Deployment branch**: Change the base href and branch settings in deploy workflows
4. **Security policies**: Adjust security scanning thresholds in `quality.yml`
5. **Notification settings**: Modify notification steps in workflows

### Adding More Checks
You can extend the workflows by:
- Adding more test environments
- Including additional security scanners
- Adding performance testing
- Including visual regression testing
- Adding more linting rules

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**: Check Node.js version compatibility
2. **Test Failures**: Ensure ChromeHeadless is properly configured
3. **Deployment Issues**: Verify GitHub Pages settings and base href configuration
4. **Permission Errors**: Check repository permissions and GitHub token scope

### Debugging
- View workflow logs in the Actions tab
- Check individual job outputs for detailed error messages
- Verify workflow file syntax using GitHub's workflow validator

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Angular CI/CD Best Practices](https://angular.io/guide/deployment)
- [GitHub Pages Deployment](https://docs.github.com/en/pages)
- [Codecov Integration](https://docs.codecov.com/docs)

---

**Note**: These workflows are designed to work out of the box with minimal configuration. Adjust the settings based on your specific project requirements and team preferences.