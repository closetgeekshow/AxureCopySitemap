# AxureCopySitemap    
This script is designed to be used with Axure RP prototypes,  is run it will copy your full sitemap tree as a CSV-formatted file to your clipboard. 

## What is it
This script copies the contents of the **$axure.document.sitemap.rootNodes** object to the clipboard formatted as a CSV file.  

## How to use 
* This script can be pasted into the console in Chrome (it runs into a security issue on Firefox)
* it can be converted to a bookmarklet and placed in your bookmark toolbar for quick access, I don't quite understand what that process entails but I used this tool and it works fine: https://caiorss.github.io/bookmarklet-maker/

## Compatibility notes
Test file was generated on Axure RP10.0.0.3897. This script has been tested on local prototypes in RP10 and on cloud prototypes in RP10 and RP9.

## Bugs
Won't work when pasted into Firefox, is there a workaround? 

## Future Ideas
### How can this work *inside* of Axure? 
Can it? Current when the bookmarklet code is run in a javascript pseudo-protocol in an Open Link action, it does not work.

Chrome returns this error:  "Uncaught TypeError: Cannot read properties of undefined (reading 'sitemap')"
Firefox has a similar error: "Uncaught TypeError: $axure.document is undefined"

### How could this work as an Axure plugin? 
I've never made any Axure plugins before. I think it just needs to be wrapped in a method and then that method should be called from an Open Link action i.e. Set to External Link, define url as javascript:void(MethodName())

### Can I replace my excel-based changelog with one *inside* of an Axure wireframe?
Not sure if that's a good idea or not, but I do want to try just because. You can paste the output of this script just as easily in a repeater. 

### How do I replace the CSV file format with the actual XLSX format? 
I want to be able to indent nested children in the output as well as include all functions, it'd be nice to have most of the work done for me with script

