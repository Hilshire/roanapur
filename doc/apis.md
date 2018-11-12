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
| POST  | app/v1/blogs/:id/tags   |
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
