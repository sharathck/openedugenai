# write shell script to execute following commands sequentilly
# npm run build
# npm run deploy
# firebase deploy
#!/bin/bash

echo "Starting build process..."
npm run build

echo "Starting deployment..."
npm run deploy

echo "Deploying to Firebase..."
firebase deploy

echo "Deployment complete!"

# Run the script, git add, commit and push the changes
git add --all
git commit -m "Deploying to Firebase"
git push -u origin main
