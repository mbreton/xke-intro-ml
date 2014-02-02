#XKE - Machine Learning first class

## Quick start

 1. Prerequisites
    * NodeJS installed
    * Bower installed (in global)
    * Grunt installed (in global)

 * First install all dependencies (back & front) by executing <pre>npm install</pre>
 * And just run <pre>npm start</pre>

## Solution
* [kmeans](http://localhost:3000/#src=dmFyIFg9MCwgWT0xOwoKZnVuY3Rpb24ga21lYW5zKHBvaW50cywgbnVtQ2x1c3RlcnMpIHsKICAgIHZhciBfY2VudHJvaWRzID0gcGlja1N0YXJ0aW5nQ2VudHJvaWRzKG51bUNsdXN0ZXJzLCBwb2ludHMpOwoKICAgIHZhciBtYXhJdGVyID0gMTAwMDsKCiAgICB3aGlsZSAobWF4SXRlci0tKSB7CiAgICAgICAgdmFyIHBhcnRpdGlvbmVkID0gcGFydGl0aW9uVXNpbmdUaGVEaXN0YW5jZShfY2VudHJvaWRzLCBwb2ludHMpOwogICAgICAgIF9jZW50cm9pZHMgPSB1cGRhdGVDZW50cm9pZHMocGFydGl0aW9uZWQpOwogICAgfQoKICAgIHJldHVybiB7CiAgICAgICAgY2VudHJvaWRzOiBfY2VudHJvaWRzLAogICAgICAgIHBhcnRpdGlvbjogcGFydGl0aW9uVXNpbmdUaGVEaXN0YW5jZShfY2VudHJvaWRzLCBwb2ludHMpCiAgICB9Owp9CmZ1bmN0aW9uIHBpY2tTdGFydGluZ0NlbnRyb2lkcyhuLCBwb2ludHMpIHsgICAgCiAgICByZXR1cm4gXyhwb2ludHMpCiAgICAgICAgLnNodWZmbGUoKQogICAgICAgIC5maXJzdChuKQogICAgICAgIC52YWx1ZU9mKCk7IAp9CgpmdW5jdGlvbiBwYXJ0aXRpb25Vc2luZ1RoZURpc3RhbmNlIChjZW50cm9pZHMsIHBvaW50cykgewogICAgdmFyIHBhcnRpdGlvbiA9IHt9OwogICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZW50cm9pZHMubGVuZ3RoOyBpKyspIHsKICAgICAgICBwYXJ0aXRpb25baV0gPSBbXTsKICAgIH0KCiAgICBwb2ludHMuZm9yRWFjaChmdW5jdGlvbiAocG9pbnQpIHsKICAgICAgICB2YXIgY2xvc2VzdENlbnRyb2lkID0gZmluZENsb3Nlc3RDZW50cm9pZChjZW50cm9pZHMsIHBvaW50KTsKICAgICAgICBwYXJ0aXRpb25bY2xvc2VzdENlbnRyb2lkXS5wdXNoKHBvaW50LnNsaWNlKDApKTsKICAgIH0pOwogICAgcmV0dXJuIHBhcnRpdGlvbjsgCn0KCmZ1bmN0aW9uIGZpbmRDbG9zZXN0Q2VudHJvaWQoY2VudHJvaWRzLCBwKSB7CiAgICBpZiAoIWNlbnRyb2lkcykgewogICAgICAgIHJldHVybiB1bmRlZmluZWQ7CiAgICB9CgogICAgdmFyIGNsb3Nlc3QgPSAwLAogICAgICAgIGQgPSBkaXN0YW5jZShjZW50cm9pZHNbY2xvc2VzdF0sIHApOwoKICAgIGZvciAodmFyIGkgPSAxOyBpIDwgY2VudHJvaWRzLmxlbmd0aDsgaSsrKSB7CiAgICAgICAgdmFyIGRpc3QyY2VudHJvaWQgPSBkaXN0YW5jZShjZW50cm9pZHNbaV0sIHApOwogICAgICAgIGlmIChkaXN0MmNlbnRyb2lkIDwgZCkgewogICAgICAgICAgICBjbG9zZXN0ID0gaTsKICAgICAgICAgICAgZCA9IGRpc3QyY2VudHJvaWQ7ICAKICAgICAgICB9CiAgICB9CgogICAgcmV0dXJuIGNsb3Nlc3Q7Cn0KCmZ1bmN0aW9uIHVwZGF0ZUNlbnRyb2lkcyhwYXJ0aXRpb25lZCkgewogICAgdmFyIHJlcyA9IF8ubWFwKHBhcnRpdGlvbmVkLCBkZXRlcm1pbmVOZXdDZW50cm9pZCk7CiAgICByZXR1cm4gcmVzOwp9CgpmdW5jdGlvbiBkZXRlcm1pbmVOZXdDZW50cm9pZChwb2ludHMpIHsKICAgIHZhciBwID0gcG9pbnRzWzBdOwoKICAgIGZvciAodmFyIGkgPSAxOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7CiAgICAgICAgcFtYXSArPSBwb2ludHNbaV1bWF07CiAgICAgICAgcFtZXSArPSBwb2ludHNbaV1bWV07CiAgICB9CgogICAgcmV0dXJuIFsKICAgICAgICBwW1hdIC8gcG9pbnRzLmxlbmd0aCwKICAgICAgICBwW1ldIC8gcG9pbnRzLmxlbmd0aAogICAgXTsKfQoKZnVuY3Rpb24gZGlzdGFuY2UocCwgdikgewogICAgdmFyIGRlbHRhWDIgPSBNYXRoLnBvdygocFtYXSAtIHZbWF0pLCAyKSwKICAgICAgICBkZWx0YVkyID0gTWF0aC5wb3coKHBbWV0gLSB2W1ldKSwgMik7CiAgICByZXR1cm4gTWF0aC5zcXJ0KGRlbHRhWDIgKyBkZWx0YVkyKTsKfQoKZnVuY3Rpb24gcmFuZEludChhLCBiKSB7CiAgICByZXR1cm4gTWF0aC5mbG9vcihyYW5kRmxvYXQoYSwgYikpOwp9)
* [naive Bayes](http://localhost:3000/#src=ZnVuY3Rpb24gU3BhbUNsYXNzaWZpZXIodW5rbm93bldvcmRQcm9iYWJpbGl0eSkgewogICAgdGhpcy5fdW5rbm93bldvcmRQcm9iYWJpbGl0eSA9IHVua25vd25Xb3JkUHJvYmFiaWxpdHkgfHwgMC4wMDAxOwp9CgpTcGFtQ2xhc3NpZmllci5wcm90b3R5cGUgPSB7CiAgICB0cmFpbiA6IGZ1bmN0aW9uKHRyYWluaW5nU2V0KSB7CgkJdGhpcy5udW1UcmFpbmluZ01zZyA9IGNvdW50S2V5cyh0cmFpbmluZ1NldCk7CgkJdGhpcy5udW0gPSB7fTsKCQl0aGlzLm51bVsnaGFtJ10gPSB0cmFpbmluZ1NldC5maWx0ZXIoZnVuY3Rpb24odikgewoJCQlyZXR1cm4gdi50eXBlID09ICdoYW0nOwoJCX0pLmxlbmd0aDsKCQl0aGlzLm51bVsnc3BhbSddID0gdGhpcy5udW1UcmFpbmluZ01zZyAtIHRoaXMubnVtWydoYW0nXTsKCgkJdGhpcy5mcmVxdWVuY2llcyA9IHRyYWluaW5nU2V0LnJlZHVjZShmdW5jdGlvbihhY2MsIGl0ZW0pIHsKCQkJZm9yICh2YXIgd29yZCBpbiBpdGVtLmNvbnRlbnQpIHsKCQkJCWlmIChhY2NbaXRlbS50eXBlXVt3b3JkXSkgewoJCQkJCWFjY1tpdGVtLnR5cGVdW3dvcmRdICs9IDE7CgkJCQl9IGVsc2UgewoJCQkJCWFjY1tpdGVtLnR5cGVdW3dvcmRdID0gMTsKCQkJCX0KCQkJfQoJCQlyZXR1cm4gYWNjOwoJCX0sIHtoYW0gOiB7fSwgc3BhbSA6IHt9fSk7Cgl9LAoJcFdvcmQgOiBmdW5jdGlvbih3b3JkLCBtc2dUeXBlKSB7CgkJaWYgKCF0aGlzLmZyZXF1ZW5jaWVzW21zZ1R5cGVdW3dvcmRdKSB7CgkJCXJldHVybiB0aGlzLl91bmtub3duV29yZFByb2JhYmlsaXR5OwoJCX0KCgkJcmV0dXJuIHRoaXMuZnJlcXVlbmNpZXNbbXNnVHlwZV1bd29yZF0gLyB0aGlzLm51bVttc2dUeXBlXTsKCX0sCglwVHlwZSA6IGZ1bmN0aW9uKHR5cGUpIHsKCQlyZXR1cm4gdGhpcy5udW1bdHlwZV0gLyB0aGlzLm51bVRyYWluaW5nTXNnOwoJfSwKCXAgOiBmdW5jdGlvbihtc2csIHR5cGUpIHsKCQl2YXIgYmFnT2ZXb3JkcyA9IGZyb21UZXh0VG9CYWdPZldvcmRzKHJlbW92ZVB1bmN0dWF0aW9uRnJvbVRleHQobXNnKSksCgkJCXByb2JhID0gMTsKCQkKCQlmb3IgKHZhciB3b3JkIGluIGJhZ09mV29yZHMpIHsKCQkJcHJvYmEgPSB0aGlzLnBXb3JkKHdvcmQsIHR5cGUpICogcHJvYmE7CgkJfQoKCQlyZXR1cm4gcHJvYmEgKiB0aGlzLnBUeXBlKHR5cGUpOwoJfSwKCWlzU3BhbSA6IGZ1bmN0aW9uKG1zZykgewoJCXJldHVybiAodGhpcy5wKG1zZywgJ3NwYW0nKSAvIHRoaXMucChtc2csICdoYW0nKSkgPiAxOwoJfQp9Ow%3D%3D)

## Datasets
[SMS spam collection](http://www.dt.fee.unicamp.br/~tiago/smsspamcollection/)
