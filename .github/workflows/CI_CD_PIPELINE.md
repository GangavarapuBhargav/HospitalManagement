# 🚀 CI/CD Pipeline Documentation

## Overview

This repository includes a comprehensive CI/CD pipeline that automates testing, building, security scanning, and deployment.

## Pipeline Structure

### 1. **Test Backend** (`test-backend`)
- Runs Maven unit tests
- Generates test reports
- Uploads test results as artifacts
- Fails the pipeline if tests fail

### 2. **Lint Frontend** (`lint-frontend`)
- Installs Node.js dependencies
- Runs ESLint for code quality
- Builds the frontend to verify it compiles
- Ensures code quality standards

### 3. **Security Scan** (`security-scan`)
- Runs Trivy vulnerability scanner
- Scans for security vulnerabilities
- Uploads results to GitHub Security tab
- Runs in parallel with other jobs

### 4. **Build Images** (`build-images`)
- Builds Docker images for backend and frontend
- Pushes images to GitHub Container Registry
- Uses Docker layer caching for faster builds
- Tags images with multiple strategies (branch, SHA, latest)

### 5. **Deploy** (`deploy`)
- Deploys to Kubernetes cluster
- Only runs on main/master branches or manual trigger
- Updates Kubernetes manifests with new image tags
- Waits for deployments to be ready
- Provides deployment summary

### 6. **Notify** (`notify`)
- Sends deployment status notifications
- Can be extended with Slack, email, etc.

## Workflow Triggers

### Automatic Triggers
- **Push to main/master/develop**: Full CI/CD pipeline runs
- **Pull Request**: Runs tests and builds (no deployment)

### Manual Trigger
- **workflow_dispatch**: Manual deployment with environment selection
  - Options: `staging` or `production`

## Pipeline Flow

```
┌─────────────────┐
│  Code Push/PR   │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼──────┐
│ Test  │ │  Lint   │
│Backend│ │Frontend │
└───┬───┘ └──┬──────┘
    │         │
    └────┬────┘
         │
    ┌────▼────┐
    │ Security│
    │  Scan   │
    └────┬────┘
         │
    ┌────▼────┐
    │  Build  │
    │ Images  │
    └────┬────┘
         │
    ┌────▼────┐
    │ Deploy  │
    │   to    │
    │   K8s   │
    └────┬────┘
         │
    ┌────▼────┐
    │ Notify  │
    └─────────┘
```

## Environment Variables

- `REGISTRY`: GitHub Container Registry (ghcr.io)
- `BACKEND_IMAGE_NAME`: Backend image name
- `FRONTEND_IMAGE_NAME`: Frontend image name
- `JAVA_VERSION`: Java version (17)
- `NODE_VERSION`: Node.js version (20)

## Secrets Required

### GitHub Secrets
- `KUBECONFIG`: Base64-encoded Kubernetes config file

### Automatic Secrets
- `GITHUB_TOKEN`: Automatically provided by GitHub Actions

## Image Tagging Strategy

Images are tagged with:
- `latest`: For main/master branch
- `{branch-name}`: For feature branches
- `{branch-name}-{sha}`: For specific commits
- `pr-{number}`: For pull requests

## Deployment Environments

- **Production**: Automatic on push to main/master
- **Staging**: Can be triggered manually

## Artifacts

- Test results are uploaded and retained for 30 days
- Docker images are pushed to GitHub Container Registry
- Security scan results are available in GitHub Security tab

## Monitoring

### Check Pipeline Status
1. Go to **Actions** tab in GitHub
2. Click on the workflow run
3. View individual job status and logs

### View Deployed Images
- Go to: `https://github.com/{username}/{repo}?tab=packages`
- View all container images

### View Security Issues
- Go to: **Security** → **Code scanning alerts**
- View Trivy scan results

## Troubleshooting

### Tests Fail
- Check test output in the Actions tab
- Review test reports artifact
- Fix failing tests locally before pushing

### Build Fails
- Check Docker build logs
- Verify Dockerfile syntax
- Check dependencies in pom.xml/package.json

### Deployment Fails
- Verify `KUBECONFIG` secret is set correctly
- Check Kubernetes cluster connectivity
- Review deployment logs in Actions

### Security Scan Issues
- Review security alerts in GitHub Security tab
- Update vulnerable dependencies
- Review Trivy scan results

## Best Practices

1. **Always run tests locally** before pushing
2. **Review PR checks** before merging
3. **Monitor security alerts** regularly
4. **Keep dependencies updated**
5. **Use semantic versioning** for releases

## Customization

### Add More Tests
Edit the `test-backend` job to include integration tests.

### Add Notifications
Extend the `notify` job with Slack, email, or other services.

### Add More Environments
Add environment-specific deployment jobs.

### Customize Image Tags
Modify the metadata extraction steps in `build-images` job.

## Related Files

- `.github/workflows/deploy.yml` - Original deployment workflow
- `.github/workflows/ci-cd.yml` - Alternative CI/CD workflow
- `k8s/` - Kubernetes manifests

