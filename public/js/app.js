const $tools = $('[data-tool-category]')
const $picker = $('#tool-category-picker')
const categoryTranslator = {
  'cta': 'Calls to Action',
  'learn': 'Learn About Politics and Resistance',
  'miscellaneous': 'Miscellaneous',
  'pledge': 'Pledge to Resist',
  'protest': 'Protests and Tools for Protest',
  'access': 'Receiving or Providing Help in Voting',
  'call': 'Tools for Calling Representatives',
  'events': 'Tools for Finding Resistance Events',
  'elections': 'Tools for Understanding and Influencing Elections',
  'legislation': 'Understanding and Influencing Legislation'
}

buildCategoryOptions()

$picker.on('change', (selected) => {
  showToolsByCategory($picker.val())
})

// @todo bring in lodash to simplify this
function buildCategoryOptions()
{
  let options = ''

  for (categorySlug in categoryTranslator) {
    options += '<option value="' + categorySlug + '">' + translateCategory(categorySlug) + '</option>'
  }

  $picker.append(options)
}

function translateCategory(categorySlug)
{
  if (categorySlug in categoryTranslator) return categoryTranslator[categorySlug]

  return categorySlug
}

function showToolsByCategory(category)
{
  if (category == '') return $tools.removeClass('hidden')

  $tools.addClass('hidden').filter('[data-tool-category=' + category + ']').removeClass('hidden')
}

