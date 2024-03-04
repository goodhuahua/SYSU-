## 全局公共参数
#### 全局Header参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 全局Query参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 全局Body参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 全局认证方式
```text
noauth
```
#### 全局预执行脚本
```javascript
暂无预执行脚本
```
#### 全局后执行脚本
```javascript
暂无后执行脚本
```
## /发送验证码接口
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/sendCode

#### 请求方式
> POST

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    "Email":"cyr28@mail2.sysu.edu.cn"
}
```
#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /用户注册接口
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/register

#### 请求方式
> POST

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    "UserName": "cyr",
    "Email": "cyr28@mail2.sysu.edu.cn",
    "Password": "123456",
    "Code": "PAn7"
}
```
#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /用户登录接口
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/login

#### 请求方式
> POST

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    "Email":"zouxy28@mail2.sysu.edu.cn",
    "Password":"123456"
}
```
#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /管理员登录接口
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/login

#### 请求方式
> POST

#### Content-Type
> json

#### 请求Body参数
```javascript
{
     "userName":"hh",
     "password":"77777"
}
```
#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /上传图像接口
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/upload

#### 请求方式
> POST

#### Content-Type
> form-data

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
file | ["C:\\Users\\zxy\\Pictures\\Camera Roll\\宿舍文化节.png"] | String | 是 | -
#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /获取天气接口
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> https://restapi.amap.com/v3/weather/weatherInfo?city=440402&key=9a7e5041db5043605a410e3ac6811347

#### 请求方式
> GET

#### Content-Type
> form-data

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
city | 440402 | String | 是 | -
key | 9a7e5041db5043605a410e3ac6811347 | String | 是 | -
#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
city | 440402 | String | 是 | -
key | 9a7e5041db5043605a410e3ac6811347 | String | 是 | -
#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /管理员中间件接口
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /获取管理员信息接口
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/briefInfo/2

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /管理员修改头像接口
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/avatar/2

#### 请求方式
> PUT

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    "avatar":"/images/image_20221015002055.png"
}
```
#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /修改管理员用户名
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/name/2

#### 请求方式
> PUT

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    "userName":"hh"
}
```
#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /修改管理员密码接口
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/password/2

#### 请求方式
> PUT

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    "password":"77777"
}
```
#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /管理员条件查询分类名
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/category/python

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /条件查询管理员
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/adminName/hh

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /条件查询用户
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/userName/zxy

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /条件查询文章
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/artName/我爱你

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /查询分类列表
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/category?pageNum=1&pageSize=10

#### 请求方式
> GET

#### Content-Type
> none

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
pageNum | 1 | String | 是 | -
pageSize | 10 | String | 是 | -
#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /查询所有管理员
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/adminList?pageNum=1&pageSize=2

#### 请求方式
> GET

#### Content-Type
> none

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
pageNum | 1 | String | 是 | -
pageSize | 2 | String | 是 | -
#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /查询所有用户
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/userList?pageNum=1&pageSize=2

#### 请求方式
> GET

#### Content-Type
> none

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
pageNum | 1 | String | 是 | -
pageSize | 2 | String | 是 | -
#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /查询所有文章
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/artList?pageNum=1&pageSize=10

#### 请求方式
> GET

#### Content-Type
> none

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
pageNum | 1 | String | 是 | -
pageSize | 10 | String | 是 | -
#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /添加管理员
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/addAdmin

#### 请求方式
> POST

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    "userName":"admin9",
    "password":"12345"
}
```
#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /添加分类
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/category/add

#### 请求方式
> POST

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    "categoryName":"nodejs"
}
```
#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /发布公告
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/notice/add

#### 请求方式
> POST

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    "category_id":12,
    "title":"P",
    "head_image":"",
    "content":"java阿斯顿后i后悔i是东风分管教育i与i文"
}
```
#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /公告修改
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/notice/aa8d09d8-f869-45aa-b861-0e9e53f436f6

#### 请求方式
> PUT

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    "category_id":2,
    "title":"javaPPP",
    "head_image":"",
    "content":"java骄傲骄傲骄傲急急急急急急就是丹佛i是东风波五百欧文"
}
```
#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /公告删除接口
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/notice/aa8d09d8-f869-45aa-b861-0e9e53f436f6

#### 请求方式
> DELETE

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /条件查询公告
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/notice/P

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /查询所有公告
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/admin/noticeList

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /验证用户接口
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/user

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /获取用户简要信息
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/user/briefInfo/4

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /获取用户详细信息
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/user/detailedInfo/4

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /修改头像
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/user/avatar/4

#### 请求方式
> PUT

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    "avatar":"/images/image_default_avatar.png"
}
```
#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /修改用户名
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/user/name/4

#### 请求方式
> PUT

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    "userName":"大帅哥"
}
```
#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /获取教师列表
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/teacher/list

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /向教师提问
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/teacher/5/ask

#### 请求方式
> POST

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    "content":"老师明天放假吗？"
}
```
#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /教师回复
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/teacher/reply

#### 请求方式
> POST

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    "question_id":1,
    "content":"不可能"
}
```
#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /教师收到的问题
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/teacher/5/answer

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /教师查看回复列表
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/teacher/reply

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /查询用户收藏
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/collects/6430cc08-4fd9-4f18-8f00-0fe0d83f2358

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /新增收藏
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/collects/new/6430cc08-4fd9-4f18-8f00-0fe0d83f2358

#### 请求方式
> PUT

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /取消收藏
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/collects/2

#### 请求方式
> DELETE

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /查询用户关注
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/following/5

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /新增关注
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/following/new/5

#### 请求方式
> PUT

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /取消用户关注
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/following/1

#### 请求方式
> DELETE

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /查询分类
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> localhost:8080/category

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /查询分类名
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/category/2

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /发布文章
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/article

#### 请求方式
> POST

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    "category_id":1,
    "title":"教程",
    "head_image":"",
    "content":"dsadseferger"
}
```
#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /修改文章
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/article/15b91666-1e58-403c-8ad6-d46d3e301827

#### 请求方式
> PUT

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    "category_id":1,
    "title":"教程34",
    "head_image":"",
    "content":"dsadsfdggergereferger"
}
```
#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /删除文章
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/article/15b91666-1e58-403c-8ad6-d46d3e301827

#### 请求方式
> DELETE

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /查看文章
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/article/6430cc08-4fd9-4f18-8f00-0fe0d83f2358

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /文章列表
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/article/list

#### 请求方式
> POST

#### Content-Type
> none

#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /获取公告
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/notice/928f65da-b80f-42a3-b854-5c947b2a6f42

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /公告列表
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/notice/list

#### 请求方式
> POST

#### Content-Type
> none

#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /发布评论
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/comments

#### 请求方式
> POST

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    "article_id":"6430cc08-4fd9-4f18-8f00-0fe0d83f2358",
    "text":"sadowhofwef"
}
```
#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /显示评论
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/comments/6430cc08-4fd9-4f18-8f00-0fe0d83f2358

#### 请求方式
> GET

#### Content-Type
> none

#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /删除评论
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> localhost:8080/comments/1

#### 请求方式
> DELETE

#### Content-Type
> none

#### 认证方式
```text
bearer
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```