/*
    Tested on Axure RP10.0.0.3897

    When the script is run it will copy your full (visible) sitemap tree as a CSV-formatted file
    into your clipboard    

    This script can be pasted into the console in Chrome (runs into a security issue on Firefox)
    
    Or it can be converted to a bookmarklet and placed in your bookmark toolbar for quick access
        i used this tool and it works fine https://caiorss.github.io/bookmarklet-maker/
    
    TODO: How can this work *inside* of Axure? when the bookmarklet code is run in an Open Link action 
    it does not work
    
        Chrome it gets an error
            Uncaught TypeError: Cannot read properties of undefined (reading 'sitemap')

        Firefox has a similar error:
            Uncaught TypeError: $axure.document is undefined

    TODO: How does this work as an Axure plugin? I've never done that before
        I think it just needs to be wrapped in a method and then that method should be called from an 
        Open Link action

        i.e. Set to External Link, define url as javascript:void(MethodName())

    TODO: Can I replace my excel-based changelog with one *inside* of an Axure wireframe, 
        not sure if that's a good idea or not, but I do want to try just because

    TODO: How do I replace the CSV file format with the actual XLSX format? I want to be able to indent
        nested children in the output as well as include all functions, it'd be nice to have most of the 
        work done for me with script


*/
if (typeof $axure !== "undefined") {
    // recursively traverses a nested array of objects and returns the copied fields
    function traverseAndCopy(tree) {
        const copiedTree = [];
        
        for (const node of tree) {
        const copiedNode = {
            /* 
            comment/remove fields here that you don't wait (remember to include 
            a trailing comma if it is not the last one) 
            */
            id: node.id,
            page: node.pageName,
            type: node.type,
            url: node.url
        };
        
        if (node.children) {
            copiedNode.children = traverseAndCopy(node.children);
        }
        
        copiedTree.push(copiedNode);
        }
        
        return copiedTree;
    }

    /* 
        This is the key bit of this whole thing. $axure is a javascript 
        object present on all prototypes and contains all the metadata 
        and code that makes it all work

        if you dig through that object (there's all kinds of interesting stuff in there)
        $axure.document.sitemap.rootNodes is an array of objects containing all the
        information needws to make the sitemap tree display in the flyout

        OBJECT STRUCTURE

        id,
        pageName,
        type (wireframe|flow|folder),
        url
        children (optional) - its presence indicates that this page has child pages 
        organized under it, child objects repeat this object's structure.
    */

    const sitemapArray = $axure.document.sitemap.rootNodes; 
    const copiedArray = traverseAndCopy(sitemapArray);

    /* 
        Create the CSV string with headers
        I've included this for completion's sake but it's not strictly required 
        i don't use it in my version of the script as my headers are already defined
        in my excel file

        \t is an escaped tab character, 
        \n is an escaped newline character 
    
        This is all that's needed to makes a csv file appropriate for
        pasting into excel (works on Repeaters in Axure Editor too)
    */
    var csv = "pagename\t" +
                "id\t" +
                "type\t" +
                "url\n";

    // Iterate over the array and add values to the CSV string
    copiedArray.forEach(function(obj) {
    csv += obj.page + "\t" + obj.id + "\t" + obj.type + "\t" + obj.url + "\n"; 
    });

    // Create a textarea element to hold the CSV string
    var textarea = document.createElement("textarea");
    textarea.value = csv;

    // Append the textarea element to the document
    document.body.appendChild(textarea);

    // Select and copy the contents of the textarea
    textarea.select();

    // this is the line that firefox won't execute when pasted in console
    // TODO: is there a workaround for this issue?
    document.execCommand("copy");

    // Remove the textarea element from the document
    document.body.removeChild(textarea);
}
