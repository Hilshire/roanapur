# Roanapur
这个英文名也许有点陌生。但是，如果提及它的出处，诸位也许会觉得恍然大悟。它正是漫画《黑礁》的舞台，罪恶之都罗阿那普拉。毫无疑问，我对书中误入这个罪恶之城的日本职人Rock有那么点羡慕，尽管他的生活只存在与漫画之中——我自问没法像他那样在枪林弹雨之中存活下来，同时还能腆着脸对“正常的生活”抱有留恋，踩在黑与白的中间线上。我们的生活就只有白色，如同他一只穿着的白衬衫一般。内心的狂想也就仅限于此。人的渴望，是不是如果没有遇到合适的环境，最终就会枯萎。又或者，只要有合适的环境，那些潜藏在人内心中的阴暗与渴望就会发芽。

尽管如此，我依然觉得那些只会喊着“假如如何如何，我毕竟会怎样怎样”的人虚伪至极。而这对我们所有人大概都适用。

## packages
- koa

## 模块
- 博客
- 随笔
- Tips
- About Me

## 功能
- 博客、随笔、Tips的增删改查
- About Me的修改

## 类
### Blog
```
    Object Blog
        String id
        String title
        String summary
        String content
        String createTime
        String lastModify
        List tags
```
### Essay
```
    Object blog
        String id
        String title
        String summary
        String content
        String createTime
        String lastModify
        List tags
```
### Tip
```
Object Tips
    String id
    String title
    String content
    String createTime
    String lastModify
    List tags
```
### Tag
```
Object Tag
    String id
    String name
```
### AboutMe
单例类
```
    Object AboutMe
        String title
        String content
        String createTime
        String lastModify
```

### Banner
```
    Object Banner
        String content
```

## 接口
遵循 RESTful API 规范
### base
#### app/v1
```
    Object
        String code # 1 成功 0 失败
        String desc
        List/Object data
```
***<p style="color: red">之后只列出data中的结果</p>***

**默认的请求方式为GET**
### blog
|       |                         |
|:-----:|:-----------------------:|
| GET   | app/v1/blogs            |
| GET   | app/v1/blogs/:id        |
| POST  | app/v1/blogs            |
| PUT   | app/v1/blogs/:id        |
| DELETE| app/v1/blogs/:id        |
| GET   | app/v1/blogs/:id/tags   |
| POST  | app/v1/blogs/:id/tags
| DELETE| app/v1/blogs/:id/:tagId |
#### app/v1/blogs
```
    list blogs
        Object blog
```
#### app/v1/blogs/:id
```
    Object blog
```
#### POST app/v1/blogs
入参
```
    Object
        blog
```
返回
```
    list blogs
        Object blog
```
#### PUT app/v1/blog/:id
入参
```
    Object blog
```
返回
```
    Object blog
```
#### DELETE app/v1/blog/:id
返回
```
    list blogs
        Object blog
```
### GET app/v1/blog/:id/tags
返回
```
    list tag_ids
        String id
```
### POST app/v1/blogs/:id/tags
入参
```
    Object tag
```
返回
```
    list tags
```
### DELETE app/v1/blog/:id/tag/:tagId
返回
```
    Object blog
```
## essay
|       |                          |
|:-----:|:------------------------:|
| GET   | app/v1/essays            |
| GET   | app/v1/essays/:id        |
| POST  | app/v1/essays            |
| PUT   | app/v1/essays/:id        |
| DELETE| app/v1/essays/:id        |
| GET   | app/v1/essays/:id/tags   |
| DELETE| app/v1/essays/:id/:tagId |
## tip
|       |                        |
|:-----:|:----------------------:|
| GET   | app/v1/tips            |
| GET   | app/v1/tips/:id        |
| POST  | app/v1/tips            |
| PUT   | app/v1/tips/:id        |
| DELETE| app/v1/tips/:id        |
| GET   | app/v1/tips/:id/tags   |
| DELETE| app/v1/tips/:id/:tagId |
## tag
|       |                 |
|:-----:|:---------------:|
| GET   | app/v1/tags     |
| GET   | app/v1/tags/:id |
| POST  | app/v1/tags     |
## about me
|       |                 |
|:-----:|:---------------:|
| GET   | app/v1/about_me |
| PUT   | app/v1/tags     |
## banner
|       |                    |
|:-----:|:------------------:|
| GET   | app/v1/banners     |
| POST  | app/v1/banners     |
| PUT   | app/v1/banners/:id |
| DELETE| app/v1/banners/:id |




