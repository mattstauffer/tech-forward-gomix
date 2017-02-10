const $tools = document.querySelectorAll('[data-tool-category]');
const $picker = document.getElementById('tool-category-picker')

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

$picker.addEventListener('change', () => {
  showToolsByCategory($picker.options[$picker.selectedIndex].value)
})

function buildCategoryOptions()
{
  let options = ''

  for (categorySlug in categoryTranslator) {
    options += '<option value="' + categorySlug + '">' + translateCategory(categorySlug) + '</option>'
  }

  $picker.insertAdjacentHTML('beforeend', options)
}

function translateCategory(categorySlug)
{
  if (categorySlug in categoryTranslator) return categoryTranslator[categorySlug]

  return categorySlug
}

function showToolsByCategory(category)
{
  if (category == '') return removeClass('hidden', $tools)

  addClass('hidden', $tools)
  removeClass('hidden', filterByCategory(category, $tools))
}

function removeClass(theclass, els)
{
  forEach(els, (el) => {
    els[el].classList.remove(theclass)
  })
}

function addClass(theclass, els)
{
  forEach(els, (el) => {
    els[el].classList.add(theclass)
  })
}

function filterByCategory(category, els)
{
  let returnEls = []

  forEach(els, (el) => {
    let thisCat = els[el].getAttribute('data-tool-category')
    if (thisCat == category) returnEls.push(els[el])
  })

  return returnEls
}

function forEach(array, callback, scope)
{
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i])
  }
}
