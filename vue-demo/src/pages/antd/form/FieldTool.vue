<template>
  <a-form :form="form">
    <a-form-item v-bind="formItemLayout" :label="'普通 key/value'">
      <a-input v-decorator="['username', {}]"></a-input>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" :label="'普通 Array'">
      <a-checkbox-group
        v-decorator="['skill', {}]"
        :options="['angular', 'vue', 'react']"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 4, span: 6 }">
      <a-button @click="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { Form } from "./modules/Form"
export default {
  data() {
    return {
      form: this.formIns.form,
      formItemLayout: {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 6
        }
      }
    }
  },
  methods: {
    submit() {
      this.form.validateFields((err, values) => {
        console.log(JSON.stringify(values))
      })
    }
  },
  beforeCreate() {
    this.formIns = new Form({ _vue: this });
  },
  created() {
    this.$nextTick(() => {
      this.formIns.setFieldsValue({
        username: "eminoda",
        skill: ['angular', 'vue', 'react'],
        address: {
          country: 'China',
          city: 'Shanghai'
        },
        // a: {
        //   b: [{ aa: 1 }, { bb: 2 }]
        // }
      }, ['username', 'skill', 'address.city', 'address.country'])
    })
  }
}
</script>

<style>
</style>