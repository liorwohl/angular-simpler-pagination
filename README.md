# angular-simpler-pagination
Use this simple script if you want a simple client side only pagination (and sorting) for your Angular app.

# Install
npm install angular-simpler-pagination --save  
  
then add to your JS (if using browserify): require('angular-simpler-pagination'); 

add to your app code:  
angular.module('appName', ['angular-simpler-pagination'])

# Usage
order by: &lt;a table-sort="'yyy' for-id="'xxx'">Yyy&lt;/a> | &lt;a table-sort="['zzz','!yyy']" for-id="'xxx'">Zzz and then Yyy desc&lt;/a>  
items:  
&lt;ul>  
  &lt;li ng-repeat="item in someItemsArray | paginate:10:'xxx':'yyy'">  
    {{item}}  
  &lt;li>  
&lt;/ul>  
&lt;paginator for-id="'xxx'">&lt;/paginator>

'xxx' is the paginator ID, needed for when you have more then one paginator in the same page  
'yyy' or 'zzz' is the sorting column  
10 is the items per page

# Basic CSS
You need to style the paginator, after using a reset to remove default browser styling from UL LI tags, use something like:  
.pagination li {  
  display: inline-block;  
  padding: 5px 0;  
}  
.pagination .active {  
  font-weight: bold;  
}  
.orderByDesc {  
  ...  
}  
.orderByAsc {  
  ...  
}  
  
# Thanks to..
http://cacodaemon.de/index.php?id=50 for the ideas and the code I started with.