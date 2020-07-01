export class Form {
  constructor(options) {
    this._vue = options._vue;
    this.form = this.createForm(options);
  }
  createForm(options) {
    return this._vue.$form.createForm(this._vue, options);
  }
  setFieldsValue(data, fields) {
    if (fields) {
      data = this._filterDataByFields(data, fields);
    }
    console.log(data);
    /**
     * 模板中事先定义好 field 对应的 decorator
     * Warning: You cannot set a form field before rendering a field associated with the value. You can use `getFieldDecorator(id, options)` instead `v-decorator="[id, options]"` to register it before render.
     */
    this.form.setFieldsValue(data);
  }
  _isObject(field) {
    return field.split('.').length > 1 ? field.split('.') : false;
  }
  _filterDataByFields(data, fields) {
    let newVal = {};
    for (let field of fields) {
      const fieldParseResult = this._isObject(field);
      if (!fieldParseResult) {
        newVal[field] = data[field];
      } else {
        // 过滤数据
        newVal = this._findAndSetValue(data, fieldParseResult, newVal);
      }
    }
    return newVal;
  }
  _findAndSetValue(dataSource, fields, result) {
    let targetVal = fields.reduce((target, key, index) => {
      // 处理最后个属性值不存在时的类型
      if (index == fields.length - 1) {
        if (!target[key]) {
          target[key] = '';
        }
      } else if (!target[key]) {
        target[key] = {};
      }
      const val = target[key];
      return val;
    }, dataSource);

    const newResult = fields.reverse().reduce((target, key, index) => {
      let obj = {};
      obj[key] = target;
      return obj;
    }, targetVal);

    _findObj(newResult, result);

    function _findObj(newObj, oldObj) {
      for (let key in newObj) {
        const val = newObj[key];
        if (typeof val == 'object') {
          if (!oldObj[key]) {
            oldObj[key] = {};
          }
          _findObj(val, oldObj[key]);
        } else {
          if (!oldObj[key]) {
            oldObj[key] = val;
          }
        }
      }
    }
    return result;
  }
}
