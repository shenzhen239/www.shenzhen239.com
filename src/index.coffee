
# dependencies
require './App'

# page template
module.exports = ->
  doctype 5
  html ->
    head ->
      title 'Shenzhen239'
    body ->
      site.App()
