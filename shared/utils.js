export function getTagColor(type) {
  let tagColor
  switch (type) {
    case 'food':
      tagColor = 'bg-green-300 hover:bg-green-400 text-black-100'
      break;
    case 'travel':
      tagColor = 'bg-indigo-300 hover:bg-indigo-400 text-black-100'
      break;
    case 'tech':
      tagColor = 'bg-yellow-300 hover:bg-yellow-400 text-black-100'
      break;
    case 'lifestyle':
      tagColor = 'bg-blue-300 hover:bg-blue-400 text-black-100'
      break;
    default:
      tagColor = 'bg-gray-600 hover:bg-gray-500 text-gray-100'
  }
  return tagColor
}

export function formatDate(date, options = { year: 'numeric', month: 'short', day: 'numeric' }) {
  return new Date(date).toLocaleDateString('en-US', options)
}