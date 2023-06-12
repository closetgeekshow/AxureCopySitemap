if (typeof $axure !== "undefined") { 
    /* Configuration Start */
    const columnOrder = ["id", "page", "type", "url"]; // valid options: ["id","page","type","url","" (blank column)]
    const includeHeader = true; // set to true to include column names in first row of output 
    const indentChildren = true; // set to true to prepend child page names with spaces
    const indentCount = 4; // the number of indentCharacters to indent by
    const indentCharacter = " ";
    /* Configuration End */
    const sitemapArray = $axure.document.sitemap.rootNodes;
    let tsvData = [];
  
    tsvData = traverseAndCopyTree(sitemapArray);
    if (includeHeader) {
      tsvData.unshift(columnOrder);
    }
    
    const tsvOutput = convertToTSV(tsvData);
    copyToClipboard(tsvOutput);
  
    function traverseAndCopyTree(tree, level = 0) {
      const convertedTree = [];
  
      for (const node of tree) {
        const { id, pageName: page, type, url, children } = node;
        const indent = indentChildren ? indentCharacter.repeat(indentCount * level) : '';
        const indentedPage = indent + page;
        const row = columnOrder.map(column => {
          if (column === "") {
            return ""; //insert empty column
          }
          switch (column) {
            case "id":
              return id;
            case "page":
              return indentedPage;
            case "type":
              return type;
            case "url":
              return url;
            default:
              return "";
          }
        });
  
        convertedTree.push(row);
  
        if (children && children.length > 0) {
          const childRows = traverseAndCopyTree(children, level + 1);
          convertedTree.push(...childRows);
        }
      }
  
      return convertedTree;
    }
  
    function convertToTSV(data) {
      let tsv = '';
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        tsv += row.join('\t') + '\n';
      }
      return tsv;
    }
  
    function copyToClipboard(copyText) {
      const textarea = document.createElement("textarea");
      textarea.value = copyText;
  
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
}
