# 类
## 类图
```
    Article
        String id
        String title
        String content
        String createTime
        String lastModify
    
    TagArticle extends Article
        super Article
        List tags
    
    Blog extends TagArticle
    
    Essay extends TagArticle

    Tip extends TagArticle
    
    Tags
        String id
        String title

```
### Blog
```
    Object Blog
        String id
        String title
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
