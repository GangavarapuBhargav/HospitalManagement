# GitHub Actions CI/CD Setup

This repository includes automated CI/CD pipelines for building Docker images and deploying to Kubernetes.

## Workflow Overview

The `deploy.yml` workflow performs the following:

1. **Build and Push**: Builds Docker images for both backend and frontend, then pushes them to GitHub Container Registry (ghcr.io)
2. **Deploy**: Deploys the application to Kubernetes cluster

## Prerequisites

### 1. GitHub Container Registry Access
- The workflow uses `GITHUB_TOKEN` which is automatically provided by GitHub Actions
- Make sure your repository has `packages: write` permission enabled

### 2. Kubernetes Cluster Access
You need to set up a Kubernetes cluster and provide access credentials:

#### Option A: Using kubeconfig file
1. Get your kubeconfig file from your Kubernetes cluster:
   ```bash
   kubectl config view --flatten > kubeconfig.yaml
   ```

2. Encode it to base64:
   ```bash
   # For Linux:
   cat kubeconfig.yaml | base64 -w 0
   
   # For macOS:
   cat kubeconfig.yaml | base64 | tr -d '\n'
   ```

3. Add it as a GitHub Secret:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `KUBECONFIG`
   - Value: Paste the base64-encoded kubeconfig content

#### Option B: Using service account token (for cloud providers)
For cloud providers (GKE, EKS, AKS), you can use service account tokens instead.

### 3. Kubernetes Secrets
Make sure your Kubernetes cluster has the required secrets configured:
- `mysql-secret.yaml` - MySQL database credentials
- `backend-secret.yaml` - Backend application secrets

## Workflow Triggers

The workflow runs on:
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch (builds only, no deployment)
- Manual trigger via `workflow_dispatch`

## Image Tags

Images are tagged with:
- `latest` - For main/master branch
- `{branch-name}` - For feature branches
- `{branch-name}-{sha}` - For specific commits
- `pr-{number}` - For pull requests

## Deployment Process

1. **Build Phase**:
   - Builds Spring Boot backend using Maven
   - Builds React frontend using npm
   - Pushes images to GitHub Container Registry

2. **Deploy Phase** (only on main/master):
   - Applies Kubernetes manifests in order:
     - Namespace
     - MySQL secret and deployment
     - Backend secret, configmap, and deployment
     - Frontend deployment
   - Waits for MySQL to be ready
   - Waits for backend and frontend deployments to be ready

## Manual Deployment

You can also deploy manually using the provided script:

```bash
export REGISTRY=ghcr.io/your-username
export IMAGE_TAG=latest
./deploy.sh
```

## Troubleshooting

### Build Failures
- Check that all dependencies are correctly specified
- Verify Dockerfile syntax
- Check build logs in GitHub Actions

### Deployment Failures
- Verify `KUBECONFIG` secret is correctly set
- Check Kubernetes cluster connectivity
- Verify all required secrets exist in the cluster
- Check pod logs: `kubectl logs -n hospital-app <pod-name>`

### Image Pull Errors
- Ensure images are public or the cluster has access to GitHub Container Registry
- For private images, configure image pull secrets in Kubernetes

## Security Notes

- Never commit sensitive information to the repository
- Use GitHub Secrets for all credentials
- Regularly rotate Kubernetes access tokens
- Review and update image tags regularly

