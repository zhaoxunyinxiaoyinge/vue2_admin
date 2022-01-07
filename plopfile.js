
const viewGenerator=require("./plop-templates/content/prompt.js")
module.exports = function(plop) {
    plop.setGenerator('content', viewGenerator)
  }
  