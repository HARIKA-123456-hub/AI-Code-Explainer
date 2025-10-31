# 🚀 Deploying Vortex Verse to Render

This guide will help you deploy your Universal Code Explainer application to Render.

## 📋 Prerequisites

1. A [Render account](https://render.com) (free tier available)
2. Your code pushed to GitHub/GitLab/Bitbucket
3. Your OpenAI API key ready

## 🔧 Step-by-Step Deployment

### **Option 1: Using Render Dashboard (Recommended)**

1. **Connect Your Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub/GitLab/Bitbucket repository
   - Select the `vortex-verse` repository

2. **Configure the Service**
   - **Name**: `vortex-verse` (or any name you prefer)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (or `vortex-verse` if in subdirectory)

3. **Build & Start Commands**
   ```
   Build Command: npm install && npm run build
   Start Command: npm start
   ```
   
   > **Note**: If you prefer pnpm, enable it in Render settings or use:
   > ```
   > Build Command: npm install -g pnpm && pnpm install && pnpm run build
   > Start Command: pnpm start
   > ```

4. **Environment Variables**
   Click "Add Environment Variable" and add:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (starts with `sk-`)
   - **Key**: `NODE_ENV`
   - **Value**: `production`
   - **Key**: `PING_MESSAGE` (optional)
   - **Value**: `ping pong`

5. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy your app
   - Wait for the build to complete (~5-10 minutes)

### **Option 2: Using render.yaml**

1. **The `render.yaml` file is already configured in your repo**

2. **Connect Repository**
   - Go to Render Dashboard
   - Click "New +" → "Blueprint"
   - Select your repository
   - Render will detect `render.yaml` automatically

3. **Set Environment Variables**
   - After blueprint is created, go to your service
   - Navigate to "Environment" tab
   - Add `OPENAI_API_KEY` with your key value

4. **Deploy**
   - Click "Manual Deploy" → "Deploy latest commit"

## ✅ Verification

After deployment:

1. **Check Build Logs**
   - Look for `✅ OpenAI key loaded` message
   - Ensure build completes successfully

2. **Test Your App**
   - Visit your Render URL (e.g., `https://vortex-verse.onrender.com`)
   - Go to `/explain` route
   - Test with a code snippet

3. **Check Server Logs**
   - In Render Dashboard → "Logs" tab
   - Verify: `✅ OpenAI client initialized successfully`

## 🔧 Troubleshooting

### **Build Fails**
- **Issue**: "pnpm not found"
  - **Solution**: Use npm commands instead, or enable pnpm in Render settings

- **Issue**: "Cannot find module"
  - **Solution**: Ensure all dependencies are in `package.json`

### **App Crashes on Start**
- **Issue**: "OpenAI key missing"
  - **Solution**: Check environment variables are set correctly in Render dashboard

- **Issue**: "Cannot find dist/spa"
  - **Solution**: Verify build completed successfully and static files were generated

### **Environment Variables Not Loading**
- **Issue**: API key not working
  - **Solution**: 
    1. Double-check variable name is exactly `OPENAI_API_KEY`
    2. Ensure no extra spaces in the value
    3. Redeploy after setting variables

## 📊 Render Service Details

### **Free Tier Limitations**
- **Spin down**: Service sleeps after 15 minutes of inactivity
- **Cold starts**: First request after sleep takes ~30 seconds
- **Build time**: 10 minutes limit
- **Bandwidth**: 100GB/month

### **Upgrade Options**
For production, consider upgrading to:
- **Starter Plan**: $7/month - No spin down
- **Professional Plan**: $25/month - Better performance

## 🔒 Security Notes

1. **Never commit `.env` file** - Already in `.gitignore`
2. **API keys**: Only set in Render dashboard, never in code
3. **Environment variables**: Use Render's secure environment variable storage

## 📝 Post-Deployment

1. **Custom Domain** (Optional)
   - Go to Settings → Custom Domain
   - Add your domain and configure DNS

2. **Monitor Logs**
   - Check Render Dashboard → Logs regularly
   - Monitor API usage and errors

3. **Set Up Alerts** (Optional)
   - Configure email alerts for deployment failures
   - Monitor service health

## 🎉 Success!

Your Universal Code Explainer should now be live on Render!

**Example URL**: `https://vortex-verse.onrender.com/explain`

Happy deploying! 🚀


