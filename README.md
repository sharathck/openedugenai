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