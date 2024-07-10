---
title: 类型转换
pageTitle: C++ - 类型转换
---

## Implicit Type Conversion

隐式类型转换是自动执行的，无需显式的操作符。 隐式类型转换发生在很多地方，比如函数实参到形参的类型转换、函数返回值类型的自动转换等等。

### Numerical Type Conversion

从小整数类型(`char`、`short`)转换到`int`，或者从`float`转换到`double`，这种“提升型”的转换通常不会造成数值差异。但是下面的一些情形可能存在一些转换误差，使得编译器产生警告。

- 负数转化为无符号类型，通常会采用二进制补码表示。 (编译器不警告有符号和无符号整数类型之间的隐式转换)

    ```cpp
    int a = -1;
    unsigned int  b = a;   // b = 2^32 - 1 = 4294967295
    ```

- 无论是转换到`bool`类型或者是有`bool`类型进行转换： `false`等价于`0`(数值类型)或者空指针(指针类型)； `true`则等价于其它任何数值或者由`true`转化为`1`。

    ```cpp
    int a = -2; 
    bool b = a; //则b = true
    ```

- 浮点数转化为整数会采取截断操作，即移除小数部分。如果转换时发生了数值溢出，可能出现未定义的行为。

    ```cpp
    float a = -1.5f;
    int   b = a; // b = -1
    ```

### Pointer Type Conversion

指针通常存在以下转换：

- 空指针可以转换到任意指针类型；
- 任意指针类型都可以转换到`void*`指针；
- 继承类指针可以转换到可访问的明确的基类指针， 同时不改变`const`或者`volatile`属性;
- 一个C风格的数组隐式把数组的第一个元素转换为一个指针。 虽然此方法很方便，但它也有潜在的错误。 例如，下面的设计不良的代码示例看似荒谬，但它会在Visual C++的编译并生成的结果`p`。 首先，“`Help`”字符串常量转换为一个指向数组的第一个元素`char*`类型指针，该指针向后移动`3`个元素后，指向最后一个元素`P`。

```cpp
char* s = "Help" + 3;
```

## Explicit Type Conversion

### Keyword `explicit`

C++提供了关键字`explicit`，可以阻止不应该允许的经过转换构造函数进行的隐式转换的发生。即声明为`explicit`的构造函数不能在隐式转换中使用。

先看一下隐式转换的情形：

```cpp
// 类的通过构造函数的隐式转换:
#include <iostream>
using namespace std;

class A {};

class B {
public:
  // conversion from A (constructor):
  B (const A& x) {}
  // conversion from A (assignment):
  B& operator= (const A& x) {return *this;}
  // conversion to A (type-cast operator)
  operator A() {return A();}
};

int main ()
{
  A foo;
  B bar = foo;    // 调用构造函数实现隐式类型转换
  bar = foo;      // calls assignment
  foo = bar;      // calls type-cast operator，相当于 foo = A(bar);
  return 0;
}
```

再看下面的一个例子：

```cpp
#include <iostream>
using namespace std;

class A {};

class B {
public:
  explicit B (const A& x) {}
  B& operator= (const A& x) {return *this;}
  operator A() {return A();}
};

void fn (B x) {}  // 当我们希望x只能是B类型时，我们就需要禁止隐式类型转换

int main ()
{
  A foo;
  B bar (foo);  // 必须显式类型转换，不再允许B bar = foo; 
  bar = foo;
  foo = bar;

//  fn (foo);  // 不允许隐式类型转换
  fn (bar);  

  return 0;
}
```