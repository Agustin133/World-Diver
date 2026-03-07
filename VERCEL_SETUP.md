# ⚡ Vercel Environment Variables Setup

## Critical: Configure REACT_APP_API_URL

After deploying your backend to Railway or Render, you **MUST** configure the frontend environment variable in Vercel.

## Step-by-Step Instructions

### 1. Get Your Backend URL

**If using Railway:**
- Your URL will be: `https://[your-project].up.railway.app`

**If using Render:**
- Your URL will be: `https://[your-service].onrender.com`

### 2. Configure Vercel

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Select your `World-Diver` project

2. **Open Settings**
   - Click on "Settings" tab
   - Click on "Environment Variables" in the sidebar

3. **Add REACT_APP_API_URL**
   - Click "Add New"
   - **Name:** `REACT_APP_API_URL`
   - **Value:** `https://your-backend-url/api`
   - ⚠️ **CRITICAL:** Must end with `/api`
   
   Examples:
   - Railway: `https://world-diver-production.up.railway.app/api`
   - Render: `https://world-divers-backend.onrender.com/api`

4. **Select Environments**
   - Check all three: ✅ Production, ✅ Preview, ✅ Development
   - This ensures the variable works in all environments

5. **Save**
   - Click "Save"

### 3. Redeploy Your Application

**IMPORTANT:** Environment variables are injected at build time, so you must redeploy!

1. Go to "Deployments" tab
2. Find your latest deployment
3. Click the "..." menu on the right
4. Select "Redeploy"
5. Confirm the redeploy
6. Wait for build to complete (2-3 minutes)

### 4. Verify It's Working

1. **Open your Vercel app URL**
   - Example: `https://world-divers.vercel.app`

2. **Open Browser Console** (F12)
   - Go to Console tab
   - Look for API calls

3. **Check API URLs**
   - Should see: `https://your-backend-url/api/...`
   - Should NOT see: `undefined/...`

4. **Test Features**
   - ✅ Navigate to /explorar - should load species
   - ✅ Navigate to /servicios - should load destinations
   - ✅ Try to register a new user
   - ✅ Try to login

## Common Issues

### Issue: Still seeing "undefined" in API calls

**Solution:**
1. Verify variable name is exactly: `REACT_APP_API_URL`
2. Verify you redeployed AFTER adding the variable
3. Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue: API calls return 404

**Solution:**
1. Verify backend URL is correct and accessible
2. Test backend directly: `curl https://your-backend-url/api/memberships/plans`
3. Ensure URL ends with `/api`

### Issue: CORS errors

**Solution:**
1. Backend is already configured to allow all `.vercel.app` domains
2. If using custom domain, add it to backend CORS configuration
3. Check browser console for specific CORS error message

### Issue: Login doesn't work

**Solution:**
1. Verify backend is running: visit `https://your-backend-url/`
2. Check backend logs for errors
3. Verify MongoDB connection in backend logs
4. Ensure JWT_SECRET is set in backend environment variables

## Backend Environment Variables (Railway/Render)

Don't forget to set these in your backend platform:

```
MONGODB_URI=mongodb+srv://Waso:Wasko42788357%21@worlddivers.pawmaj0.mongodb.net/world-divers?retryWrites=true&w=majority&appName=worldDivers
JWT_SECRET=world_divers_super_secret_key_2024_change_in_production
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://world-divers.vercel.app
```

## Testing Checklist

After configuration, test these features:

- [ ] Homepage loads without console errors
- [ ] /explorar page loads species data
- [ ] /servicios page loads destinations
- [ ] User registration works
- [ ] User login works
- [ ] Authenticated features work (favorites, memberships)
- [ ] No "undefined" in API URLs in console
- [ ] No CORS errors in console

## Auto-Deploy

Once configured, future deployments are automatic:
- Push to GitHub → Vercel auto-deploys
- Environment variables persist across deployments
- No need to reconfigure unless changing backend URL

## Need Help?

Check these resources:
- `RAILWAY_DEPLOYMENT.md` - Backend deployment on Railway
- `RENDER_DEPLOYMENT.md` - Backend deployment on Render
- `DEPLOYMENT.md` - General deployment overview
