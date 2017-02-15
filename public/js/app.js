/** Build and handle picker for projects */
const $projects = document.querySelectorAll('[data-skills]')
const $projectsPicker = document.getElementById('project-skill-picker')

buildSkillOptions()

$projectsPicker.addEventListener('change', () => {
  showProjectsBySkill($projectsPicker.options[$projectsPicker.selectedIndex].value)
})

function buildSkillOptions()
{
  let skills = []

  forEach($projects, (project) => {
    skills = skills.concat(
      $projects[project].getAttribute('data-skills').trim().split(/\s*,\s*/)
    )
  })

  // de-duplicate
  skills = skills.filter((elem, index, self) => {
    return index == self.indexOf(elem);
  }).sort()

  let options = ''

  for (skill in skills) {
    options += '<option value="' + skills[skill] + '">' + skills[skill] + '</option>'
  }

  $projectsPicker.insertAdjacentHTML('beforeend', options)
}

function showProjectsBySkill(skill)
{
  if (skill == '') return removeClass('hidden', $projects)

  addClass('hidden', $projects)
  removeClass('hidden', filterBySkill(skill, $projects))
}

function filterBySkill(skill, els)
{
  let returnEls = []

  forEach(els, (el) => {
    let thisSkills = els[el].getAttribute('data-skills')
    if (thisSkills.includes(skill)) returnEls.push(els[el])
  })

  return returnEls
}


/** Build and handle picker for tools */
const $tools = document.querySelectorAll('[data-tool-category]');
const $toolsPicker = document.getElementById('tool-category-picker')

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

$toolsPicker.addEventListener('change', () => {
  showToolsByCategory($toolsPicker.options[$toolsPicker.selectedIndex].value)
})

function buildCategoryOptions()
{
  let options = ''

  for (categorySlug in categoryTranslator) {
    options += '<option value="' + categorySlug + '">' + translateCategory(categorySlug) + '</option>'
  }

  $toolsPicker.insertAdjacentHTML('beforeend', options)
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
