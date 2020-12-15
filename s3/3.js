// String.prototype.format = function (format) {
//   let modified = this
//   for (let prop in format) {
//     if (modified.indexOf('{' + prop + '}') !== -1) {
//       modified = modified.replace('{' + prop + '}', format[prop])
//     }
//   }
//   return modified
// }

String.prototype.format = function(format) {
  let modified = this
  for (let i = 0; i < Object.keys(format).length; i++) {
    if (modified.indexOf('{' + Object.keys(format)[i] + '}') !== -1) {
      modified = modified.replace('{' + Object.keys(format)[i] + '}', format[Object.keys(format)[i]])
    }
  }
  return modified
}

console.log('{name} is a {job}'.format({ name: 'andrei', job: 'teacher' }))

console.log(Object.keys({ name: 'andrei', job: 'teacher' }))