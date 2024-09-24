# React Generative AI Responses
# Lessons Learned - React Hooks
** useEffect **
* useEffect was getting triggered twice, once for searchQuery and once for limit. I had to use if condition to stop it from happening.
* Adding dependencies to useEffect will execute the code whenever dependencies change.
** useState **
* use this React hook to assign values


## adding custom domain www.genai-all.com
* Go to settings -> Pages -> Custom domain -> Add custom domain
  * Add www.genai-all.com
* Go to domain provider godaddy.com and add CNAME record with value genai-all.com
* Most importantly, add CNAME file to .gitiignore file to avoid it from being pushed to github.
  * .gitignore 
    * docs/CNAME
  * clear git cache
    * git rm -r --cached .
    * git add .
    * git commit -m "fixed gitignore files"
* Now, the custom domain should be working. 
* Note: It may take some time for the changes to reflect.

## Make app full screen on iphone after adding to home screen
* Add the following meta tag to index.html in public folder
  *  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
  *  create manifest.json file in public folder
  ```json
  {
    "short_name": "Gen AI",
    "name": "Gen AI Studio",
    "icons": [
      {
        "src": "ai.avif"
      }
    ],
    "start_url": ".",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#ffffff"
  }
  ```
## Build and deploy the app
* npm run build
* git add, commit and push