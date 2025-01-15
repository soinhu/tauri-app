## 表单组件说明文档

### Form Attributes

[Tips：下列仅提供封装过的属性，其它属性参考el-form（https://element-plus.org/zh-CN/component/form.html）](https://element-plus.org/zh-CN/component/form.html)

> |        参数         |                                                                说明                                                                |  类型   |    可选值    |   默认值   |
> | :-----------------: | :--------------------------------------------------------------------------------------------------------------------------------: | :-----: | :----------: | :--------: |
> | model/v-model:model | 表单绑定值，采用v-model:model方式会自动更新值，采用model绑定方式，需手动更新(事件为update:model),也可以通过**ref**的方式获取表单值 |    -    |      -       |     -      |
> |       columns       |                                                   表单项，详见下方 columns 配置                                                    |  array  |      -       |     -      |
> |       is-row        |                                                           是否开启el-row                                                           | boolean |    false     |    true    |
> |      rowProps       |                                                    表单row，参见 el-row 的 api                                                     |    -    | {gutter: 20} |            |
> |      colProps       |                                                    表单col，参见 el-col 的 api                                                     |         |      -       | {span: 24} |
>
> ### Form Columns Attributes
>
> > |     参数      |                                                  说明                                                  |  类型   | 可选值 | 默认值 |
> > | :-----------: | :----------------------------------------------------------------------------------------------------: | :-----: | :----: | :----: |
> > |     label     |                                                  名称                                                  | string  |   -    |   -    |
> > |     prop      |                                            绑定值/key，必填                                            | string  |   -    |   -    |
> > |     type      |                                     表单项类型详见下方 types，必填                                     | string  |   -    |   -    |
> > |    options    | 下拉框、单选框等选项值，默认展示和绑定：{label: 'label',value: 'value'},可通过 fieldProps 属性进行配置 |  array  |   -    |   -    |
> > |  fieldProps   |                           用于绑定组件 API 和配置 options 的 label 和 value                            | object  |   -    |   -    |
> > | formItemProps |                               表单formItem的props，参见el-item-form的api                               | object  |   -    |   -    |
> > |     slot      |                                              是否开启插槽                                              | boolean |  true  | false  |
> > |    hidden     |                                              是否隐藏该项                                              | boolean |  true  | false  |
>
> ### Form Types Explain
>
> > |     值类型     |      说明      |
> > | :------------: | :------------: |
> > |      text      |     输入框     |
> > |     number     |     数字框     |
> > |    textarea    | 多行文本输入框 |
> > |     select     |     选择框     |
> > |  radio-group   |    单选框组    |
> > | checkbox-group |    多选框组    |
> > |      date      |   日期选择框   |
> > |    datetime    | 日期时间选择框 |
> > |      time      |   时间选择框   |
> > |    password    |     密码框     |
>
> ### Form Scoped Slot
>
> > | name |              说明               |
> > | :--: | :-----------------------------: |
> > |  -   | 自定义输入建议，参数为 { item } |
>
> ### Form Methods
>
> > |     方法名     |                               说明                               |  参数  |
> > | :------------: | :--------------------------------------------------------------: | :----: |
> > |  addFormItem   |                            新增表单项                            | column |
> > | deleteFormItem |                  删除表单项，key 为 column.prop                  |  key   |
> > |  hideFormItem  |                  隐藏表单项，key 为 column.prop                  |  key   |
> > |  showFormItem  |                  显示表单项，key 为 column.prop                  |  key   |
> > |  getFormData   | 获取表单值，传递某个key，返回该key对应的值，不传则返回所有表单值 |  key   |
> > |  setFormData   |                            设置表单值                            |  item  |
