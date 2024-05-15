# React Generative AI Responses
# Lessons Learned - React Hooks
** useEffect **
* useEffect was getting triggered twice, once for searchQuery and once for limit. I had to use if condition to stop it from happening.
* Adding dependencies to useEffect will execute the code whenever dependencies change.
** useState **
* use this React hook to assign values
