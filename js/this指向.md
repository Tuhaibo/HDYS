## *this指向*

+ 普通函数   this指向window
+ 对象函数   哪个函数调用this就指向哪里
+ 构造函数调用   this指向实例对象（new实现）
+ 改变this指向     aplly，call，bind
+ 箭头函数            this继承外面的环境。

## *延伸 为什么this指向会不一样*

还是和堆栈的概念有关系，函数是引用类型，不管你是在全局环境创建函数还是在对象中创建函数时，它都创建了在堆内存中创建了函数的值，然后指向了这一段堆地址

```js
var s = obj.fn
// 这样创建了一个变量，它的指针和obj.fn的指针指向相同,都是相同的一段堆内存，所以可以s()
```

因为函数调用有这种特性，所以需要一个this来判断它的执行环境，执行环境改变this就随着改变

```js
s()
// 相当于 widow.s() -> widow.fn()
// 执行环境变了，变成了window对象，所以this就指向了window
obj.fn()

// 执行环境变了，变成了obj对象，所以this就指向了obj
```

### 使用 JavaScript 开发的时候，很多开发者多多少少会被 this 的指向搞蒙圈，但是实际上，关于 this 的指向，记住最核心的一句话：哪个对象调用函数，函数里面的this指向哪个对象。

下面分几种情况谈论下

1、普通函数调用

这个情况没特殊意外，就是指向全局对象-window。

let username='cn'
function fn(){
    alert(this.username);//undefined
}
fn();
可能大家会困惑，为什么不是输出守候，但是在细看一看，我声明的方式是let，不会是window对象
如果输出守候，要这样写

var username='cn'
function fn(){
    alert(this.username);//cn
}
fu();
//---------------
window.username='cn'
function fn(){
    alert(this.username);//cn
}
fn();
//可以理解为
//window.fn();
2、对象函数调用

这个相信不难理解，就是那个函数调用，this指向哪里

window.b=2222
let obj={
    a:111,
    fn:function(){
        alert(this.a);//111
        alert(this.b);//undefined
    }
}
obj.fn();
很明显，第一次就是输出obj.a，就是111。而第二次，obj没有b这个属性，所以输出undefined，因为this指向obj。

但是下面这个情况得注意

let obj1={
    a:222
};
let obj2={
    a:111,
    fn:function(){
        alert(this.a);
    }
}
obj1.fn=obj2.fn;
obj1.fn();//222
这个相信也不难理解，虽然obj1.fn是从obj2.fn赋值而来，但是调用函数的是obj1，所以this指向obj1。

3、构造函数调用

let TestClass=function(){
    this.name='111';
}
let subClass=new TestClass();
subClass.name='cn';
console.log(subClass.name);//cn
let subClass1=new TestClass();
console.log(subClass1.name)//111
这个也是不难理解，回忆下（new的四个步骤）就差不多了！

但是有一个坑，虽然一般不会出现，但是有必要提一下。

在构造函数里面返回一个对象，会直接返回这个对象，而不是执行构造函数后创建的对象



apply和call调用

apply和call简单来说就是会改变传入函数的this。

let obj1={
    a:222
};
let obj2={
    a:111,
    fn:function(){
        alert(this.a);
    }
}
obj2.fn.call(obj1);复制代码
此时虽然是 obj2 调用方法，但是使用 了call，动态的把 this 指向到 obj1。相当于这个 obj2.fn 这个执行环境是 obj1 。apply 和 call 详细内容在下面提及。

5、箭头函数调用

首先不得不说，ES6 提供了箭头函数，增加了我们的开发效率，但是在箭头函数里面，没有 this ，箭头函数里面的 this 是继承外面的环境。

一个例子

let obj={
    a:222,
    fn:function(){    
        setTimeout(function(){console.log(this.a)})
    }
};
obj.fn();//undefined
不难发现，虽然 fn() 里面的 this 是指向 obj ，但是，传给 setTimeout 的是普通函数， this 指向是 window ， window 下面没有 a ，所以这里输出 undefined。

换成箭头函数

let obj={
    a:222,
    fn:function(){    
        setTimeout(()=>{console.log(this.a)});
    }
};
obj.fn();//222
这次输出 222 是因为，传给 setTimeout 的是箭头函数，然后箭头函数里面没有 this ，所以要向上层作用域查找，在这个例子上， setTimeout 的上层作用域是 fn。而 fn 里面的 this 指向 obj ，所以 setTimeout 里面的箭头函数的 this ，指向 obj 。所以输出 222 。

call和apply
call 和 apply 的作用，完全一样，唯一的区别就是在参数上面。
call 接收的参数不固定，第一个参数是函数体内 this 的指向，第二个参数以下是依次传入的参数。
apply接收两个参数，第一个参数也是函数体内 this 的指向。第二个参数是一个集合对象（数组或者类数组）

let fn=function(a,b,c){
console.log(a,b,c);
}
let arr=[1,2,3];


如上面这个例子

let obj1={
    a:222
};
let obj2={
    a:111,
    fn:function(){
        alert(this.a);
    }
}
obj2.fn.call(obj1);
call 和 apply 两个主要用途就是

1.改变 this 的指向（把 this 从 obj2 指向到 obj1 ）

2.方法借用（ obj1 没有 fn ，只是借用 obj2 方法）
————————————————
版权声明：本文为CSDN博主「cnccl-web-js」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_37722222/java/article/details/81625826

