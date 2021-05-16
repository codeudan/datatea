(function(factory) {
  if (typeof require == 'function' && typeof exports == 'object' && typeof module == 'object') {
    module['exports'] = factory()
  } else if (typeof define === 'function' && define.amd) {
    define(function() {
      return factory()
    })
  } else {
    window['datatea'] = factory()
  }
}(function() {
  var each = function(array, callback) {
    var len = array.length,
      i
    for (i = 0; i < len; i++) {
      callback.call(array, array[i], i, array)
    }
  }

  var type = function(obj) {
    return (Object.prototype.toString.call(obj).slice(8, -1))
  }

  var typeAuto = function(value) {
    if (type(value) == 'Number') return value
    if (type(value) == 'String') {
      return isNaN(Number(value)) ? value.toLocaleLowerCase() : Number(value)
    }
    return value
  }

  var getObjectKeys = function(obj) {
    return Object.keys(obj)
  }

  var getObjectValues = function(obj) {
    var result = []
    var keys = getObjectKeys(obj)
    each(keys, function(key) {
      result.push(obj[key])
    })
    return result
  }

  var sort = function(data, type) {
    var maped = type == 'Array' ? data.map(function(value, index) {
      return {
        index: index,
        value: value
      }
    }) : data
    if (type == 'Array') {
      maped.sort(function(a, b) {
        return +(typeAuto(a.value) > typeAuto(b.value)) || +(typeAuto(a.value) === typeAuto(b.value)) - 1;
      })
    } else {
      maped.sort(function(a, b) {
        return +((typeAuto(a[getObjectKeys(a)[0]])) > (typeAuto(b[getObjectKeys(b)[0]]))) || +((typeAuto(a[getObjectKeys(a)[0]])) === (typeAuto(b[getObjectKeys(b)[0]]))) - 1
      })
    }
    return maped
  }

  var remove = function(data, dataType, items, byKey) {
    var len = data.length,
      result = [],
      i, items
    if (!(type(items) == 'Array')) {
      items = [items]
    }
    if (byKey) {
      for (i = 0; i < len; i++) {
        if (dataType == 'Array') {
          if (items.indexOf(i) < 0) {
            result.push(data[i])
          }
        } else {
          if (items.indexOf(getObjectKeys(data[i])[0]) < 0) {
            result.push(data[i])
          }
        }
      }
    } else {
      for (i = 0; i < len; i++) {
        if (dataType == 'Array') {
          if (items.indexOf(data[i]) < 0) {
            result.push(data[i])
          }
        } else {
          if (items.indexOf(getObjectValues(data[i])[0]) < 0) {
            result.push(data[i])
          }
        }
      }
    }
    return result
  }

  var clone = function(obj) {
    var result, key, i, len
    if (type(obj) == 'Array') {
      result = []
      len = obj.length
      for (i = 0; i < len; i++) {
        result[i] = clone(obj[i])
      }
      return result
    } else if (type(obj) == 'Object') {
      result = {}
      for (key in obj) {
        result[key] = clone(obj[key])
      }
      return result
    } else {
      return obj
    }
  }

  var transToList = function(obj) {
    var list = [],
      cloned = clone(obj),
      key, tempObj
    if (type(obj) === 'Array') {
      list = cloned
    } else {
      for (key in cloned) {
        tempObj = {}
        tempObj[key] = cloned[key]
        list.push(tempObj)
      }
    }
    return list
  }

  var merge = function(array, originType) {
    var result = {},
      key
    if (originType == 'Array') {
      result = array
    } else {
      each(array, function(item) {
        result[getObjectKeys(item)[0]] = getObjectValues(item)[0]
      })
    }
    return result
  }

  var DataTeaInit = function(data) {
    var dataType = type(data)
    if (!(dataType == 'Array' || dataType == 'Object')) {
      throw new Error('You should pass a array or object')
    }
    this.origin = data
    this.type = dataType
    this.length = getObjectKeys(data).length
  }

  proto = {
    constructor: DataTea,

    keys: function() {
      var result = getObjectKeys(this.origin)
      return this.type == 'Array' ? result.map(function(idx) {
        return Number(idx)
      }) : result
    },

    values: function() {
      return clone(getObjectValues(this.origin))
    },

    shuffer: function() {
      var data = transToList(this.origin)
      var i, len = data.length,
        last, idx, temp
      for (i = 0; i < len - 1; i++) {
        last = len - i - 1
        idx = Math.floor(Math.random() * (len - i))
        temp = data[idx]
        data[idx] = data[last]
        data[last] = temp
      }
      return merge(data, this.type)
    },

    ascend: function() {
      var data = transToList(this.origin)
      data = sort(data, this.type)
      var result = []
      if (this.type == 'Array') {
        each(data, function(item) {
          result.push(item.value)
        })
      } else {
        result = data
      }
      return merge(result, this.type)
    },

    descend: function() {
      var data = transToList(this.origin)
      data = sort(data, this.type).reverse()
      var result = []
      if (this.type == 'Array') {
        each(data, function(item) {
          result.push(item.value)
        })
      } else {
        result = data
      }
      return merge(result, this.type)
    },

    reverse: function() {
      var data = transToList(this.origin)
      data.reverse()
      return merge(data, this.type)
    },

    min: function(isWithKey) {
      var data = transToList(this.origin)
      var minList = sort(data, this.type)[0]
      if (this.type == 'Array') {
        return isWithKey ? minList : minList.value
      } else {
        return isWithKey ? {
          key: getObjectKeys(minList)[0],
          value: getObjectValues(minList)[0]
        } : getObjectValues(minList)[0]
      }
    },

    max: function(isWithKey) {
      var data = transToList(this.origin)
      var minList = sort(data, this.type).reverse()[0]
      if (this.type == 'Array') {
        return isWithKey ? minList : minList.value
      } else {
        return isWithKey ? {
          key: getObjectKeys(minList)[0],
          value: getObjectValues(minList)[0]
        } : getObjectValues(minList)[0]
      }
    },

    random: function(isWithKey) {
      var data = transToList(this.origin)
      var idx = Math.floor(Math.random() * this.length)
      var keys = this.keys()
      var values = this.values()
      var result
      if (isWithKey) {
        result = {}
        if (this.type == 'Array') {
          result['index'] = keys[idx]
        } else {
          result['key'] = keys[idx]
        }
        result['value'] = values[idx]
        return result
      }
      return values[idx]
    },

    unique: function() {
      var data = transToList(this.origin)
      var len = this.length,
        i
      var result = []
      for (i = 0; i < len; i++) {
        if (this.type == 'Array') {
          if (i == 0) {
            result.push(data[i])
          } else if (!(data[i] === data[i - 1])) {
            result.push(data[i])
          }
        } else if (this.type == 'Object') {
          if (i == 0) {
            result.push(data[i])
          } else if (!(getObjectValues(data[i])[0] === getObjectValues(data[i - 1])[0])) {
            result.push(data[i])
          }
        }
      }
      return merge(result, this.type)
    },

    removeValue: function(items) {
      var data = transToList(this.origin)
      var result = remove(data, this.type, items, false)
      return merge(result, this.type)
    },

    removeKey: function(items) {
      var data = transToList(this.origin)
      var result = remove(data, this.type, items, true)
      return merge(result, this.type)
    },

    total: function() {
      var result = 0,
        values = this.values()
      each(values, function(item) {
        result += typeAuto(item)
      })
      return result
    },

    indexOf: function(items) {
      var keys, result = [],
        key
      var self = this
      if (!(type(items) == 'Array')) {
        items = [items]
      }
      if (this.type == 'Array') {
        each(items, function(item) {
          result.push(self.origin.indexOf(item))
        })
      } else {
        keys = this.keys()
        each(items, function(item) {
          key = keys[self.values().indexOf(item)]
          result.push(key === undefined ? null : key)
        })
      }
      return result.length == 1 ? getObjectValues(result)[0] : result
    },

    eq: function(index) {
      var data = transToList(this.origin)
      return data[index]
    },

    slice: function() {
      var data = transToList(this.origin)
      data = [].slice.apply(data, arguments)
      return merge(data, this.type)
    }
  }

  DataTeaInit.prototype = proto

  var DataTea = function(data) {
    return new DataTeaInit(data)
  }

  return DataTea
}))