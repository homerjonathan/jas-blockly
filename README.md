# jas-blockly
Blockly Library

Extremely hard to install!

First download Blockly.  Then download google closure library.

https://developers.google.com/closure/library/

Expand the Blockly Library into a sub directory.  Then expand the Closure Library.  Rename the directory from google-closure-library to
closure-library.

Thus

/MYDOWNLOAD/blockly
/MYDOWNLOAD/closure-library

Then run python build.py. This builds the library.

Copy the update into jas-blockly dir.  We need:

blockly_compressed.js
blocks_compressed.js
messages.js

blockly_support.js - Keep this!


