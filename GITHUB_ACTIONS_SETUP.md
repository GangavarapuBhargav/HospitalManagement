# GitHub Actions CI/CD Setup Guide

## ✅ What's Been Set Up

### 1. GitHub Actions Workflow
- **Location**: `.github/workflows/deploy.yml`
- **Features**:
  - Automated Docker image builds for backend and frontend
  - Push to GitHub Container Registry (ghcr.io)
  - Automated Kubernetes deployment
  - Runs on push to main/master branches
  - Builds (but doesn't deploy) on pull requests

### 2. Docker Configuration
- **Backend Dockerfile**: `Dockerfile` (copied from `Dockerfile.backend`)
- **Frontend Dockerfile**: `frontend/Dockerfile` (already existed)
- **.dockerignore files**: Created for both backend and frontend to optimize builds

### 3. Files Created/Modified
- ✅ `.github/workflows/deploy.yml` - Main CI/CD workflow
- ✅ `Dockerfile` - Backend Docker image definition
- ✅ `.dockerignore` - Backend build optimization
- ✅ `frontend/.dockerignore` - Frontend build optimization
- ✅ `.github/workflows/README.md` - Detailed documentation

## 🚀 Quick Start

### Step 1: Set Up Kubernetes Access Secret

1. Get your kubeconfig:
   ```bash
   kubectl config view --flatten > kubeconfig.yaml
   ```

2. Encode to base64:
   ```bash
   # For Linux:
   cat kubeconfig.yaml | base64 -w 0
   
   # For macOS:
   cat kubeconfig.yaml | base64 | tr -d '\n'
   ```

3. Add GitHub Secret:
   - Go to: Repository → Settings → Secrets and variables → Actions
   - New repository secret
   - Name: `KUBECONFIG`
   - Value: Paste the base64-encoded content

### Step 2: Verify Kubernetes Secrets

Make sure your Kubernetes cluster has these secrets configured:
- `mysql-secret.yaml` - Database credentials
- `backend-secret.yaml` - Application secrets

### Step 3: Push to Trigger

Simply push to `main` or `master` branch:
```bash
git add .
git commit -m "Add GitHub Actions CI/CD"
git push origin main
```

The workflow will automatically:
1. Build Docker images
2. Push to GitHub Container Registry
3. Deploy to Kubernetes

## 📋 Workflow Details

### Build Job
- Builds backend (Spring Boot) using Maven
- Builds frontend (React) using npm
- Pushes images to `ghcr.io/{your-username}/{repo-name}/springboot-backend` and `ghcr.io/{your-username}/{repo-name}/react-frontend`
- Tags images with: `latest`, branch name, and commit SHA

### Deploy Job
- Only runs on `main`/`master` branch (not on PRs)
- Applies Kubernetes manifests in the correct order
- Waits for MySQL to be ready before deploying backend
- Waits for deployments to be ready before completing

## 🔍 Monitoring

View workflow runs:
- Go to: Repository → Actions tab
- Click on a workflow run to see logs

Check deployment status:
```bash
kubectl get all -n hospital-app
```

## 🛠️ Customization

### Change Image Registry
Edit `.github/workflows/deploy.yml`:
```yaml
env:
  REGISTRY: docker.io  # or your registry
```

### Change Image Tags
Modify the `tags` section in the metadata extraction steps.

### Skip Deployment
The deploy job only runs on main/master. For other branches, only builds run.

## 📝 Notes

- Images are stored in GitHub Container Registry (ghcr.io)
- The workflow uses `GITHUB_TOKEN` automatically (no setup needed)
- Kubernetes deployment requires the `KUBECONFIG` secret
- All sensitive data should be in GitHub Secrets or Kubernetes Secrets

## 🔗 Related Files

- `deploy.sh` - Manual deployment script (can be used locally)
- `k8s/` - Kubernetes manifests
- `docker-compose.yml` - Local development setup

