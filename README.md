# angular-simpler-pagination
Use this simple script if you want a simple client side only pagination for your Angular app.

# Install
npm install ngular-simpler-pagination --save

then add to your JS (if using browserify): require('ngular-simpler-pagination'); 

# Usage
&lt;ul>
  &lt;li ng-repeat="item in someItemsArray | paginate:10:'xxx'">
    {{item}}
  &lt;li>
&lt;/ul>
&lt;paginator for-id="'xxx'">&lt;/paginator>

# Basic CSS
You need to style the paginator, after using a reset to remove default browser styling from UL LI tags, use something like:
.pagination li {
  display: inline-block;
  padding: 5px 0;
}
.pagination .active {
  font-weight: bold;
}

'xxx' is the paginator ID, needed for when you have more then one paginator in the same page
10 is the items per page

# Thanks to..
http://cacodaemon.de/index.php?id=50 for the ideas and the code I started with.