# AxureCopySitemap    
This script is designed to be used with Axure RP prototypes, is run it will copy your full sitemap tree as a TSV-formatted file to your clipboard. 

## What is it
This script copies the contents of the **$axure.document.sitemap.rootNodes** object to the clipboard formatted as a TSV file appropriate for pasting into Excel or an Axure Repeater.  

## How to use 
### Quickstart
I have pregenerated bookmarklets, that outputs the sitemap in id, page, type, url order. Add a bookmark to Chrome or Firefox, and paste the contents of either of these files as the URL for the bookmarket.

[With Header Row](AxureCopySitemap.Header.Bookmarklet.js) | [Without Header Row](AxureCopySitemap.NoHeader.Bookmarklet.js)

### Configure Settings
Lines 3 to 6 at the beginning of the file configure the output
- **columnOrder**: an array defining the a column's inclusion and order, default: ["id","page","type","url"]
- **includeHeader**: set to true to include column names in first row of output 
- **indentChildren**: set to true to prepend child page names with spaces
- **indentSpaces**: the number of spaces to indent by

### Paste in console
This script can be pasted into the console in Chrome (it runs into a security issue on Firefox), but this will get annoying. 

### Convert to a bookmarket 
1. It can be converted to a bookmarklet and placed in your bookmark toolbar for quick access, I don't quite understand what that process entails but I used this tool and it works fine: https://caiorss.github.io/bookmarklet-maker/
2. Add a bookmark to Chrome or Firefox, and paste the converted javascript of either of these files as the URL for the bookmarket.
3. Click on the bookmark to copy the sitemap to the clipboard
4. Paste inside a spreadsheet or an Axure Repeater for reuse

## Contact
Brent Morris

Twitter: [@closetgeekshow](https://twitter.com/closetgeekshow) | Mastodon: [@closetgeekshow@c.im](https://c.im/@Closetgeekshow) | Email: [closetgeekshow@gmail.com](mailto:closetgeekshow@gmail.com)

Project Link: [https://github.com/closetgeekshow/AxureCopySitemap](https://github.com/closetgeekshow/AxureCopySitemap)

## Compatibility notes
Test file was generated on Axure RP10.0.0.3897. This script has been tested on local prototypes in RP10 and on cloud prototypes in RP10 and RP9.

I have not yet tested with any other browsers beyond Chrome and Firefox. 

## Bugs
Won't work when pasted into Firefox, is there a workaround? 

## Future Ideas
### Online Generator
Make a page with configuration options to customize script and generate bookmarklet

### How can this work *inside* of Axure? 
Can it? Currently when the bookmarklet code is run in a javascript pseudo-protocol in an Open Link action, it does not work, I'm thinking there's some scoping issue.

Chrome returns this error:  "Uncaught TypeError: Cannot read properties of undefined (reading 'sitemap')"
Firefox has a similar error: "Uncaught TypeError: $axure.document is undefined"

### How could this work as an Axure plugin? 
I've never made any Axure plugins before. I think it just needs to be wrapped in a method and then that method should be called from an Open Link action i.e. Set to External Link, define url as javascript:void(MethodName())

### Can I replace my excel-based changelog with one *inside* of an Axure wireframe?
Not sure if that's a good idea or not, but I do want to try just because. You can paste the output of this script just as easily in a repeater. 

### How do I add more file formats to export as?
Ideas: 
* XSLX
* Markdown Table
* CSV

### Can I output an actual file that downloads
Probably easy to implement, I imagine
